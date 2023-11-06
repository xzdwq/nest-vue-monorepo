import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const DUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
