import { ProcessFileCommand } from '../../domain/commands/process-file.command.js';
import { WorkerFactory } from '../../infrastructure/workers/worker-factory.js';
import { FileRepositoryPort } from '../ports/file-repository.port.js';
import { FileEntity } from '../../domain/file.entity.js';
import crypto from 'crypto';

export class ProcessFileUseCase {

  constructor(
    private repo: FileRepositoryPort,
    private wf: WorkerFactory
  ) {}

  async execute(cmd: ProcessFileCommand) {
    const id = crypto.randomUUID();
    const f = new FileEntity(id, cmd.fileName, 'processing');

    await this.repo.save(f);
    const w = this.wf.create();

    w.postMessage({ fileId: id, buffer: cmd.fileBuffer });

    return { fileId: id };
  }
}
