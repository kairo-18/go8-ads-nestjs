import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { AdsUploadController } from "./adsUpload.controller";
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'uploads'), // Serve from the project root
            serveRoot: '/uploads', // Accessible at http://localhost:3000/uploads
        })
    ],
    controllers: [AdsUploadController],
    providers: [],
})
export class AdsUploadModule {}
