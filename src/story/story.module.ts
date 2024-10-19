import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { storySchema } from './entities/story.entity';
import { auth } from 'src/middleware/middleware.middleware';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile }), CacheModule.register(), MulterModule.register({ dest: './uploads' }), ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }), MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
  MongooseModule.forFeature([{ name: 'story', schema: storySchema }]),
  ],
  controllers: [StoryController],
  providers: [StoryService],
})


export class StoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(auth).forRoutes({ path: 'story/uploadStory', method: RequestMethod.POST },
        { path: 'story/uploadStory', method: RequestMethod.POST },
        { path: 'story/seenStory/:storyId', method: RequestMethod.PUT },
        { path: 'story/getAllStories', method: RequestMethod.GET },
        { path: 'story/getLeaderStories/:leaderId', method: RequestMethod.GET },
        { path: 'story/deleteStory/:storyId', method: RequestMethod.DELETE },

      )
  }
}



