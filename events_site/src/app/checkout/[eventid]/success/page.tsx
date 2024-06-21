import { cookies } from "next/headers";
import { Title } from "../../../../components/Title";
import { GetEventById } from "@/domain/usecases/getEventById";
import { formatDate } from "@/domain/utils";


export default async function CheckoutSuccessPage({
    params,
}: {
    params: { eventId: string };
}) {
    const event = await GetEventById(params.eventId);
    const cookiesStore = cookies();
    const selectedSpots = JSON.parse(cookiesStore.get(params.eventId)?.value || "[]");
    return (
        <main className="mt-10 flex flex-col flex-wrap items-center ">
            <Title>Compra realizada com sucesso!</Title>
            <div className="mb-4 flex max-h-[250px] w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary p-4">
                <Title>Resumo da compra</Title>
                <p className="font-semibold">
                    Evento {event.name}
                    <br />
                    Local {event.location}
                    <br />
                    Data{" "}
                    {formatDate(event.date)}
                </p>
                <p className="font-semibold text-white">Lugares escolhidos: {selectedSpots.join(", ")}</p>

            </div>
        </main>
    );
}
