import { FileEntity } from '../../domain/file.entity.js';

export interface FileRepositoryPort {
  save(e: FileEntity): Promise<void>;
  findById(id: string): Promise<FileEntity | null>;
}
