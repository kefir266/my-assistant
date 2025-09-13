import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../models/User';

export const UserRequest = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
