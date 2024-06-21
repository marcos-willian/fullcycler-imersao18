import { EventCard } from "@/components/EventCard";
import { Title } from "@/components/Title";
import { EventModel } from "@/domain/models/event_model";
import { GetEvents } from "@/domain/usecases/getEvents";
import Image from "next/image";



export default async function HomePage() {
  const events = await GetEvents();
  return (
    <main className="mt-10 flex flex-col s">
      <Title>Encontre seu evento aqui</Title>
      <div className="py-4 sm:grid  sm:grid-cols-auto-fit-cards flex items-center  justify-center gap-x-2 gap-y-4">
        {events.map(
          (event) => <EventCard
            key={event.id}
            event={event} />
        )}

      </div>

    </main>
  );
}
