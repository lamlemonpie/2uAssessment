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

import { SocketService } from 'src/socket/socket.service';
import { InvoicesService } from '../services/invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private invoicesService: InvoicesService,
    private socketService: SocketService,
  ) {}

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
    this.socketService.socket.emit('invoices_updated');

    return this.invoicesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateInvoiceDto) {
    // this.socketService.socket.emit('invoices_updated');
    console.log('Updated invoice');
    return this.invoicesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.invoicesService.delete(id);
  }
}
