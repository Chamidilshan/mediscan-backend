"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiModule = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini.service");
const gemini_controller_1 = require("./gemini.controller");
const gemini_provider_1 = require("./gemini.provider");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const supabase_module_1 = require("../supabase/supabase.module");
let GeminiModule = class GeminiModule {
};
exports.GeminiModule = GeminiModule;
exports.GeminiModule = GeminiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
            }),
            supabase_module_1.SupabaseModule
        ],
        controllers: [gemini_controller_1.GeminiController],
        providers: [gemini_service_1.GeminiService, gemini_provider_1.GeminiProVisionModelProvider],
        exports: [gemini_service_1.GeminiService],
    })
], GeminiModule);
//# sourceMappingURL=gemini.module.js.map