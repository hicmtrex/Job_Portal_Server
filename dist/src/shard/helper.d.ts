/// <reference types="multer" />
import { Request } from 'express';
export declare class HelperFile {
    static customFilename(req: Request, file: Express.Multer.File, cb: any): any;
    static imageFileFilter(req: any, file: any, callback: any): any;
    static removeFile(file: string): Promise<boolean>;
}
