import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplicationContext } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EventsService } from './events/events.service';
import { SpotsService } from './spots/spots.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const events = [
    {
      id: '10853e59-dc5b-4d7b-a028-01513ef50d76',
      name: 'Event 001 - Partner1',
      description: 'Event 001 Description - Partner1',
      price: 100,
      date: '2021-10-10T10:00:00',
    },
    {
      id: 'e0352b32-7698-4805-b029-28302b3a911f',
      name: 'Event 002 - Partner1',
      description: 'Event 002 Description - Partner1',
      price: 200,
      date: '2021-10-10T12:00:00',
    },
    {
      id: '5b79831a-a9d3-4538-8fb5-569494bd17a5',
      name: 'Event 003 - Partner1',
      description: 'Event 003 Description - Partner2',
      price: 400,
      date: '2024-10-10T10:00:00',
    },
    {
      id: '8beff8fd-39e4-49ea-ae5e-a0ec9af888c5',
      name: 'Event 004 - Partner1',
      description: 'Event 003 Description - Partner2',
      price: 500,
      date: '2024-10-10T12:00:00',
    },
  ];

  await fixture(app, events, 10);

  console.log('Data created');
  await app.close();
}

bootstrap();

async function fixture(
  app: INestApplicationContext,
  events: {
    id: string;
    name: string;
    description: string;
    price: number;
    date: string;
  }[],
  numSpots: number,
) {
  const prismaService = app.get<PrismaService>(PrismaService);

  await prismaService.reservationHistory.deleteMany({});
  await prismaService.ticket.deleteMany({});
  await prismaService.spot.deleteMany({});
  await prismaService.event.deleteMany({});

  const eventService = app.get(EventsService);
  const spotService = app.get(SpotsService);

  const createdEvents = await Promise.all(
    events.map((event) =>
      eventService.create({
        name: event.name,
        price: event.price,
        date: new Date(event.date),
      }),
    ),
  );

  const spots = [];
  for (let i = 0; i < numSpots; i++) {
    const row = String.fromCharCode(97 + Math.floor(i / 5));
    const column = (i % 5) + 1;
    createdEvents.forEach((event) => {
      spots.push({
        name: `${row}${column}`,
        eventId: event.id,
      });
    });
  }

  await Promise.all(
    spots.map((spot) => spotService.create(spot.name, spot.eventId)),
  );
}
