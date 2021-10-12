import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity('tab_company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @Column({ default: true })
  provider: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAtt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAtt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  deleteAtt: Date;
}
