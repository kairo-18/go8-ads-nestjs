import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller('ads-upload')
export class AdsUploadController {
    @Post()
    @UseInterceptors(FileInterceptor('ads', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExt = extname(file.originalname); // Get file extension
                const newFileName = file.fieldname + '-' + uniqueSuffix + fileExt; // Preserve extension

                callback(null, newFileName);
            }
        })
    }))
    uploadFile(@UploadedFile() ads) {
       if (!ads) {
        return {
            statusCode: 400,
            message: 'No file uploaded'
        };
    }

    return {
        statusCode: 200,
        message: 'File uploaded successfully',
        fileUrl: `/api/uploads/${ads.filename}` // Return full file URL
    };
    }
}
