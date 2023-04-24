import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // 用户k8s健康检查
  @Get('health')
  health(): string {
    return 'ok';
  }
}
