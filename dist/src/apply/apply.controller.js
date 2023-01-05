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
exports.ApplyController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const apply_service_1 = require("./apply.service");
const create_apply_dto_1 = require("./dto/create-apply.dto");
const update_apply_dto_1 = require("./dto/update-apply.dto");
const helper_1 = require("../shard/helper");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = '.' + file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
const resumeFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(doc|pdf)$/)) {
        return callback(new Error('Only pfe or doc files are allowed!'), false);
    }
    callback(null, true);
};
let ApplyController = class ApplyController {
    constructor(applyService) {
        this.applyService = applyService;
    }
    create(createApplyDto, req, res, file) {
        return this.applyService.create(req, res, file, createApplyDto);
    }
    findAll(page, req, res) {
        return this.applyService.findAll(page, req, res);
    }
    findUserApplies(req, res, page) {
        return this.applyService.findUserApplies(req, res, page);
    }
    findOne(id) {
        return this.applyService.findOne(id);
    }
    update(id, updateApplyDto) {
        return this.applyService.update(id, updateApplyDto);
    }
    remove(id) {
        return this.applyService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/resumes',
            filename: helper_1.HelperFile.customFilename,
        }),
        fileFilter: resumeFileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apply_dto_1.CreateApplyDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "findUserApplies", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_apply_dto_1.UpdateApplyDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "remove", null);
ApplyController = __decorate([
    (0, common_1.Controller)('apply'),
    __metadata("design:paramtypes", [apply_service_1.ApplyService])
], ApplyController);
exports.ApplyController = ApplyController;
//# sourceMappingURL=apply.controller.js.map