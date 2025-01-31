import { GenerativeModel } from '@google/generative-ai';
import { SupabaseService } from 'src/supabase/supabase.service';
export declare class GeminiService {
    private readonly proVisionModel;
    private readonly supabaseService;
    constructor(proVisionModel: GenerativeModel, supabaseService: SupabaseService);
    generateDocumentRseult(userId: string, file: Express.Multer.File): Promise<{
        "Patient Information": any;
        Symptoms: any;
        Diagnosis: any;
        "Treatment Plan": any;
        "Additional Notes": any;
    }>;
}
