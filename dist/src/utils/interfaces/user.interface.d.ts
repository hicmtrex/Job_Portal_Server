import { Request } from 'express';
import { IUser } from 'src/auth/dto/interfaces';
export interface RequestWithUser extends Request {
    user: IUser;
}
