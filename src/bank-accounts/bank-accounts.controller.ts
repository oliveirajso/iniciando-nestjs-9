import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BankAccountService } from 'src/@core/domain/bank-account.service';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountsService: BankAccountsService,
    private bankAccountService: BankAccountService,
  ) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto.account_number);
  }

  @Get()
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }

  @HttpCode(204)
  @Post('transfer')
  transfer(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }

  @HttpCode(204)
  @Post('transfermanager')
  transferManager(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountsService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }

  @HttpCode(204)
  @Post('transferqr')
  transferQRunner(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountsService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountsService.remove(id);
  }
}
