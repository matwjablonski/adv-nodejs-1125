// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { FileEntity } from "../../domain/file.entity";
import { FileResponseDto } from "../dto/file-response.dto";

export class FileMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toDto(entity: FileEntity): FileResponseDto {
    // implementation
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toDomain(dto: UploadFileDto): { name: string; buffer: Buffer } {
    // implementation
  }
}