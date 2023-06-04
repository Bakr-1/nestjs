import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComputerModule } from './computer/computer.module';
import { CpuModule } from './cpu/cpu.module';
import { DiskModule } from './disk/disk.module';
import { PowerModule } from './power/power.module';
import { DiskService } from './disk/disk.service';

@Module({
  imports: [ComputerModule, CpuModule, DiskModule, PowerModule],
  controllers: [AppController],
  providers: [AppService, DiskService],
})
export class AppModule {}
