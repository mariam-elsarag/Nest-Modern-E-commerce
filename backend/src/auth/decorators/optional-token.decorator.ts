import { SetMetadata } from '@nestjs/common';
import { IS_TOKEN_REQUIRED_KEY } from 'src/common/utils/const';

export const OptionalToken = () => SetMetadata(IS_TOKEN_REQUIRED_KEY, false);
