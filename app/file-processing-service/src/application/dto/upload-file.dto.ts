export interface UploadFileDto {
    originalname: string;
    mimetype: string;
    size: number
}

export const isUploadFileDto = (value: unknown) => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'originalname' in value &&
        typeof value.originalname === 'string' &&
        'mimetype' in value &&
        typeof value.mimetype === 'string' &&
        'size' in value &&
        typeof value.size === 'number'
    );
}
