export class FileEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public status: string = 'pending'
  ) {}
}
