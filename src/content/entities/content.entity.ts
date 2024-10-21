import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export interface communityInterface extends Document{
    user:{
        username : string,
        userId : string,
        profile : string,
    }
    content : {}
    leader : {
        username : string,
        userId : string,
        profile : string,
    }
    tags : []
}




@Schema({timestamps : true})
export class community{
    @Prop({type : {}})
    user:{
        username : string,
        userId : string,
        profile : string,
    }


    @Prop({type : Object , default : {}})
    content : {}


    @Prop({type : {}})
    leader : {
        username : string,
        userId : string,
        profile : string,
    }

    
    @Prop({type : [String]})
    tags : []

}

export const contentSchema = SchemaFactory.createForClass(community);

