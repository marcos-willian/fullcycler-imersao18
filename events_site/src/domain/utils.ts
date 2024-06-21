
export const BaseUrl = process.env.API_URL;


export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

export async function getCardHash(cardData: { cardName: string, cardNumber: string, expireDate: string, cvv: string }) {
    return Math.random().toString(36).substring(7);
}