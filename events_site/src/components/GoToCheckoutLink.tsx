'use client'
import { fillInfoCheckoutAction } from "@/domain/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface GoToCheckoutLinkProps {
    eventId: string,
    totalPrice: number,
}


export default function GoToCheckoutLink(props: GoToCheckoutLinkProps) {


    return (<Link
        href={{
            pathname: "/checkout",

        }}

        className="rounded-lg bg-btn-primary py-4 text-sm font-semibold uppercase text-btn-primary text-center hover:bg-[#fff]"
        onClickCapture={async () => {
            await fillInfoCheckoutAction(props)

        }}>
        Ir para pagamento
    </Link>);
}