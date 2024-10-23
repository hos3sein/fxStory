import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { communityInterface } from './entities/content.entity';
import { Respons } from 'src/respons/respons';

@Injectable()
export class ContentService {

  constructor(@InjectModel('community') private contentModel : Model<communityInterface>){}

  async getRoom(req , res , leaderId : string , params){
    console.log(params.page)

    const allContent = await this.contentModel.find({'leader.userId' : leaderId}).sort({'createdAt' : -1}).limit(parseInt(params.page)*10)
    return new Respons(req , res , 200 , 'get rooms content' , '' , allContent)
  }
  
  
  async uploadStory(req , res , postFiles){
    console.log(postFiles)
    const path = []
    for (let i = 0 ; i<postFiles.length ; i ++){
      path.push(`https://cdn.spider-cryptobot.site/post/${postFiles[i].filename}`)
    }
    return new Respons(req , res , 200 , 'upload posts' , '' , {pathes : path})
  }
}
