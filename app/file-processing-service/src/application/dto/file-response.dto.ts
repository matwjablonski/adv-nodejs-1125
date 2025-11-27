export class FileResponseDto {
    constructor(
        public readonly fileId: string,
        public readonly name: string,
        public readonly status: string,
        public readonly uploadedAt: Date,
    ) {}
}