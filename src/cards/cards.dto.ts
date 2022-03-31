import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsUUID, Length } from 'class-validator';

export class CreateorUpdateCardDto {
    @ApiProperty()
    @IsString()
    @Length(0, 254)
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    columnId: string;
}

export class GetResponseCardDto {
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

    @ApiProperty()
    @IsString()
    description: string;

    constructor(data: GetResponseCardDto) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.description = data.description;
      }
}