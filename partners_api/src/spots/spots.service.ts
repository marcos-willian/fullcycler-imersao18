import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Status } from '@prisma/client'
import { ReserveSpotsDto } from './dto/reserve-spots.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SpotsService {
  constructor(private readonly dbService: PrismaService) { }

  create(name: string, eventId: string) {
    return this.dbService.spot.create(
      {
        data: {
          name: name,
          eventId,
          status: Status.AVAILABLE,
        }
      }
    );
  }

  findAll(eventId: string) {
    return this.dbService.spot.findMany(
      {
        where: {
          eventId,
        }
      }
    );
  }

  remove(id: string) {
    return this.dbService.spot.delete(
      {
        where: {
          id,
        },
      }
    );
  }

  async reserve(reserveSpotsDto: ReserveSpotsDto, eventId: string) {
    const spots = await this.dbService.spot.findMany(
      {
        where: {
          name: {
            in: reserveSpotsDto.spotNames
          },
          eventId,
          status: Status.AVAILABLE,
        }
      }
    );

    if (spots.length !== reserveSpotsDto.spotNames.length) {
      const notFoundSpots = reserveSpotsDto.spotNames.filter(
        (spotName) => !spots.some(({ name }) => name == spotName)
      )
      throw new NotFoundException(
        `The spots ${notFoundSpots.join(', ')} is Unavailable or is Not found`
      );
    }

    try {
      const tickets = await this.dbService.$transaction(
        async (prisma) => {
          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id)
              }
            },
            data: {
              status: Status.OCUPIED,
            }
          });
          await prisma.reservationHistory.createMany(
            {
              data: spots.map(
                (spot => ({
                  spotId: spot.id,
                  email: reserveSpotsDto.email,
                }))
              )
            }
          );

          return await Promise.all(
            spots.map((spot) => prisma.ticket.create(
              {
                data: {
                  email: reserveSpotsDto.email,
                  spotId: spot.id,
                }
              }
            ))
          );

        },
        { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
      );

      return tickets;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
          case 'P2034':
            throw new BadRequestException('Spots already reserved');
        }
      }
      throw err;
    }
  }
}
