import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MessagingModule } from 'src/messaging/messaging.module';
import { MessagingController } from 'src/messaging/messaging.controller';
import { MessagingService } from 'src/messaging/messaging.service';
import { MongooseModule } from '@nestjs/mongoose';
import { contentSchema } from './entities/content.entity';
import { ConfigModule } from '@nestjs/config';
import { auth } from 'src/middleware/middleware.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { UserSchema } from 'src/messaging/entities/user.entity';
import { ConnectionService } from 'src/connection/connection.service';


@Module({
  imports: [CacheModule.register() ,ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING), MongooseModule.forFeature([{ name: 'community', schema: contentSchema },{ name: 'user', schema: UserSchema }])],
  controllers: [ContentController, MessagingController],
  providers: [ContentService, MessagingController, MessagingService , ConnectionService],
})

export class ContentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(auth).forRoutes({ path: 'content/newPost/:leaderId', method: RequestMethod.POST },
        { path: 'content/allRooms', method: RequestMethod.GET },
        { path: 'content/getRoom/:leaderId', method: RequestMethod.GET },
        { path: 'content/uploadPost', method: RequestMethod.POST },
        { path: 'content/update/:contentId', method: RequestMethod.POST },
        { path: 'content/delete/:contentId', method: RequestMethod.DELETE },
      )
  }
}
