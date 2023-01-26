import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PDFRenderOptions, RenderPDF } from './decorator/render-pdf.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/file/:id')
  @Render('index.hbs')
  getFile() {
    return {
      message: 'A Cá Ngão'
    };
  }
}
