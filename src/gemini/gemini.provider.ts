/* eslint-disable prettier/prettier */
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { Provider } from "@nestjs/common";
import { GENERATION_CONFIG, SAFETY_SETTINGS } from "./gemini.config";
import { GEMINI_FLASH } from "./gemini.constants";
import { ConfigService } from "@nestjs/config";



export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
    provide: GEMINI_FLASH,
    useFactory: (configService: ConfigService) => {
      const genAI = new GoogleGenerativeAI(configService.get<string>('GEMINI_API_KEY'));
      return genAI.getGenerativeModel({
        model: configService.get<string>('GEMINI_PRO_VISION_MODEL'),
        generationConfig: GENERATION_CONFIG,
        safetySettings: SAFETY_SETTINGS,
      });
    },
    inject: [ConfigService],
  };