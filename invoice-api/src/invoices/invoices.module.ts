import { Module } from '@nestjs/common';
import { InvoicesService } from './services/invoices.service';
import { InvoicesController } from './controller/invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesService, AppGateway],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
