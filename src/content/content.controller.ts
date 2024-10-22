import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { MessagingService } from 'src/messaging/messaging.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer'


@Controller('content')
export class ContentController {
  constructor(private readonly contentService : ContentService ,private readonly messagingService : MessagingService) {}



  @Post('uploadPost')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'postFiles' , maxCount : 5 }] 
    , {
    storage: diskStorage({
      destination: '/home/uploadedFiles/post'
      , filename: (req, files, cb) => {
        // console.log(files)
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(files.originalname)}`)
      }
  })}))
  upload(@Req() req , @Res() res ,  @UploadedFiles(
  ) postFile){
    return this.contentService.uploadStory(req, res, postFile.postFiles)
  }



  @Post('newPost/:leaderId')
  make(@Body() body : Request ,@Req() req , @Res() res , @Param('leaderId') leaderId : string){
    return this.messagingService.makePost(req , res , leaderId , body)
  }
  
  
  @Get('allRooms')
  getRooms(@Req() req , @Res() res ){
    return this.messagingService.getUserLeaders(req , res)
  }


  @Get('getRoom/:leaderId')
  room(@Req() req , @Res() res , @Param('leaderId') leaderId : string ){
    return this.contentService.getRoom(req , res , leaderId)
  }
  

}
