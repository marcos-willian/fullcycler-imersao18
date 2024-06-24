import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { ReserveSpotsDto } from './dto/reserve-spots.dto';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) { }

  @Post()
  create(@Body() body: { name: string }, @Param('eventId') eventId: string) {
    return this.spotsService.create(body.name, eventId);
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Post('reserve')
  async reserve(
    @Body() reserveDto: ReserveSpotsDto,
    @Param('eventId') eventId: string,
  ) {
    const tickets = await this.spotsService.reserve(reserveDto, eventId);
    return tickets.map((ticket) => ({
      id: ticket.id,
      email: ticket.email,
      spot: ticket.spot.name,
      ticket_kind: 'full',
      status: ticket.spot.status,
      event_id: ticket.spot.eventId,
    }));
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.spotsService.remove(id);
  }
}
