import { GeminiService } from './gemini.service';
export declare class GeminiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    generateText(userId: string, file: Express.Multer.File): Promise<{
        message: string;
        text?: undefined;
        error?: undefined;
    } | {
        text: {
            "Patient Information": any;
            Symptoms: any;
            Diagnosis: any;
            "Treatment Plan": any;
            "Additional Notes": any;
        };
        message?: undefined;
        error?: undefined;
    } | {
        message: string;
        error: any;
        text?: undefined;
    }>;
}
