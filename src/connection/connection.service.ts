import { Injectable } from '@nestjs/common';


export interface responseInterface {
    success: boolean,
    scope: string,
    data: {} | null | string,
    error: {} | null | string
}



@Injectable()
export class ConnectionService {


    async getData(): Promise<{}> {
        const rawResponse = await fetch('https://localhost:4001/user/getUser', { method: 'GET' })
        const response = await rawResponse.json()
        return response
    }
    async getUser(leaderId: string): Promise<{}> {
        const rawResponse = await fetch(`${process.env.USERSERVICE}/user/getUser/${leaderId}`, { method: 'GET' })
        const response : responseInterface = await rawResponse.json()
        return response.data
    }

    async getUsersLeaders(userId : string) : Promise<{}>{
        const resault = await fetch(`${process.env.USERSERVICE}/user/getUsersLeader/${userId}`, { method: 'GET' })
        const response : responseInterface = await resault.json()
        return response.data
    }


}
