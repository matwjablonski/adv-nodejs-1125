import { Readable, Transform } from 'stream';
import { parentPort } from 'worker_threads';

parentPort!.on('message', async ({ buffer }) => {
  const fileStream = Readable.from(buffer.toString('utf-8'), {
    highWaterMark: 1024
  });

  let lineNumber = 1;
  let executionCount = 0;

  const transformStream = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      executionCount++;
      const lines = chunk.toString().split('\n');
      const processedLines = lines
        .map((line, index) => {
          if (index === lines.length - 1 && line === '') {
            return '';
          }
          return `Line ${lineNumber++}: ${line}`;
        })
        .join('\n');
      
      callback(null, processedLines);
    }
  });

  const chunks: string[] = [];
  
  fileStream
    .pipe(transformStream)
    .on('data', (chunk) => {
      chunks.push(chunk.toString());
    })
    .on('end', () => {
      console.log(`Total transform executions: ${executionCount}`);
      const result = chunks.join('');
      parentPort!.postMessage({ buffer: Buffer.from(result) });
    })
    .on('error', (error) => {
      console.error('Stream error:', error);
      parentPort!.postMessage({ error: error.message });
    });
});


// async function poll(delayMs: number) {
//   try {
//     const res = await fetch('http://localhost:3000/health');

//     if (!res.ok) {
//       throw new Error(`Health check failed with status: ${res.status}`);
//     }

//     const data = await res.json();

//     // Adjust delay based on health status

//     delayMs = 2000;
//   } catch (e) {
//     console.error('Health check error:', e);
//   } finally {

//     setTimeout(() => poll(delayMs), delayMs);
//   }
// }

// poll(5000);