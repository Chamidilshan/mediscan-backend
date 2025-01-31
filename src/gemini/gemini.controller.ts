/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate-result')
  @UseInterceptors(FileInterceptor('file'))
  async generateText(
    @Body('userId') userId: string,
    @UploadedFile() file: Express.Multer.File
  ) { 
    console.log('Received file:', file);
    
    try {
      if (!file) {
        return { message: 'No file uploaded' };
      }
      if(!userId){
        return { message: 'No user id provided' };
      }
      const text = await this.geminiService.generateDocumentRseult(userId, file);
      return { text };
    } catch (error) {
      console.error('Error generating text:', error); 
      return { message: 'Error processing the file', error: error.message };
    }
  }
}  