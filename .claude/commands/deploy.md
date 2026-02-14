# Deployment Checklist: $ARGUMENTS

## Pre-deployment
- [ ] Tests ผ่านทั้งหมด
- [ ] Migration files reviewed
- [ ] Environment variables ครบ (ดู .env.example)
- [ ] No hardcoded secrets
- [ ] Docker image build สำเร็จ
- [ ] Health check endpoint ทำงาน

## Deployment Steps
1. Run database migrations
2. Deploy application
3. Verify health check
4. Run smoke tests
5. Monitor error rates (15 min)
6. Monitor response times (15 min)

## Rollback Plan
- ถ้า migration มี breaking change → ต้องมี rollback script
- ถ้า app error rate > 1% → rollback ทันที
- ถ้า p95 latency > 1s → investigate → rollback ถ้าจำเป็น
