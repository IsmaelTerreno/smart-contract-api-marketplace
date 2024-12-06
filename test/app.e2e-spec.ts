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

  it('Should list an item in the marketplace (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/marketplace/list')
      .send({
        tokenAddress: CONTRACT_ADDRESS_TOKEN_ITEM_SELLER,
        amount: 2,
        price: 3,
      })
      .expect(201);
  });

  it('Should get all items in the marketplace (GET)', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/marketplace/list')
      .send({
        tokenAddress: CONTRACT_ADDRESS_TOKEN_ITEM_SELLER,
        amount: 4,
        price: 3,
      })
      .expect(201);
    const result = await request(app.getHttpServer())
      .get('/api/v1/marketplace/items')
      .expect(200);
    expect(result.body.data).toBeInstanceOf(Array);
    expect(result.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('Should purchase an item in the marketplace (POST)', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/marketplace/list')
      .send({
        tokenAddress: CONTRACT_ADDRESS_TOKEN_ITEM_SELLER,
        amount: 1,
        price: 1,
      })
      .expect(201);
    const result = await request(app.getHttpServer()).get(
      '/api/v1/marketplace/items',
    );
    const foundItem = result.body.data.find((item) => item.amount > 0);
    return await request(app.getHttpServer())
      .post('/api/v1/marketplace/purchase')
      .send({
        listingId: foundItem.listingId,
        amount: foundItem.amount,
        price: Number(foundItem.price),
      })
      .expect(201);
  });

  it('Should withdraw seller earnings (POST)', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/marketplace/list')
      .send({
        tokenAddress: CONTRACT_ADDRESS_TOKEN_ITEM_SELLER,
        amount: 4,
        price: 3,
      })
      .expect(201);
    request(app.getHttpServer())
      .post('/api/v1/marketplace/purchase')
      .send({
        tokenId: 1,
        amount: 1,
      })
      .expect(201);
    return await request(app.getHttpServer())
      .post('/api/v1/marketplace/withdraw')
      .expect(201);
  });
});
