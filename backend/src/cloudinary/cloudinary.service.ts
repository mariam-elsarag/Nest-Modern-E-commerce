import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { v2 as CloudinaryType } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary: typeof CloudinaryType,
  ) {}

  private uploadStream(
    file: Express.Multer.File,
    options: Record<string, any> = {},
  ) {
    return new Promise<any>((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(file.buffer);
    });
  }
  async uploadImage(file: Express.Multer.File, folder?: string) {
    if (!file?.buffer) throw new BadRequestException('File buffer is missing');
    const options: any = { folder, resource_type: 'image' };
    const result = await this.uploadStream(file, options);
    return result.secure_url;
  }

  async deleteImage(publicId: string) {
    if (!publicId) return null;
    return this.cloudinary.uploader.destroy(publicId, { invalidate: true });
  }

  /**
   * Upload new image first, then delete oldPublicId (if provided).
   * This avoids losing both images in case upload fails.
   */
  async updateImage(
    oldPublicId: string | null | undefined,
    file: Express.Multer.File,
    folder?: string,
  ) {
    const upload = await this.uploadImage(file, folder);
    if (oldPublicId) {
      try {
        await this.deleteImage(oldPublicId);
      } catch (err) {
        this.logger.warn(
          `Failed to delete old image ${oldPublicId}: ${err?.message ?? err}`,
        );
        throw new BadRequestException('Failed to delete old image');
      }
    }
    return upload;
  }

  async uploadMany(files: Express.Multer.File[], folder?: string) {
    return Promise.all(files.map((f) => this.uploadImage(f, folder)));
  }

  async updateMany(
    oldPublicIds: (string | null | undefined)[],
    files: Express.Multer.File[],
    folder?: string,
  ) {
    return Promise.all(
      files.map((file, idx) =>
        this.updateImage(oldPublicIds?.[idx], file, folder),
      ),
    );
  }

  extractPublicIdFromUrl(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
    return match ? match[1] : null;
  }

  validateFileType(file: Express.Multer.File, type: 'image' | 'file'): void {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    const allowedMimeTypes = {
      image: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/jpg',
        'image/gif',
        'image/svg+xml',
      ],
      file: ['application/pdf'],
    };

    const validExtensions = {
      image: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'],
      file: ['.pdf'],
    };

    const fileExt = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'));
    const mimeList = allowedMimeTypes[type];
    const extList = validExtensions[type];

    if (!mimeList.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed types: ${mimeList.join(', ')}.`,
      );
    }

    if (!extList.includes(fileExt)) {
      throw new BadRequestException(
        `Invalid file extension: ${fileExt}. Allowed extensions: ${extList.join(', ')}.`,
      );
    }

    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new BadRequestException(
        `File size exceeds ${MAX_SIZE_MB}MB limit.`,
      );
    }
  }

  validateFiles(files: Express.Multer.File[], type: 'image' | 'file'): void {
    if (!files?.length) {
      throw new BadRequestException('No files provided.');
    }

    for (const file of files) {
      this.validateFileType(file, type);
    }
  }
}
