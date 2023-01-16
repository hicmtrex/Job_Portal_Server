import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ApplyModule } from './apply/apply.module';
import { AppController } from './app.controller';
import { RecruiterMiddleware } from './middlewares/recuiter.middleware';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JobsModule,
    PrismaModule,
    JwtModule,
    ApplyModule,
    ConfigModule.forRoot(),
  ],

  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      //Auth
      { path: 'jobs', method: RequestMethod.POST },
      { path: 'apply', method: RequestMethod.POST },
      { path: 'apply', method: RequestMethod.GET },
      { path: 'jobs/recruiter', method: RequestMethod.GET },
      { path: 'jobs/:id', method: RequestMethod.PATCH },
      { path: 'jobs/:id', method: RequestMethod.DELETE },
      { path: 'apply/user', method: RequestMethod.GET },
      { path: 'users/image/:id', method: RequestMethod.PUT },
      { path: 'users/:id', method: RequestMethod.GET },
      { path: 'users/:id', method: RequestMethod.PATCH },
      { path: 'users/:id', method: RequestMethod.DELETE },
    );
    //Recruiter
    consumer
      .apply(RecruiterMiddleware)
      .forRoutes(
        { path: 'apply', method: RequestMethod.GET },
        { path: 'jobs/:id', method: RequestMethod.DELETE },
        { path: 'jobs/:id', method: RequestMethod.PATCH },
      );
    //Admin
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
