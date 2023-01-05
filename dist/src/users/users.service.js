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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const fs_1 = require("fs");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async findAll() {
        const users = await this.prisma.user.findMany({});
        if (users) {
            return users;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { apply: true },
        });
        if (user) {
            return user;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async updateImage(id, res, file) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        const image = `images/${file.filename}`;
        if (image) {
            (0, fs_1.unlink)(`${process.cwd()}/uploads/${user.image}`, (err) => {
                if (err)
                    console.log(err);
            });
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { image },
        });
        if (updatedUser) {
            return res.json(updatedUser);
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        if (updatedUser) {
            return updatedUser;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async remove(id) {
        const deletedUser = await this.prisma.user.delete({ where: { id } });
        if (deletedUser) {
            return { message: 'User has been deleted!' };
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map