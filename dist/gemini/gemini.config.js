"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAFETY_SETTINGS = exports.GENERATION_CONFIG = void 0;
const generative_ai_1 = require("@google/generative-ai");
exports.GENERATION_CONFIG = { maxOutputTokens: 1024, temperature: 1, topK: 32, topP: 1 };
exports.SAFETY_SETTINGS = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
//# sourceMappingURL=gemini.config.js.map