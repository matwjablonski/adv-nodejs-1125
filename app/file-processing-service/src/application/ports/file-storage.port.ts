export interface FileStoragePort {
  save(buffer: Buffer, name: string): Promise<string>;
}
