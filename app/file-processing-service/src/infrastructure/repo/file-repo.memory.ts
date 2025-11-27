import { FileRepositoryPort } from '../../application/ports/file-repository.port.js';
import { FileEntity } from '../../domain/file.entity.js';

export class InMemoryFileRepository implements FileRepositoryPort {
  store = new Map<string, FileEntity>();

  async save(e: FileEntity) {
    this.store.set(e.id, e);
  }

  async findById(id: string) {
    return this.store.get(id) || null;
  }
}
