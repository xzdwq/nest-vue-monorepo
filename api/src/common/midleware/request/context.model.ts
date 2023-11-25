import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext<TRequest = any, TResponse = any> {
  constructor(public readonly req: TRequest, public readonly res: TResponse) {}

  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext(): RequestContext<any, any> {
    return this.cls.getStore();
  }
}
