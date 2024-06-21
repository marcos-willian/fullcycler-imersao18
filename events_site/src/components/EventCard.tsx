import { EventModel } from "@/domain/models/event_model";
import { Title } from "./Title";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/domain/utils";


export type EventCardProps = {
    event: EventModel;
}

export function EventCard(props: EventCardProps) {
    return (
        <div className="bg-secondary rounded-2xl w-[280px]">
            <Link href={`/event/${props.event.id}/spots-layout`} >
                <Image
                    src={props.event.image_url}
                    alt={props.event.name}
                    className="text-default w-full rounded-t-2xl h-[200px]"
                    width={277}
                    height={277}
                />
                <div className="p-4">
                    <p className="text-subtitle capitalize">
                        {formatDate(props.event.date)}
                    </p>
                    <p className="text-default font-semibold">
                        {props.event.name}
                    </p>
                    <p className="text-default font-light">
                        {props.event.location}
                    </p>
                </div>

            </Link>
        </div>
    );
}