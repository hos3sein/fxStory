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
    console.log(leaderId)
    const allContent = await this.contentModel.find({'leader.userId' : leaderId}).sort({'createdAt' : -1}).limit(parseInt(params.page)*5)
    const allContent2 = await this.contentModel.find({'leader.userId' : leaderId}).sort({'createdAt' : -1})
    console.log('content>>>>>>>>' , allContent2)
    return new Respons(req , res , 200 , 'get rooms content' , '' , allContent.reverse())
  }
  
  
  async uploadStory(req , res , postFiles){
    console.log(postFiles)
    const path = []
    for (let i = 0 ; i<postFiles.length ; i ++){
      path.push(`https://cdn.spider-cryptobot.site/post/${postFiles[i].filename}`)
    }
    return new Respons(req , res , 200 , 'upload posts' , '' , {pathes : path})
  }




  async updater(req , res , contentId , body){
    await this.contentModel.findByIdAndUpdate(contentId , body)
    const updated = await this.contentModel.findById(contentId)
    return new Respons(req , res , 200 , 'update posts' , '' , {updatedPost : updated})
  }

  async deleter(req , res , contentId){
    await this.contentModel.findByIdAndDelete(contentId)
    return new Respons(req , res , 200 , 'deleted posts' , '' , 'post deleted successfull')
  }


  






}
