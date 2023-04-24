import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let context: ExecutionContext;
  let next;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    next = { handle: jest.fn(() => of(null)) };
    context = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ path: '/test' })),
      })),
    } as unknown as ExecutionContext;
  });

  describe('intercept', () => {
    it('should log request info and response time', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await interceptor.intercept(context, next).toPromise();
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy.mock.calls[0][0]).toContain('Http Request Path:/test');
      expect(consoleSpy.mock.calls[1][0]).toContain(
        'Request done. Path:/test ...',
      );
      consoleSpy.mockRestore();
    });
  });
});
