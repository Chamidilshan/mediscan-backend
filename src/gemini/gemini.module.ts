/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { GeminiProVisionModelProvider } from './gemini.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';



@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [GeminiController],
  providers: [GeminiService, GeminiProVisionModelProvider],
  exports: [GeminiService], 
})
export class GeminiModule {}
