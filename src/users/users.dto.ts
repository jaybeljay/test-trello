export class CreateUserDto {
    readonly email: string;
    password: string;
}

export class UpdateUserDto {
    password: string;
}