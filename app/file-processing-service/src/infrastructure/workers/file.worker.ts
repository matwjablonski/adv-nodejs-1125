import { Readable, Transform } from 'stream';
import { parentPort } from 'worker_threads';

parentPort!.on('message', async ({ buffer }) => {
  const chunkSize = 64;
  const fileStream = new Readable({
    read() {
      let offset = 0;
      const data = buffer.toString('utf-8');
      
      while (offset < data.length) {
        const chunk = data.slice(offset, offset + chunkSize);
        if (!this.push(chunk)) {
          break;
        }
        offset += chunkSize;
      }
      
      if (offset >= data.length) {
        this.push(null);
      }
    }
  });

  let lineNumber = 1;
  let executionCount = 0;

  const transformStream = new Transform({
    highWaterMark: chunkSize,
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
      parentPort!.postMessage({ error: error.message });
    });
});
