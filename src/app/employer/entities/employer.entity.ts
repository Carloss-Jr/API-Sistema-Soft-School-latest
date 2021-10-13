import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity('tab_employers')
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @Column({ default: true })
  provider: boolean;

  @ManyToOne(type => CompanyEntity, employers => Employer)
  company: CompanyEntity

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAtt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAtt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  deleteAtt: Date;
}

