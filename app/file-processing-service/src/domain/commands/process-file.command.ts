export class ProcessFileCommand {
  constructor(
    public readonly fileBuffer: Buffer,
    public readonly fileName: string
  ) {}
}
