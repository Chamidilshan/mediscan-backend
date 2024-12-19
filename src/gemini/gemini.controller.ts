/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate-result')
  @UseInterceptors(FileInterceptor('file'))
  async generateText(@UploadedFile() file: Express.Multer.File) { 
    console.log('Received file:', file);  // Log the file to verify it's received
    
    try {
      if (!file) {
        return { message: 'No file uploaded' };
      }
      const text = await this.geminiService.generateDocumentRseult(file);
      return { text };
    } catch (error) {
      console.error('Error generating text:', error);
      return { message: 'Error processing the file', error: error.message };
    }
  }
}  