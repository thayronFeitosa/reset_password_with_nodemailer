import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  registerDate: Date ;

  @Column()
  password: string;
}

export { User };
