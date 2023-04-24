import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    // 日志可以使用pino或者winston,更推荐pino(性能更好)
    // 记录请求进入路由日志
    console.log(`Http Request Path:${req.path}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        // 记录请求相应时间
        console.log(`Request done. Path:${req.path} ... ${Date.now() - now}ms`),
      ),
    );
  }
}
