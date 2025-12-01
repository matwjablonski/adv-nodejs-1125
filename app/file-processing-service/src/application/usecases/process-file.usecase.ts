import { ProcessFileCommand } from '../../domain/commands/process-file.command.js';
import { WorkerFactory } from '../../infrastructure/workers/worker-factory.js';
import { FileRepositoryPort } from '../ports/file-repository.port.js';
import { FileEntity } from '../../domain/file.entity.js';
import crypto from 'crypto';
import { Fail, Ok, Result } from '../../shared/result.js';
import { Log } from '../../shared/log.decorator.js';

export class ProcessFileUseCase {
  constructor(
    private repo: FileRepositoryPort,
    private wf: WorkerFactory
  ) {}

  @Log()
  async execute(cmd: ProcessFileCommand): Promise<Result<{ fileId: string }>> {
    const blockEventLoop = () => {
      const start = Date.now();

      // eslint-disable-next-line no-empty
      while (Date.now() - start < 200) {}
    }

    try {
      if (!cmd.fileName || cmd.fileName.length === 0) {
        return Fail('Invalid file name');
      }

      if (!cmd.fileBuffer || cmd.fileBuffer.length === 0) {
        return Fail('File buffer is empty');
      }

      blockEventLoop();

      const id = crypto.randomUUID();
      const f = new FileEntity(id, cmd.fileName, 'processing');

      await this.repo.save(f);
      // const w = this.wf.create();

      // w.postMessage({ fileId: id, buffer: cmd.fileBuffer });

      return Ok({ fileId: id });
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : 'Unknown error';
      return Fail(errMsg)
    }
  }
}
