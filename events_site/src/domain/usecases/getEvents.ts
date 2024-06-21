import { EventModel } from "../models/event_model";
import { BaseUrl } from "../utils";



export async function GetEvents(): Promise<EventModel[]> {
    console.log(BaseUrl + '/events');
    const response = await fetch(BaseUrl + '/events', {
        cache: "no-store",
    });
    const eventsMap = (await response.json());
    return eventsMap.events;
}