export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    address?: string;
    phone?: string;
    role?: string;
    jobs?: string[];
    apply?: string[];
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface GenerateToken {
    user: IUser;
    secret: string;
    expiresIn: string;
}
