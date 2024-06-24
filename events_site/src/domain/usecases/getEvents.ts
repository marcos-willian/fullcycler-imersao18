import { EventModel } from "../models/event_model";
import { BaseUrl } from "../utils";



export async function GetEvents(): Promise<EventModel[]> {
    const response = await fetch(BaseUrl + '/events', {
        cache: "no-store",
        headers: {
            "apikey": process.env.API_TOKEN as string
        },
    });
    const eventsMap = (await response.json());
    return eventsMap.events;
}