import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  process.on('unhandledRejection', (error) => {
      console.log('error occured . . .' , error)
  });

  process.on('uncaughtException' , (error)=>{
    console.log('error occured' , error )
  }) 

  process.on('unhandledException' , (error)=>{
    console.log('error occured . . .' , error)
  });
  
  await app.listen(4007);
}


bootstrap();
