import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { CacheModule } from '@nestjs/cache-manager';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import {ConfigService , ConfigModule} from '@nestjs/config'
import { MongooseModule } from "@nestjs/mongoose";
import { MessagingModule } from './messaging/messaging.module';
import { StoryModule } from './story/story.module';
import { MessagingController } from './messaging/messaging.controller';
import { MessagingService } from './messaging/messaging.service';
import { StoryController } from './story/story.controller';
import { StoryService } from './story/story.service';
import { storySchema } from './story/entities/story.entity';

@Module({
  imports: [ NestjsFormDataModule.config({ storage: MemoryStoredFile }), CacheModule.register() , MulterModule.register({ dest: './uploads' })  , ConfigModule.forRoot({envFilePath: 'config.env',isGlobal : true}) , MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: 'story', schema: storySchema }]),
    MessagingModule,
    StoryModule,],
  controllers: [AppController , MessagingController , StoryController],
  providers: [AppService , MessagingController , MessagingService , StoryController , StoryService],
})
export class AppModule {}
