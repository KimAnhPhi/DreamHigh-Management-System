import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;

    // Only log modifying actions (POST, PATCH, DELETE)
    const monitoredMethods = ['POST', 'PATCH', 'DELETE'];
    if (!monitoredMethods.includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (response) => {
        // If the request failed (threw error before this), it won't reach here 
        // because of how tap works with stream. 
        // We only log successful modifications (2xx).
        
        try {
          const resource = url.split('/')[2] || 'unknown'; // assuming /api/resource/...
          const actionMap = {
            POST: 'CREATE',
            PATCH: 'UPDATE',
            DELETE: 'DELETE',
          };

          // Basic Payload Filtering logic (Story 1.4 requirement)
          // We exclude sensitive fields like password
          const { password, passwordHash, oldPassword, newPassword, token, secret, access_token, refresh_token, ...safeBody } = body;
          
          let recordId = null;
          if (method === 'PATCH' || method === 'DELETE') {
             // Try to extract ID from params /api/resource/:id
             const parts = url.split('/');
             recordId = parts[3] ? parts[3] : null;
          } else if (response && response.data && response.data.id) {
             recordId = response.data.id.toString();
          }

          await this.prisma.auditLog.create({
            data: {
              userId: user?.userId || null,
              action: actionMap[method] || method,
              resource: resource.toUpperCase(),
              recordId: recordId,
              ipAddress: ip || request.headers['x-forwarded-for'] || '127.0.0.1',
              details: {
                payload: safeBody,
                timestamp: new Date().toISOString(),
              },
            },
          });
        } catch (error) {
          console.error('Audit Log Error:', error);
          // Don't throw error to user if logging fails
        }
      }),
    );
  }
}
