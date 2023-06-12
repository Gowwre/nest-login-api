import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity({
  name: 'user',
})
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  userId: number;

  @Field()
  @Column({
    type: 'varchar',
    length: '50',
    unique: true,
    name: 'username',
    nullable: false,
  })
  username: string;

  @Field()
  @Column({
    unique: true,
    type: 'varchar',
    length: '50',
    name: 'email',
    nullable: false,
  })
  email: string;

  @Field()
  @Column({
    type: 'varchar',
    length: '50',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Field({ nullable: true })
  @Column({
    name: 'createdAt',
    type: 'date',
    nullable: false,
  })
  createdAt: Date;
}
