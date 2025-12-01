import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class WorkerFactory {
  create() {
    const projectRoot = path.join(__dirname, '../../..');
    const distWorkerPath = path.join(projectRoot, 'dist/infrastructure/workers/file.worker.js');
    
    if (!fs.existsSync(distWorkerPath)) {
      try {
        execSync('npm run build', {
          cwd: projectRoot,
          stdio: 'inherit'
        });
      } catch (error) {
        throw new Error('Cannot create worker - compilation failed', error instanceof Error ? { cause: error } : undefined);
      }
    }

    return new Worker(distWorkerPath);
  }
}
