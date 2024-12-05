import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app/app.module';
// Increase the timeout to 30 seconds for all the test suite
jest.setTimeout(30000);
describe('Marketplace API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should show a welcome message (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/marketplace')
      .expect(200)
      .expect('Welcome to the marketplace!');
  });

  it('Should load the initial token list (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/marketplace/initial-load-token-list')
      .expect(200);
  });
});
