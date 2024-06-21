import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { ReserveSpotsDto } from './dto/reserve-spots.dto';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) { }

  @Post()
  create(@Body() body: { name: string }, @Param('eventId') eventId: string) {
    return this.spotsService.create(
      body.name,
      eventId,

    );
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Post('reserve')
  reserve(@Body() reserveDto: ReserveSpotsDto, @Param('eventId') eventId: string) {
    return this.spotsService.reserve(
      reserveDto,
      eventId,
    );
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.spotsService.remove(id);
  }
}
