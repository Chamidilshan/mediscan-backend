/* eslint-disable prettier/prettier */
import { GenerativeModel } from '@google/generative-ai';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GEMINI_FLASH } from './gemini.constants';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class GeminiService {

  constructor(
    @Inject(GEMINI_FLASH) private readonly proVisionModel: GenerativeModel,
    private readonly supabaseService: SupabaseService,
  ) { }

  async generateDocumentRseult(userId: string, file: Express.Multer.File) {
    // const prompt = "Analyze the uploaded image to determine if it is a medical document, such as a patient diagnosis or medical report, written by a doctor or medical professional.\nIf the document is not a medical document, respond with a clear statement: 'This document is not identified as a medical document.'\nIf the document is identified as a medical document, extract the relevant information and present it in a structured and simplified way that a layperson can understand. Include the following sections:\n\nPatient Information: Name, age, gender, etc.\nSymptoms: List the symptoms mentioned.\nDiagnosis: Provide a simplified explanation of the diagnosis.\nTreatment Plan: Outline the recommended treatment or advice.\nAdditional Notes: Include any observations or recommendations from the doctor.";

    try {
      // const contents: Content[] = [
      //     {
      //       role: 'user',
      //       parts: [
      //         {
      //           inlineData: {
      //             mimeType: file.mimetype,
      //             data: file.buffer.toString('base64'),
      //           },
      //         } as Part,
      //         { text: prompt } as Part,
      //       ],
      //     },
      //     {
      //       role: "model",
      //       parts: [
      //         {text: "```json\n"},
      //         {text: "```json\n"},
      //         {text: "```json\n"},
      //         {text: "```json\n"},
      //         {text: "```json\n"},
      //         {text: "{\"response\": \"```json\\n{\\n  \\\"Patient Information\\\": {\\n    \\\"Patient Name\\\": \\\"Patient, USCAP\\\",\\n    \\\"Age\\\": 68,\\n    \\\"Gender\\\": \\\"Female\\\",\\n    \\\"Medical Record Number (MRN)\\\": 9876543\\n  },\\n  \\\"Diagnosis\\\": {\\n    \\\"Primary Diagnosis\\\": \\\"Invasive moderately differentiated adenocarcinoma of the lung\\\",\\n    \\\"Additional Findings\\\": [\\n      \\\"Acinar-predominant subtype\\\",\\n      \\\"pT2aN1 stage (indicating tumor size and spread to lymph nodes)\\\",\\n      \\\"Positive for EGFR L858R mutation (a genetic mutation that can be targeted with specific therapies)\\\",\\n      \\\"Negative for ALK gene rearrangement (another genetic marker sometimes found in lung cancer)\\\",\\n      \\\"Lymph node involvement (1 out of 5 lymph nodes examined showed cancer cells)\\\",\\n      \\\"Visceral pleural and lympho-vascular invasion present (cancer has spread to the lining of the lung and surrounding blood vessels/lymph vessels)\\\",\\n      \\\"Positive surgical margin (cancer cells were present at the edge of the removed tissue)\\\"\\n    ]\\n  },\\n \\\"Specimen(s) Received\\\":[\\n{\\\"Specimen\\\":\\\"Lymph-Node\\\",\\\"Location\\\":\\\"ST10R TB Angle\\\"},\\n{\\\"Specimen\\\":\\\"Right middle lobe\\\"},\\n{\\\"Specimen\\\":\\\"Station 11R\\\"},\\n{\\\"Specimen\\\":\\\"Station 4R\\\"},\\n{\\\"Specimen\\\":\\\"Station 7\\\"},\\n{\\\"Specimen\\\":\\\"Interlobar ST11\\\"},\\n{\\\"Specimen\\\":\\\"Right middle and upper bilobectomy\\\"}\\n],\\n  \\\"Treatment Plan\\\": \\\"The report doesn't explicitly state a treatment plan, as pathology reports primarily focus on diagnosis.  The presence of the EGFR L858R mutation suggests that targeted therapy may be an option. Further discussions with the oncologist are necessary to determine the best course of treatment.\\\"\\n}\\n```\"}"},
      //         {text: "\n```"},
      //       ],
      //     },

      //   ];

      //   const result = await this.proVisionModel.generateContent({ contents });
      //   const response =  result.response;

      //   return response.text();


      // const generationConfig = {
      //   temperature: 1,
      //   topP: 0.95,
      //   topK: 40,
      //   maxOutputTokens: 8192,
      //   responseMimeType: "application/json",
      //   responseSchema: {
      //     type: "object",
      //     properties: {
      //       response: {
      //         type: "string"
      //       }
      //     }
      //   },
      // }; 


      const prompt = `Analyze the uploaded image to determine if it is a medical document, such as a patient diagnosis or medical report, written by a doctor or medical professional.\nIf the document is not a medical document, respond with a clear statement: 'This document is not identified as a medical document.'\nIf the document is identified as a medical document, extract the relevant information and present it in a structured and simplified way that a layperson can understand. Include the following sections:\n\nPatient Information: Name, age, gender, etc.\nSymptoms: List the symptoms mentioned.\nDiagnosis: Provide a simplified explanation of the diagnosis.\nTreatment Plan: Outline the recommended treatment or advice.\nAdditional Notes: Include any observations or recommendations from the doctor. Your response must be a JSON object.\n 
      ensure that each field is included even if the data is not available (use empty strings or empty arrays as appropriate):

      Patient Information:
      - Name (string)
      - Age (number)
      - Gender (string)
      - Height (string)
      - Weight (string)
      - BMI (string)
      
      Symptoms (array of strings)
      
      Diagnosis (string)
      
      Treatment Plan (string)
      
      Additional Notes (string)
      
      Your response must be a JSON object.
      `;



      const chatSession = this.proVisionModel.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: file.mimetype,
                  data: file.buffer.toString('base64'),
                },
              },
              { text: prompt },          
            ],
          },
          {
            role: "model",
            parts: [
              { text: "```json\n" },
              { text: "```json\n" },
              { text: "```json\n" },
              { text: "```json\n" },
              { text: "```json\n" },
              { text: "{\"response\": \"```json\\n{\\n  \\\"Patient Information\\\": {\\n    \\\"Patient Name\\\": \\\"Patient, USCAP\\\",\\n    \\\"Age\\\": 68,\\n    \\\"Gender\\\": \\\"Female\\\",\\n    \\\"Medical Record Number (MRN)\\\": 9876543\\n  },\\n  \\\"Diagnosis\\\": {\\n    \\\"Primary Diagnosis\\\": \\\"Invasive moderately differentiated adenocarcinoma of the lung\\\",\\n    \\\"Additional Findings\\\": [\\n      \\\"Acinar-predominant subtype\\\",\\n      \\\"pT2aN1 stage (indicating tumor size and spread to lymph nodes)\\\",\\n      \\\"Positive for EGFR L858R mutation (a genetic mutation that can be targeted with specific therapies)\\\",\\n      \\\"Negative for ALK gene rearrangement (another genetic marker sometimes found in lung cancer)\\\",\\n      \\\"Lymph node involvement (1 out of 5 lymph nodes examined showed cancer cells)\\\",\\n      \\\"Visceral pleural and lympho-vascular invasion present (cancer has spread to the lining of the lung and surrounding blood vessels/lymph vessels)\\\",\\n      \\\"Positive surgical margin (cancer cells were present at the edge of the removed tissue)\\\"\\n    ]\\n  },\\n \\\"Specimen(s) Received\\\":[\\n{\\\"Specimen\\\":\\\"Lymph-Node\\\",\\\"Location\\\":\\\"ST10R TB Angle\\\"},\\n{\\\"Specimen\\\":\\\"Right middle lobe\\\"},\\n{\\\"Specimen\\\":\\\"Station 11R\\\"},\\n{\\\"Specimen\\\":\\\"Station 4R\\\"},\\n{\\\"Specimen\\\":\\\"Station 7\\\"},\\n{\\\"Specimen\\\":\\\"Interlobar ST11\\\"},\\n{\\\"Specimen\\\":\\\"Right middle and upper bilobectomy\\\"}\\n],\\n  \\\"Treatment Plan\\\": \\\"The report doesn't explicitly state a treatment plan, as pathology reports primarily focus on diagnosis.  The presence of the EGFR L858R mutation suggests that targeted therapy may be an option. Further discussions with the oncologist are necessary to determine the best course of treatment.\\\"\\n}\\n```\"}" },
              { text: "\n```" },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage("");
      const responseText = result.response.text();
      console.log(responseText);

      try {
        const cleanedText = responseText.replace(/```json\n|```/g, '');
        const jsonResponse = JSON.parse(cleanedText);

       try{
        const imagePath =  `${userId}/${Date.now()}.jpg`;

        const uploadData = await this.supabaseService.uploadFile(
          'scanned-images',
          imagePath,
          file.buffer,
          file.mimetype,
        );

        const record = {
          userId,
          result: jsonResponse,
          imageUrl: uploadData.path,
          scannedAt: new Date(),
        };


        await this.supabaseService.saveRecord('scanned_results', record);
       } catch(e){
          console.error('Error saving record:', e);
       } 

       const formattedResponse = {
        "Patient Information": jsonResponse["Patient Information"] || {
          "Name": "N/A",
          "Age": "N/A",
          "Gender": "N/A",
          "Height": "N/A",
          "Weight": "N/A",
          "BMI": "N/A"
        },
        "Symptoms": jsonResponse["Symptoms"] || ["N/A"],
        "Diagnosis": jsonResponse["Diagnosis"] || "N/A",
        "Treatment Plan": jsonResponse["Treatment Plan"] || "N/A",
        "Additional Notes": jsonResponse["Additional Notes"] || "N/A"
      };

        return formattedResponse;
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        throw new InternalServerErrorException('Failed to parse JSON response');
      }


    } catch (e) {
      if (e instanceof Error) {
        throw new InternalServerErrorException(e.message, e.stack);
      } 
      throw e;
    }
  }

}
