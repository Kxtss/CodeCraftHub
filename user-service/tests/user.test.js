const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables for tests

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await User.deleteMany({}); // Limpia la base de datos después de las pruebas
    await mongoose.connection.close();
});

describe("User Service", () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should login an existing user', async () => {
        // First, register the user to ensure it exists for login test
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser2',
                email: 'test2@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test2@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should get user profile with a valid token', async () => {
        // Register and login a user to get a token
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'profileuser',
                email: 'profile@example.com',
                password: 'password123',
            });

        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'profile@example.com',
                password: 'password123',
            });

        const token = loginResponse.body.token;

        const profileResponse = await request(app)
            .get('/api/users/profile')
            .set('x-auth-token', token); // Set the token in the header

        expect(profileResponse.statusCode).toBe(200);
        expect(profileResponse.body.email).toBe('profile@example.com');
        expect(profileResponse.body.password).toBeUndefined(); // Password should be excluded
    });

    it('should not get user profile without a token', async () => {
        const response = await request(app)
            .get('/api/users/profile');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('No token, authorization denied');
    });

    it('should not get user profile with an invalid token', async () => {
        const response = await request(app)
            .get('/api/users/profile')
            .set('x-auth-token', 'invalidtoken');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Token is not valid');
    });
});