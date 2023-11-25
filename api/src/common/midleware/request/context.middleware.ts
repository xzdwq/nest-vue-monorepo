import { RequestContext } from '@/common/midleware/request/context.model';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestContextMiddleware<Request = any, Response = any>
implements NestMiddleware<Request, Response> {
  use(req: any, res: Response, next: () => void): void {
    RequestContext.cls.run(new RequestContext(req, res), next);
  }
}
