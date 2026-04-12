import { Controller, Get } from '@nestjs/common';

/** Public liveness probe cho Render / load balancer (không JWT). */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
