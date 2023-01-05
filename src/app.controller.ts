import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {
    //
  }

  @Get()
  root(@Res() res: Response) {
    return 'hello';
  }
}
