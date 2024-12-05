import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app/app.module';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
// Increase the timeout to 30 seconds for all the test suite
jest.setTimeout(30000);

// Load the CONTRACT_ADDRESS_TOKEN_ITEM_SELLER from the .env file
const CONTRACT_ADDRESS_TOKEN_ITEM_SELLER =
  process.env.CONTRACT_ADDRESS_TOKEN_ITEM_SELLER;

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

  it('Should load tokens to the seller for the initial token list (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/marketplace/initial-load-token-list')
      .expect(200);
  });

  it('Should list an item in the marketplace (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/marketplace/list')
      .send({
        tokenAddress: CONTRACT_ADDRESS_TOKEN_ITEM_SELLER,
        amount: 100,
        price: 3,
      })
      .expect(201);
  });

  it('Should get all items in the marketplace (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/marketplace/items')
      .expect(200)
      .expect([]);
  });
});
