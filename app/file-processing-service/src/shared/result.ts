export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export const Ok = <T>(v: T): Result<T> => ({ ok: true, value: v });

export const Fail = (e: string): Result<never> => ({ ok: false, error: e });
