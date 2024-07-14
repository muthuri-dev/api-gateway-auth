import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SharedprismaService } from '@app/sharedprisma';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      introspection: true,
      sortSchema: true,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/susers-chema.gql'),
      },
    }),
  ],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    SharedprismaService,
    UsersResolver,
  ],
})
export class UsersModule {}
