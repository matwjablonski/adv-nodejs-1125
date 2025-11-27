import { parentPort } from 'worker_threads';

parentPort!.on('message', async ({ fileId }) => {
  for (let i = 0; i <= 100; i += 10) {
    parentPort!.postMessage({ fileId, progress: i });
    await new Promise(r => setTimeout(r, 100));
  }

  parentPort!.postMessage({ fileId, done: true });
});
