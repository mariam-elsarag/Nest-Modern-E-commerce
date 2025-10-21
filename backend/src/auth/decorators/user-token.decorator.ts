import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TOKEN } from 'src/common/utils/const';

export const userToken = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (req[TOKEN]) {
      return req[TOKEN];
    }
    return false;
  },
);
