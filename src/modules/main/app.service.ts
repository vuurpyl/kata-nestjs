import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  root(): string {
    return this.config.get<string>('APP_URL');
  }
}
