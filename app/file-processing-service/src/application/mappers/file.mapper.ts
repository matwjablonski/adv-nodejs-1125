import { FileEntity } from "../../domain/file.entity";
import { FileResponseDto } from "../dto/file-response.dto";
import { UploadFileDto } from "../dto/upload-file.dto";

export class FileMapper {
  static toDto(entity: FileEntity): FileResponseDto {
    return new FileResponseDto(
      entity.id,
      entity.name,
      entity.status,
      new Date(),
    );
  }

  static toDomain(dto: UploadFileDto, buffer: Buffer): { name: string; buffer: Buffer } {
    return {
      name: dto.originalname,
      buffer: buffer,
    }
  }
}