'use server'
import { cookies } from "next/headers";
import { Checkout } from "./usecases/checkout";
import { revalidateTag } from "next/cache";
import { redirect, useRouter } from "next/navigation";


export async function handleSelect(isSelect: boolean, eventId: string, spotName: string) {
    const cache = cookies();
    //Ensure string
    eventId = eventId.toString()

    if (isSelect) {
        const spotsCache: string[] = JSON.parse(cache.get(eventId)?.value || '[]')!
        if (spotsCache.length == 0) {
            cache.set(
                eventId,
                JSON.stringify([spotName]),
            );
            return;
        }

        spotsCache.push(spotName);
        const uniSpots = spotsCache.filter(
            (spot: string, index: number) => spotsCache.indexOf(spot) === index
        );
        cache.set(
            eventId,
            JSON.stringify(uniSpots),
        );
        return;
    }

    //If Is not select mode
    const spotsCache: string[] = JSON.parse(cache.get(eventId)?.value || '[]')!;
    const newSpots = spotsCache.filter((spot) => spot != spotName);
    cache.set(
        eventId,
        JSON.stringify(newSpots),
    );
}

interface InfoCheckout {
    eventId: string;
    totalPrice: number
}

export async function selectTicketKind(ticketKind: string) {
    cookies().set("ticketKind", ticketKind);
}

export async function fillInfoCheckoutAction(goToCheckout: InfoCheckout) {
    cookies().set("checkoutInfo", JSON.stringify(goToCheckout));

}

export async function checkoutAction(prevState: any, {
    cardHash,
    email,
}: {
    cardHash: string;
    email: string;
}) {
    const cache = cookies();
    const { eventId } = JSON.parse(cache.get("checkoutInfo")?.value || '');
    const spots: string[] = JSON.parse(cache.get(eventId)?.value || '[]');
    const ticket_kind = cache.get("ticketKind")?.value || ''

    const response = await Checkout({
        email,
        card_hash: cardHash,
        event_id: eventId,
        spots,
        ticket_kind
    });

    if (!response.ok) {
        return { error: "Erro ao realizar a compra" };
    }

    cache.delete("checkoutInfo");
    revalidateTag(`events/${eventId}`);
    redirect(`/checkout/${eventId}/success`);
}