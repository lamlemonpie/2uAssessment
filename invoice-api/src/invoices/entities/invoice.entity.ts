import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_number: string;

  @Column()
  total: string;

  @Column()
  currency: string;

  @Column()
  invoice_date: string;

  @Column()
  due_date: string;

  @Column()
  vendor_name: string;

  @Column()
  remittance_address: string;

  @Column({ default: 'pending' })
  status: string;
}
