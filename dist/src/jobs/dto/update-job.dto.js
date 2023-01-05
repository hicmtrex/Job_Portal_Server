"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_dto_1 = require("./create-job.dto");
class UpdateJobDto extends (0, mapped_types_1.PartialType)(create_job_dto_1.CreateJobDto) {
}
exports.UpdateJobDto = UpdateJobDto;
//# sourceMappingURL=update-job.dto.js.map