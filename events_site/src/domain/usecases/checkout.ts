import { BaseUrl } from "../utils";


export async function Checkout(data: {
    event_id: string,
    card_hash: string,
    ticket_kind: string,
    spots: string[],
    email: string,
}): Promise<Response> {
    return await fetch(`${BaseUrl}/checkout`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "apikey": process.env.API_TOKEN as string

        },

    });
}