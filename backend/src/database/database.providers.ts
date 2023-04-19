import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { Constants } from 'src/common/constants/constants';

export const databaseProviders = [
  {
    provide: Constants.DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('DATABASE_URI')),
  },
];
