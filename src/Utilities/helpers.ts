import CONFIG from "@/App/config";

export interface Exception extends Error {
    code?: number
}

export function useException(message: string = "", code?: number): void {
    const err = new Error(message) as Exception;
    err.code = code ?? 0;
    throw err;
}

export function useConfig(key: string, def: any = null) {
    const splitKeys = key.split(".");

    let constant: any = CONFIG;

    for (const k of splitKeys) {
        constant = constant?.[k];

        if (constant === undefined) {
            return def;
        }
    }

    return constant;
}

export function useFormatPrice(value: string): string {
    if (!value) return '';

    const [integer, decimal] = `${value}`.split('.');

    const formatted = integer?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimal !== undefined
        ? `${formatted}.${decimal}`
        : formatted as string;
}

export function useParsePrice(value: string): number {
    const numeric = Number(String(value).replace(/,/g, '').trim())
    return Number.isNaN(numeric) ? 0 : numeric
}
