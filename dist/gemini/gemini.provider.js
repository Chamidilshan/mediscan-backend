"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiProVisionModelProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
const gemini_config_1 = require("./gemini.config");
const gemini_constants_1 = require("./gemini.constants");
const config_1 = require("@nestjs/config");
exports.GeminiProVisionModelProvider = {
    provide: gemini_constants_1.GEMINI_FLASH,
    useFactory: (configService) => {
        const genAI = new generative_ai_1.GoogleGenerativeAI(configService.get('GEMINI_API_KEY'));
        return genAI.getGenerativeModel({
            model: configService.get('GEMINI_PRO_VISION_MODEL'),
            generationConfig: gemini_config_1.GENERATION_CONFIG,
            safetySettings: gemini_config_1.SAFETY_SETTINGS,
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=gemini.provider.js.map