import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'string' ;
  }
  getNumber(): Array<Number> {
    return [1,2,3]
  }
}

