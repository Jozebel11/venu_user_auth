const request = require('supertest');
const app = require('../../app'); // Import your Express app

describe('GET /auth/facebook', () => {
  it('redirects to Facebook', async () => {
    const res = await request(app).get('/auth/facebook');
    expect(res.status).toBe(302); // 302 is a redirection status code
    expect(res.headers.location).toContain('facebook.com'); // Check if it redirects to Facebook
  });
});

describe('GET /logout', () => {
    it('logs out the user and redirects', async () => {
      const res = await request(app).get('/logout');
      expect(res.status).toBe(302); // Assuming it redirects after logout
      expect(res.headers.location).toBe('/'); // Redirects to home page
      // Further assertions to check if the cookie has been cleared can be added
    });
  });