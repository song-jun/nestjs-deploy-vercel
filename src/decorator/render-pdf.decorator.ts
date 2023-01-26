import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';
import { create as generatePDF } from 'html-pdf';
import { Application, Request } from 'express';


type NodeCallback<T> = (err: Error, val: T) => void;
type PromisifyCallback<T> = (cb: NodeCallback<T>) => void

const promise = <T>(cb: PromisifyCallback<T>) => {
    return new Promise<T>((res, rej) => cb((err, val) => err ? rej(err) : res(val) ));
  }
  
  
  export interface PDFRenderOptions {
    templateFilename: string;
    attachmentFilename: string;
    locals?: Record<string, any>;
  }
  
  @Injectable()
  class RenderPDFInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
      const { app } = ctx.switchToHttp().getRequest() as Request;
      return next.handle().pipe(mergeMap((opts: PDFRenderOptions) => this.generatePDFAttachment(app, opts)));
    }
  
    private async generatePDFAttachment(app: Application, options: PDFRenderOptions) {
      const html = await promise<string>((cb) => app.render(options.templateFilename, options.locals, cb));
      const pdf = await promise<Buffer>((cb) => generatePDF(html).toBuffer(cb));
      return new StreamableFile(pdf, { disposition: `attachment; filename="${options.attachmentFilename}"` })
    }
  }
  
  
  export const RenderPDF = () => {
    return UseInterceptors(RenderPDFInterceptor);
  }