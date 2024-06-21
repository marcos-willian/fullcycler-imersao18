'use server'
import GoToCheckoutLink from "@/components/GoToCheckoutLink";
import { SpotSeat } from "@/components/SpotSeat";
import { TicketKindSelect } from "@/components/TicketKindSelect";
import { Title } from "@/components/Title";
import { SpotModel } from "@/domain/models/spot_model";
import { GetSpotsByEvent } from "@/domain/usecases/getSpotsByEvent";
import { formatCurrency, formatDate } from "@/domain/utils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

function groupSpotByRow(spots: SpotModel[]): { name: string, spots: SpotModel[] }[] {
    const rows: { name: string, spots: SpotModel[] }[] = [];
    for (const spot of spots) {
        const letter = spot.name.charAt(0);
        const index = rows.findIndex((row) => row.name == letter)
        if (index == -1) {
            rows.push({
                name: letter,
                spots: [spot]
            });
        } else {
            rows[index].spots.push(spot);
        }
    }
    return rows;
}

export default async function SpotsLayoutPage({ params, }: { params: { eventId: string } }) {
    const info = await GetSpotsByEvent(params.eventId);
    const spotGroupedByRow = groupSpotByRow(info.spots);

    const cookieStore = cookies();
    const selectedSpots: string[] = JSON.parse(cookieStore.get(params.eventId)?.value || "[]");
    const ticketKind = cookieStore.get("ticketKind")?.value as ("full" | "half") || "full";
    const divider = ticketKind == "full" ? 1 : 2;
    const totalPrice = (selectedSpots.length * info.event.price / divider);

    return (
        <main className="mt-10">
            <div className="flex w-[1176px] max-w-full flex-row flex-wrap justify-center gap-x-8 rounded-2xl bg-secondary p-4 md:justify-normal">
                <Image src="" alt="" />
                <div className="flex max-w-full flex-col gap-y-6">
                    <div className="flex flex-col gap-y-2 ">
                        <p className="text-sm font-semibold uppercase text-subtitle">

                            {formatDate(info.event.date)}
                        </p>
                        <p className="text-2xl font-semibold">{info.event.name}</p>
                        <p className="font-normal">{info.event.location}</p>
                    </div>
                    <div className="flex h-[128px] flex-wrap justify-between gap-y-5 gap-x-3">
                        <div className="flex flex-col gap-y-2">
                            <p className="font-semibold">Organizador</p>
                            <p className="text-sm font-normal">{info.event.organization}</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="font-semibold">Classificação</p>
                            <p className="text-sm font-normal">{info.event.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Title className="mt-10">Escolha seu lugar</Title>
            <div className="mt-6 flex flex-wrap justify-between">
                <div className=" mb-4 flex w-full max-w-[650px] flex-col gap-y-8 rounded-2xl bg-secondary p-6">
                    <div className="rounded-2xl bg-bar py-4 text-center text-[20px] font-bold uppercase text-white">
                        Palco
                    </div>
                    <div className="md:w-full md:justify-normal">
                        {
                            spotGroupedByRow.map((row) => {
                                return (
                                    <div
                                        key={row.name}
                                        className="flex flex-row gap-3 items-center mb-3"
                                    >
                                        <div className="w-4">{row.name}</div>
                                        <div className="ml-2 flex flex-row">
                                            {row.spots.map((spot) => {
                                                return (
                                                    <SpotSeat
                                                        key={spot.id}
                                                        spotName={spot.name}
                                                        spotLabel={spot.name.slice(1)}
                                                        eventId={info.event.id}
                                                        selected={selectedSpots.includes(spot.name)}
                                                        disabled={spot.status === "sold"}
                                                    />
                                                );
                                            }
                                            )}
                                        </div>
                                    </div>

                                );
                            })
                        }
                    </div>
                    <div className="flex w-full flex-row justify-around">
                        <div className=" flex flex-row items-center">
                            <span className="mr-1 block h-4 w-4 rounded-full bg-[#00A96E]" />
                            Disponível
                        </div>
                        <div className=" flex flex-row items-center">
                            <span className="mr-1 block h-4 w-4 rounded-full bg-[#A6ADBB]" />
                            Ocupado
                        </div>
                        <div className=" flex flex-row items-center">
                            <span className="mr-1 block h-4 w-4  rounded-full bg-[#7480FF]" />
                            Selecionado
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary px-4 py-6">
                    <h1 className="text-[20px] font-semibold">
                        Confira os valores do evento
                    </h1>
                    <p>
                        Inteira: {formatCurrency(info.event.price)} <br />
                        Meia-entrada: {formatCurrency(info.event.price / 2)}
                    </p>
                    <div className="flex flex-col">
                        <TicketKindSelect
                            defaultValue={ticketKind}
                            price={info.event.price}
                        />
                    </div>
                    <div>Total {formatCurrency(totalPrice)}</div>

                    <GoToCheckoutLink eventId={info.event.id} totalPrice={totalPrice} />
                </div>
            </div>
        </main>
    );
}