import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('number')
  getNumber(): Array<Number> {
    return this.appService.getNumber();
  }

  @Get('number/:id')
  findOne(@Param() params:any): string {
    return `The Number is ${params.id}`
  }
}
