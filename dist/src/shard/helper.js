"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFile = void 0;
const path_1 = require("path");
const util_1 = require("util");
const fs_1 = require("fs");
const unlinkAsync = (0, util_1.promisify)(fs_1.unlink);
class HelperFile {
    static customFilename(req, file, cb) {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        const nameFile = cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        return nameFile;
    }
    static imageFileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
    static async removeFile(file) {
        try {
            await unlinkAsync(file);
        }
        catch (err) {
            throw new Error('Arquivo não encontrado');
        }
        return true;
    }
}
exports.HelperFile = HelperFile;
//# sourceMappingURL=helper.js.map