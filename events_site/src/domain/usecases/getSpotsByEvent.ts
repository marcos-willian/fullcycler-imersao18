import { EventModel } from "../models/event_model";
import { SpotModel } from "../models/spot_model";
import { BaseUrl } from "../utils";



export async function GetSpotsByEvent(eventId: string): Promise<{ event: EventModel, spots: SpotModel[] }> {
    const response = await fetch(`${BaseUrl}/events/${eventId}/spots`, {
        cache: "no-store",
        headers: {
            "apikey": process.env.API_TOKEN as string
        },
    });
    return (await response.json());

}