import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.engine('hbs', hbs({ extname: 'hbs' }));
  app.setViewEngine('hbs');
  // defaultLayout: 'Name of the layout file',
  // layoutsDir: join(__dirname, '..', 'views/layouts'),
  await app.listen(8000);
}
bootstrap();
