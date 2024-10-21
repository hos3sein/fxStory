import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { MessagingService } from 'src/messaging/messaging.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService : ContentService ,private readonly messagingService : MessagingService) {}


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
  


  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
