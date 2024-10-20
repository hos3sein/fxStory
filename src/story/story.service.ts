import { Inject, Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { storyInterface } from './entities/story.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Respons } from 'src/respons/respons';

@Injectable()
export class StoryService {

  constructor(@InjectModel('story') private storyModel: Model<storyInterface>) { }



  async uploadStory(req, res, fileName: string) {
    const user = req.user
    await this.storyModel.create({
      user: {
        username: req.user.username,
        userId: req.user._id,
        profile: req.user.profile
      },
      url: `https://cdn.spider-cryptobot.site/story/${fileName}`,
      type: 'picture',
    })

    const stories = await this.storyModel.find({ $and: [{ activeStory: true }, { 'user.userId': req.user._id }] })
    console.log(stories)
    return new Respons(req, res, 200, 'upload story', null , { stories: stories })

  }


  
  async likeStory(req, res, storyId: string) {
    const user = req.user._id;
    await this.storyModel.findByIdAndUpdate(storyId, { $push : { likes : user } })
    // const seenSignals = await this.storyModel.find({ $and: [{ activeStory : true }, { seenStory : { $in: user } }] })
    // const unSeen = await this.storyModel.find({ $and: [{ activeStory : true }, { seenStory : { $ne: user } }] })
    return new Respons(req , res , 200 , 'put stories seen by user' , null , '')
  }



  async makeSeen(req, res, storyId: string) {
    const user = req.user._id;
    await this.storyModel.findByIdAndUpdate(storyId, { $push: { seenStory: user } })
    // const seenSignals = await this.storyModel.find({ $and: [{ activeStory: true }, { seenStory: { $in: user } }] })
    // const unSeen = await this.storyModel.find({ $and: [{ activeStory: true }, { seenStory: { $ne: user } }] })
    return new Respons(req, res, 200, 'put stories seen by user', null, '' )
  }



  async getAllStories(req, res) {
    const user = req.user._id;
    const userName = req.user.username;
    const seen = await this.storyModel.find({ $and: [{ activeStory: true } , { seenStory: { $in : user } }, {'user.userId' : {$ne : user}}] })
    const unSeen = await this.storyModel.find({ $and: [{ activeStory : true } , { seenStory: { $ne: user } } , {'user.userId' : {$ne : user}}] })
    const self = await this.storyModel.find({$and:[{ activeStory : true } , {'user.userId' :  user}]})
    const unSeenStory = {}
    const SeenStory = {}
    seen.forEach(elem=>{
      if (!SeenStory[elem.user.username]){
        SeenStory[elem.user.username] = []
      }
    })
    console.log(SeenStory)
    seen.forEach(elem => {
      SeenStory[elem.user.username].push(elem)
    })
    unSeen.forEach(elem=>{
      if (!unSeenStory[elem.user.username]){
        unSeenStory[elem.user.username] = [] 
      }
    })
    console.log(unSeenStory)
    unSeen.forEach(elem => {
      unSeenStory[elem.user.username].push(elem)
    })
    return new Respons(req, res, 200, 'get all stories', null, { seen : SeenStory , unSeen : unSeenStory , self : self })
  }

  async getStories(req , res , leaderId : string){
    // const user = req.user._id;
    const stories = await this.storyModel.find({ $and : [{ activeStory : true }, { 'user.userId' : leaderId }] })
    // const unSeen = await this.storyModel.find({ $and: [{ activeStory: true } , { seenStory : { $ne: user } }] })
    return new Respons(req, res, 200, 'get all stories', null, { stories : stories.reverse() })
  }



  async deleteStory(req, res , storyId) {
    const user = req.user._id;
    await this.storyModel.findByIdAndUpdate(storyId , {deleted : true})
    const stories = await this.storyModel.find({ $and: [{ active: true }, { 'user.userId': req.user._id }] })
    return new Respons(req, res, 200, 'delete story', null, {stories : stories})
  }


}
