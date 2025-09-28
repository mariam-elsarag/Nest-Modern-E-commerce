import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURETNT_USER_KEY } from 'src/common/utils/const';
import { JwtPayload } from 'src/common/utils/types';

export const currentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (req[CURETNT_USER_KEY]) {
      const user: JwtPayload = req[CURETNT_USER_KEY];
      return user;
    }
    return true;
  },
);
