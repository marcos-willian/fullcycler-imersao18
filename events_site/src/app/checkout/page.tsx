
import { cookies } from "next/headers";
import { Title } from "../../components/Title";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { CheckoutForm } from "./CheckoutForm";
import { formatCurrency, formatDate } from "@/domain/utils";
import { GetEventById } from "@/domain/usecases/getEventById";
import { setInterval } from "timers";


export default async function CheckoutPage() {
    const cookiesStore = cookies();

    cookiesStore.get("checkoutInfo")?.value;
    let { eventId, totalPrice } = JSON.parse(cookiesStore.get("checkoutInfo")?.value || "{}");

    if (!eventId) {
        return redirect("/");
    }
    const event = await GetEventById(eventId);
    return (
        <main className="mt-10 flex flex-wrap justify-center md:justify-between">
            <div className="mb-4 flex max-h-[250px] w-full max-w-[478px] flex-col gap-y-6 rounded-2xl bg-secondary p-4">
                <Title>Resumo da compra</Title>
                <p className="font-semibold">
                    {event.name}
                    <br />
                    {event.location}
                    <br />
                    {formatDate(event.date)}
                </p>
                <p className="font-semibold text-white">{formatCurrency(totalPrice)}</p>
            </div>
            <div className="w-full max-w-[650px] rounded-2xl bg-secondary p-4">
                <Title>Informações de pagamento</Title>
                <CheckoutForm className="mt-6 flex flex-col gap-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="titular">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-2 border-solid rounded p-2 h-10 bg-input"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="titular">Nome no cartão</label>
                        <input
                            type="text"
                            name="card_name"
                            className="mt-2 border-solid rounded p-2 h-10 bg-input"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cc">Numero do cartão</label>
                        <input
                            type="card_number"
                            name="cc"
                            className="mt-2 border-solid rounded p-2 h-10 bg-input"
                        />
                    </div>
                    <div className="flex flex-wrap sm:justify-between">
                        <div className="flex w-full flex-col md:w-auto">
                            <label htmlFor="expire">Vencimento</label>
                            <input
                                type="text"
                                name="expire_date"
                                className="mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input"
                            />
                        </div>
                        <div className="flex w-full flex-col md:w-auto">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                className="mt-2 sm:w-[240px] border-solid rounded p-2 h-10 bg-input"
                            />
                        </div>
                    </div>
                    <button className="rounded-lg bg-btn-primary py-4 px-4 text-sm font-semibold uppercase text-btn-primary">
                        Finalizar pagamento
                    </button>
                </CheckoutForm>
            </div>
        </main>
    );
}
