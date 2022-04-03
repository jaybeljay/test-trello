import { 
    Column, 
    Entity, 
    JoinTable, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.entity";
import { Card } from "src/cards/cards.entity";

@Entity({name: 'comments'})
export class Comment {
  @ApiProperty({example: '2c68142a-b007-11ec-b909-0242ac120002'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({example: 'Some comment', description: 'Comment under the card'})
  @Column({type: 'text'})
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'userId' })
  user: User;

  @Column('uuid')
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Card, card => card.comments, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'cardId' })
  card: Card;

  @Column('uuid')
  cardId: string;
}