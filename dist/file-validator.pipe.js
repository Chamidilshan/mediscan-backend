"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
exports.fileValidatorPipe = new common_1.ParseFilePipe({
    validators: [
        new common_1.MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
        new common_1.FileTypeValidator({ fileType: new RegExp('image/[jpeg|png]') }),
    ],
});
//# sourceMappingURL=file-validator.pipe.js.map