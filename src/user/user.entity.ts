import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'varchar',
    length: '50',
    unique: true,
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: '50',
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'createdAt',
    type: 'date',
    nullable: false,
  })
  createdAt: Date;
}
