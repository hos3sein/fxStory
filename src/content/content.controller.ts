import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
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
        console.log(files)
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
    console.log('body1111' , body)
    return this.messagingService.makePost(req , res , leaderId , body)
  }
  
  
  @Get('allRooms')
  getRooms(@Req() req , @Res() res ){
    return this.messagingService.getUserLeaders(req , res)
  }


  @Post('update/:contentId')
  update(@Req() req , @Res() res , @Param('contentId') contentId : string , @Body() body:Request){
    return this.contentService.updater(req , res , contentId , body)
  }
  
  @Delete('delete/:contentId')
  delete(@Req() req , @Res() res , @Param('contentId') contentId : string){
    return this.contentService.deleter(req , res , contentId)
  }


  @Get('getRoom/:leaderId')
  room(@Req() req , @Res() res , @Param('leaderId') leaderId : string , @Query() params: any ){
    return this.contentService.getRoom(req , res , leaderId , params)
  }
  

}
