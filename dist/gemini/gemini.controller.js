"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiController = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini.service");
const platform_express_1 = require("@nestjs/platform-express");
let GeminiController = class GeminiController {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async generateText(userId, file) {
        console.log('Received file:', file);
        try {
            if (!file) {
                return { message: 'No file uploaded' };
            }
            if (!userId) {
                return { message: 'No user id provided' };
            }
            const text = await this.geminiService.generateDocumentRseult(userId, file);
            return { text };
        }
        catch (error) {
            console.error('Error generating text:', error);
            return { message: 'Error processing the file', error: error.message };
        }
    }
};
exports.GeminiController = GeminiController;
__decorate([
    (0, common_1.Post)('generate-result'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "generateText", null);
exports.GeminiController = GeminiController = __decorate([
    (0, common_1.Controller)('gemini'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], GeminiController);
//# sourceMappingURL=gemini.controller.js.map