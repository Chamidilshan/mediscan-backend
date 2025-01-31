/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { GeminiProVisionModelProvider } from './gemini.provider';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SupabaseModule } from 'src/supabase/supabase.module';



@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    SupabaseModule
  ],
  controllers: [GeminiController], 
  providers: [GeminiService, GeminiProVisionModelProvider],
  exports: [GeminiService], 
})
export class GeminiModule {}
