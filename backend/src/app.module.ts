import { Module } from '@nestjs/common';
import { TicketModule } from './common/modules/ticket.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TicketModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
