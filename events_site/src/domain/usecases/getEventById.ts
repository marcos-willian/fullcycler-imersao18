import { EventModel } from "../models/event_model";
import { BaseUrl } from "../utils";


export async function GetEventById(eventId: string): Promise<EventModel> {
    const response = await fetch(`${BaseUrl}/events/${eventId}`, {
        cache: "no-store",
        headers: {
            "apikey": process.env.API_TOKEN as string
        },
        next: {
            tags: [`events/${eventId}`],
        }

    });

    return response.json();
}