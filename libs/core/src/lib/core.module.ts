import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import appConfig from './config/app.config';
import { validationSchema } from './config/validation.schema';
import AppConfig from './config/app.config';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig],
    validationSchema: validationSchema
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        autoLoadEntities: true,
        synchronize: config.database.synchronize,
        logging: ['query'],
      }),
      inject: [AppConfig.KEY]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        subscriptions: {
          'subscriptions-transport-ws': true,
          'graphql-ws': true
        },
        formatError: (error) => {
          const originalError = error.extensions?.['originalError'] as Error;
          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions?.['code'],
            };
          }
          return {
            message: originalError.message,
            code: error.extensions?.['code'],
          };
        },
      }),
    }),
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {
}
