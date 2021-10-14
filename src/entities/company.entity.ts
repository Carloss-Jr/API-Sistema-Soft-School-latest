import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { EmployerEntity } from './employer.entity';

@Entity('tab_company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @Column({ default: true })
  provider: boolean;

  @OneToMany(type => EmployerEntity, company => CompanyEntity)
  employers: EmployerEntity[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAtt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAtt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  deleteAtt: Date;
}
