import { format as formatDateFns } from "date-fns";

export function formatCurrency(value: number, showSymbol = true) {
    const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2, minimumFractionDigits: 2, currency: "BRL" };
    if (showSymbol) options.style = "currency";
    return new Intl.NumberFormat("pt-BR", options).format(value);
}

export function formatDate(date: string | number | Date, format: string) {
    return formatDateFns(date, format);
}
