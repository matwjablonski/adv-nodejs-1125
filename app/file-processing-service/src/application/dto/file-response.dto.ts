export class FileResponseDto {
    constructor(
        private fileId: string,
        private name: string,
        private status: string,
        private uploadedAt: Date,
    ) {}
}