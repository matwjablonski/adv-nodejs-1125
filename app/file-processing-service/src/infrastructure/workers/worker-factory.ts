import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class WorkerFactory {
  create() {
    const p = path.join(__dirname, 'file.worker.js');
    return new Worker(p);
  }
}
