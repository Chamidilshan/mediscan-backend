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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("./supabase.service");
let SupabaseController = class SupabaseController {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
};
exports.SupabaseController = SupabaseController;
exports.SupabaseController = SupabaseController = __decorate([
    (0, common_1.Controller)('supabase'),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SupabaseController);
//# sourceMappingURL=supabase.controller.js.map