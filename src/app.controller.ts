import { Controller, Get, Param, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  newEndoint() {
    return 'Yo soy nuevo'
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/'
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
