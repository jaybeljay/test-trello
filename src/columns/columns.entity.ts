import { 
  Column as Col, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany
 } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.entity";
import { Card } from "src/cards/cards.entity";

@Entity({name: 'columns'})
export class Column {
  @ApiProperty({example: '2c68142a-b007-11ec-b909-0242ac120002'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({example: 'Ideas', description: 'Title of the column'})
  @Col({unique: true, nullable: false})
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId'})
  user: User;

  @Col('uuid')
  userId: string;

  @OneToMany(() => Card, card => card.column, { onDelete: 'CASCADE' })
  cards: Card[];
}
