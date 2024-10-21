import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { ContentModule } from 'src/content/content.module';
import { ContentController } from 'src/content/content.controller';
import { ContentService } from 'src/content/content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { contentSchema } from 'src/content/entities/content.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }) ,  MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING) , MongooseModule.forFeature([{ name: 'community', schema: contentSchema }]) ],
  controllers: [MessagingController , ContentController],
  providers: [MessagingService , ContentController , ContentService],
})
export class MessagingModule {}
