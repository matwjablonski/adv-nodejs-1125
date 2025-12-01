import { NextFunction, Response, Request } from "express";

export class EventLoopMonitor {
    static middleware() {
        return (middlewareReq: Request, res: Response, next: NextFunction) => {
            const start = process.hrtime.bigint();

            console.log(`Incoming request: ${middlewareReq.method} ${middlewareReq.url}`);

            const checkEventLoop = () => {
                const startCheck = process.hrtime.bigint();

                setImmediate(() => {
                    const endCheck = process.hrtime.bigint();
                    const delayMs = Number(endCheck - startCheck) / 1_000_000;

                    console.log(`Event loop delay: ${delayMs.toFixed(2)} ms`);
                });
            }

            checkEventLoop();

            res.on('finish', () => {
                const end = process.hrtime.bigint();
                const durationMs = Number(end - start) / 1_000_000;
                console.log(`Request processed in ${durationMs.toFixed(2)} ms`);
            });
            next();
        }
    }
}