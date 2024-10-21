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

  async getRoom(req , res , leaderId : string){
    const allContent = await this.contentModel.find({'leader.userId' : leaderId})
    return new Respons(req , res , 200 , 'get rooms content' , '' , allContent)
  }


  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }


  findAll() {
    return `This action returns all content`;
  }


  findOne(id: number) {
    return `This action returns a #${id} content`;
  }


  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  
  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
