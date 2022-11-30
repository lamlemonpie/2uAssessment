import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

import { InvoicesService } from '../services/invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get('/')
  findAllPending() {
    return this.invoicesService.findAllPending();
  }

  @Get('/all')
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateInvoiceDto) {
    return this.invoicesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateInvoiceDto) {
    console.log('Updated invoice');
    return this.invoicesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.invoicesService.delete(id);
  }
}
