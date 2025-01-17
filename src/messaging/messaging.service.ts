import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { ConfirmChannel } from 'amqplib';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { community, communityInterface } from 'src/content/entities/content.entity';
import { Respons } from 'src/respons/respons';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userInterFace } from './entities/user.entity';
import { ConnectionService } from 'src/connection/connection.service';


@Injectable()
export class MessagingService {
  private channelWrapper: ChannelWrapper;         // make the channel wrapper
  constructor(private readonly interService: ConnectionService, @Inject(CACHE_MANAGER) private cachemanager: Cache, @InjectModel('user') private userModel: Model<userInterFace>, @InjectModel('community') private contentModel: Model<communityInterface>) {
    const connection = amqp.connect(['amqp://localhost']);     // connect to rabbit
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////!
    //*its for assert the queues
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////!
    this.channelWrapper = connection.createChannel({             // crathe the channel
      setup: (channel: Channel) => {                                    // setup the channel
        channel.assertQueue('emailQueue', { durable: true });          // assert the queue
        channel.assertQueue('transAction', { durable: true });
        channel.assertQueue('getUserData', { durable: true });          // assert the queue for get  User data
        channel.assertQueue('responseForGetUserData', { durable: true });          // assert the queue for response the get user
        channel.assertQueue('createWallet', { durable: true });          // assert the queue for response the get user
        channel.assertQueue('responseForCreateWallet', { durable: true });          // assert the queue for response the get user
        channel.assertQueue('leaderWallet', { durable: true });
        channel.assertQueue('ResponseleaderWallet', { durable: true });
        channel.assertQueue('leadersignal', { durable: true });
        channel.assertQueue('Responseleadersignal', { durable: true });
        channel.assertQueue('Responseleadersignal', { durable: true });
        channel.assertQueue('Responseleadersignal', { durable: true });
        channel.assertQueue('Responseleadersignal', { durable: true });
        channel.assertQueue('getUserLeaders', { durable: true });
        channel.assertQueue('ResForGetUserLeaders', { durable: true });
      },
    });

  }


  async makePost(req, res, leaderId: string, body: { content: {} }) {
    try {
      const leader: any = await this.interService.getUser(leaderId)
      await this.contentModel.create({
        user: {
          userId: req.user._id,
          username: req.user.username,
          profile: req.user.profile
        },
        leader: {
          userId: leader._id.toString(),
          username: leader.username,
          profile: leader.profile
        },
        content: body.content,
      })
      return new Respons(req, res, 200, 'make new post', null, 'data created')
    } catch (error) {
      return new Respons(req, res, 500, 'make new post', `${error}`, '')
    }
  }



  async getUserLeaders(req, res) {
    const leaders = req.user._id;
    try {
      const rooms = await this.interService.getUsersLeaders(leaders)
      return new Respons(req, res, 200, 'get all rooms', null, rooms)
    } catch (error) {
      return new Respons(req, res, 500, 'make new post', `${error}`, '')
    }
  }


  //////////////! finish line
}



