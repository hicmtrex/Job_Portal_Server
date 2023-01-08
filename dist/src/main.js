"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: { origin: ['http://localhost:4200'], credentials: true },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use('/', express.static(process.cwd() + '\\uploads'));
    app.use(cookieParser());
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map