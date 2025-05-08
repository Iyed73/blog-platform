import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { validationSchema } from '../assets/validation.schema';
import appConfig from '../assets/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppConfig from '../assets/app.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlogPostsModule } from '@blog-platform/blog-posts';

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
        synchronize: config.database.synchronize
      }),
      inject: [AppConfig.KEY]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    BlogPostsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
