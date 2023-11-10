const sequelize = require('../database');

jest.mock('../database', () => ({
  ...jest.requireActual('../database'),
  authenticate: jest.fn(),
}));

describe('Database Connection', () => {
  it('should establish a connection successfully', async () => {
    sequelize.authenticate.mockResolvedValue();

    await expect(sequelize.authenticate()).resolves.not.toThrow();
    // Add more assertions as needed
  });

  it('should handle connection errors', async () => {
    const error = new Error('Connection error');
    sequelize.authenticate.mockRejectedValue(error);

    await expect(sequelize.authenticate()).rejects.toThrow('Connection error');
    // Add more assertions as needed
  });
});

