import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppGateway } from 'src/app.gateway';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoicesRepo: Repository<Invoice>,
    private appGateway: AppGateway,
  ) {}

  findAll() {
    return this.invoicesRepo.find();
  }

  findAllPending() {
    return this.invoicesRepo.find({
      where: { status: 'pending' },
      order: { id: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.invoicesRepo.find({ where: { id } });
  }

  async create(body: CreateInvoiceDto) {
    const newInvoice = this.invoicesRepo.create(body);
    const savedInvoice = await this.invoicesRepo.save(newInvoice);
    this.appGateway.server.emit('INVOICE_CREATED', savedInvoice);
    return {
      message: 'invoice submitted successfully',
    };
  }

  async update(id: number, body: UpdateInvoiceDto) {
    const invoice = await this.invoicesRepo.findOne({ where: { id } });

    this.invoicesRepo.merge(invoice, body);

    return this.invoicesRepo.save(invoice);
  }

  delete(id: number) {
    this.invoicesRepo.delete(id);

    return true;
  }
}
