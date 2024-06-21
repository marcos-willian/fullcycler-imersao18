import Image from "next/image";
import Link from "next/link";



export function NavBar() {
    return (
        <div className="bg-bar flex rounded-md max-w-full items-center ">
            <div className="flex grow items-center justify-normal px-3">

                <Link href="/">
                    <Image
                        src="/icone.svg"
                        alt="Icone DevTicket"
                        width={136}
                        height={48}
                        className="max-h-[48px]"
                    />
                </Link>
            </div>
            <Link href="/checkout" className="grow-0">
                <Image
                    src="/cart-outline.svg"
                    alt="Icone DevTicket"
                    width={136}
                    height={48}
                    className="max-h-[24px]"
                />
            </Link>
        </div>
    );
}