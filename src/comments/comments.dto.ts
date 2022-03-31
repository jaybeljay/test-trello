import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateorUpdateCommentDto {
    @ApiProperty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    cardId: string;
}

export class GetResponseCommentDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    cardId: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    constructor(data: GetResponseCommentDto) {
        this.id = data.id;
        this.text = data.userId;
        this.cardId = data.cardId;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
      }
}