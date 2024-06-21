import { PropsWithChildren } from "react";

export class TitleProps {
    className?: string;
}

export function Title(props: PropsWithChildren<TitleProps>) {
    return (
        <h1 className={`text-left text-default text-3xl font-bold ${props.className}`}>
            {props.children}
        </h1>
    );
}