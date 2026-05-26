export interface Exception extends Error {
    code?: number
}

export function useExcepetion(message: string = "", code?: number) {
    const err = new Error(message) as Exception;

    if (code) err.code = code;

    throw err;
}
