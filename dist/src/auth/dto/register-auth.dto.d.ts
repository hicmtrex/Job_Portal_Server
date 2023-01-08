import { LoginAuthDto } from './login-auth.dto';
declare const RegisterAuthDto_base: import("@nestjs/mapped-types").MappedType<Partial<LoginAuthDto>>;
export declare class RegisterAuthDto extends RegisterAuthDto_base {
    firstName: string;
    lastName: string;
    image: string;
    phone: string;
    address: string;
}
export {};
