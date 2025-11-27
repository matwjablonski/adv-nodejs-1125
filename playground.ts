type A<R = string> = {
    a: string;
    b: number;
    c: R;
} | R;

declare const aVar: A<number>; // aVar = { a: string; b: number; c: number; }
declare const bVar: A;        // bVar = { a: string; b: number; c: string; }
const aTest: A<string> = 'test'; // aTest = string