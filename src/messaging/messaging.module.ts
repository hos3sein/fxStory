import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { ContentModule } from 'src/content/content.module';
import { ContentController } from 'src/content/content.controller';
import { ContentService } from 'src/content/content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { contentSchema } from 'src/content/entities/content.entity';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserSchema } from './entities/user.entity';
import { ConnectionService } from 'src/connection/connection.service';


@Module({
  imports: [  CacheModule.register() , ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }) ,  MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING) , MongooseModule.forFeature([{ name: 'community', schema: contentSchema },{ name: 'user', schema: UserSchema }]) ],
  controllers: [MessagingController , ContentController],
  providers: [MessagingService , ContentController , ContentService , ConnectionService],
})
export class MessagingModule {}
