"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const jobs_module_1 = require("./jobs/jobs.module");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const apply_module_1 = require("./apply/apply.module");
const app_controller_1 = require("./app.controller");
const recuiter_middleware_1 = require("./middlewares/recuiter.middleware");
const admin_middleware_1 = require("./middlewares/admin.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({ path: 'jobs', method: common_1.RequestMethod.POST }, { path: 'apply', method: common_1.RequestMethod.POST }, { path: 'apply', method: common_1.RequestMethod.GET }, { path: 'jobs/recruiter', method: common_1.RequestMethod.GET }, { path: 'jobs/:id', method: common_1.RequestMethod.PATCH }, { path: 'jobs/:id', method: common_1.RequestMethod.DELETE }, { path: 'apply/user', method: common_1.RequestMethod.GET }, { path: 'users/image/:id', method: common_1.RequestMethod.PUT }, { path: 'users/:id', method: common_1.RequestMethod.GET }, { path: 'users/:id', method: common_1.RequestMethod.PATCH }, { path: 'users/:id', method: common_1.RequestMethod.DELETE });
        consumer
            .apply(recuiter_middleware_1.RecruiterMiddleware)
            .forRoutes({ path: 'apply', method: common_1.RequestMethod.GET }, { path: 'jobs/:id', method: common_1.RequestMethod.DELETE }, { path: 'jobs/:id', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(admin_middleware_1.AdminMiddleware)
            .forRoutes({ path: 'users/:id', method: common_1.RequestMethod.DELETE });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            jobs_module_1.JobsModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule,
            apply_module_1.ApplyModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map