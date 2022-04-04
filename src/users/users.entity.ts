import { 
  Column as Col, 
  Entity, OneToMany, 
  PrimaryGeneratedColumn,
  CreateDateColumn, 
  UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import crypto from 'crypto';
import { Column } from "src/columns/columns.entity";
import { Card } from "src/cards/cards.entity";
import { Comment } from "src/comments/comments.entity";

@Entity({name: 'users'})
export class User {
  @ApiProperty({example: '2c68142a-b007-11ec-b909-0242ac120002'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({example: 'user@gmail.com'})
  @Col({unique: true, nullable: false})
  email: string;

  @ApiProperty({example: '1234567890'})
  @Col({nullable: false})
  password: string;

  @OneToMany(() => Column, column => column.user, { onDelete: 'CASCADE' })
  columns: Column[];

  @OneToMany(() => Card, card => card.user, { onDelete: 'CASCADE' })
  cards: Card[];

  @OneToMany(() => Comment, comment => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
