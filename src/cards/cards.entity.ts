import { 
    Column as Col, 
    Entity, 
    JoinTable, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.entity";
import { Comment } from "src/comments/comments.entity";
import { Column } from "src/columns/columns.entity";

@Entity({name: 'cards'})
export class Card {
  @ApiProperty({example: '2c68142a-b007-11ec-b909-0242ac120002'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({example: 'Build an app', description: 'Title of the card.'})
  @Col({unique: true, nullable: false})
  title: string;

  @ApiProperty({example: 'First step: initialize a project.', description: 'Text of the card'})
  @Col({type: 'text', nullable: false})
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.cards, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'userId' })
  user: User;

  @Col('uuid')
  userId: string;

  @ManyToOne(() => Column, (column) => column.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId', referencedColumnName: 'id' })
  column: Column;

  @Col('uuid')
  columnId: string;

  @OneToMany(() => Comment, comment => comment.card, { onDelete: 'CASCADE' })
  comments: Comment[];
}
