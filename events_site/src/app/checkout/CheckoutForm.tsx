"use client";

import { getCardHash } from "@/domain/utils";
import { PropsWithChildren } from "react";
import { checkoutAction } from '@/domain/actions'
import { useFormState } from "react-dom";



export type CheckoutFormProps = {
    className?: string;
};

export function CheckoutForm(props: PropsWithChildren<CheckoutFormProps>) {

    const [state, formAction] = useFormState(checkoutAction, {
        error: null as string | null,
    });

    return (
        <form
            action={async (formData: FormData) => {
                const card_hash = await getCardHash({
                    cardName: formData.get("card_name") as string,
                    cardNumber: formData.get("cc") as string,
                    expireDate: formData.get("expire_date") as string,
                    cvv: formData.get("cvv") as string,
                });
                formAction({
                    cardHash: card_hash,
                    email: formData.get("email") as string,
                });
            }}
            className={props.className}
        >
            {state?.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {state.error}
            </div>}
            <input type="hidden" name="card_hash" />
            {props.children}
        </form>
    );
}
