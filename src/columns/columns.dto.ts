import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateorUpdateColumnDto {
    @ApiProperty()
    @IsString()
    @Length(0, 254)
    title: string;
}

export class GetResponseColumnDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsString()
    title: string;

    constructor(data: GetResponseColumnDto) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
      }
}