import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Req, UploadedFile, Put } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}


  
  @Post('uploadStory')
  @UseInterceptors(FileInterceptor('storyFile', {
    storage: diskStorage({
      destination: '/home/uploadedFiles/story'
      , filename: (req, file, cb) => {
        console.log(file)
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload( @Req() req , @Res() res, @UploadedFile(
  ) storyFile) {
    // console.log()
    console.log(storyFile)
    console.log(req.user)
    return this.storyService.uploadStory(req, res, storyFile.filename)
    // return profile
  }



  @Put('seenStory/:storyId')
  seen(@Param('storyId') storyId : string , @Req() req , @Res() res) {
    return this.storyService.makeSeen(req , res , storyId);
  }

  @Get('getAllStories')
  getAll( @Req() req , @Res() res){
    return this.storyService.getAllStories(req , res)
  }
  
  @Get('getLeaderStories/:leaderId')
  getStories( @Req() req , @Res() res , @Param('leaderId') leaderId : string){
    return this.storyService.getStories(req , res , leaderId)
  }


  @Delete('deleteStory/:storyId')
  deleter( @Req() req , @Res() res , @Param('storyId') storyId : string){
    return this.storyService.deleteStory(req , res , storyId)
  }


  // @Get()
  // findAll() {
  //   return this.storyService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
  //   return this.storyService.update(+id, updateStoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storyService.remove(+id);
  // }
}
