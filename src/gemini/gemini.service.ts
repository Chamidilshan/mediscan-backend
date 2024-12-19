/* eslint-disable prettier/prettier */
import { Content, GenerativeModel, Part } from '@google/generative-ai';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GEMINI_FLASH } from './gemini.constants';

@Injectable()
export class GeminiService {

    constructor(
        @Inject(GEMINI_FLASH) private readonly proVisionModel: GenerativeModel,
    ){}

    async generateDocumentRseult(file: Express.Multer.File){
      const prompt = "Analyze the uploaded image to determine if it is a medical document, such as a patient diagnosis or medical report, written by a doctor or medical professional.\nIf the document is not a medical document, respond with a clear statement: 'This document is not identified as a medical document.'\nIf the document is identified as a medical document, extract the relevant information and present it in a structured and simplified way that a layperson can understand. Include the following sections:\n\nPatient Information: Name, age, gender, etc.\nSymptoms: List the symptoms mentioned.\nDiagnosis: Provide a simplified explanation of the diagnosis.\nTreatment Plan: Outline the recommended treatment or advice.\nAdditional Notes: Include any observations or recommendations from the doctor.";
      
      try{
            const contents: Content[] = [
                {
                  role: 'user',
                  parts: [
                    {
                      inlineData: {
                        mimeType: file.mimetype,
                        data: file.buffer.toString('base64'),
                      },
                    } as Part,
                    { text: prompt } as Part,
                  ],
                },
                // {
                //   role: "model",
                //   parts: [
                //     {text: "```json\n"},
                //     {text: "```json\n"},
                //     {text: "```json\n"},
                //     {text: "```json\n"},
                //     {text: "```json\n"},
                //     {text: "{\"response\": \"```json\\n{\\n  \\\"Patient Information\\\": {\\n    \\\"Patient Name\\\": \\\"Patient, USCAP\\\",\\n    \\\"Age\\\": 68,\\n    \\\"Gender\\\": \\\"Female\\\",\\n    \\\"Medical Record Number (MRN)\\\": 9876543\\n  },\\n  \\\"Diagnosis\\\": {\\n    \\\"Primary Diagnosis\\\": \\\"Invasive moderately differentiated adenocarcinoma of the lung\\\",\\n    \\\"Additional Findings\\\": [\\n      \\\"Acinar-predominant subtype\\\",\\n      \\\"pT2aN1 stage (indicating tumor size and spread to lymph nodes)\\\",\\n      \\\"Positive for EGFR L858R mutation (a genetic mutation that can be targeted with specific therapies)\\\",\\n      \\\"Negative for ALK gene rearrangement (another genetic marker sometimes found in lung cancer)\\\",\\n      \\\"Lymph node involvement (1 out of 5 lymph nodes examined showed cancer cells)\\\",\\n      \\\"Visceral pleural and lympho-vascular invasion present (cancer has spread to the lining of the lung and surrounding blood vessels/lymph vessels)\\\",\\n      \\\"Positive surgical margin (cancer cells were present at the edge of the removed tissue)\\\"\\n    ]\\n  },\\n \\\"Specimen(s) Received\\\":[\\n{\\\"Specimen\\\":\\\"Lymph-Node\\\",\\\"Location\\\":\\\"ST10R TB Angle\\\"},\\n{\\\"Specimen\\\":\\\"Right middle lobe\\\"},\\n{\\\"Specimen\\\":\\\"Station 11R\\\"},\\n{\\\"Specimen\\\":\\\"Station 4R\\\"},\\n{\\\"Specimen\\\":\\\"Station 7\\\"},\\n{\\\"Specimen\\\":\\\"Interlobar ST11\\\"},\\n{\\\"Specimen\\\":\\\"Right middle and upper bilobectomy\\\"}\\n],\\n  \\\"Treatment Plan\\\": \\\"The report doesn't explicitly state a treatment plan, as pathology reports primarily focus on diagnosis.  The presence of the EGFR L858R mutation suggests that targeted therapy may be an option. Further discussions with the oncologist are necessary to determine the best course of treatment.\\\"\\n}\\n```\"}"},
                //     {text: "\n```"},
                //   ],
                // },
                
              ];
            
              const result = await this.proVisionModel.generateContent({ contents });
              const response =  result.response;
        
              return response.text();
        

        }catch(e){
            if (e instanceof Error) {
                throw new InternalServerErrorException(e.message, e.stack);
              }
              throw e;
        }
    }

}
