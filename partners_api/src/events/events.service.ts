import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly dbService: PrismaService) { }

  create(createEventDto: CreateEventDto) {
    return this.dbService.event.create(
      {
        data: createEventDto,
      }
    );
  }

  findAll() {
    return this.dbService.event.findMany();
  }

  findOne(id: string) {
    return this.dbService.event.findUnique({ where: { id } });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.dbService.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: string) {
    return this.dbService.event.delete({
      where: { id },
    });
  }
}
