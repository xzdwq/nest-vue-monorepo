import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PublicEndpoint = (): CustomDecorator<string> => SetMetadata('isPublic', true);
