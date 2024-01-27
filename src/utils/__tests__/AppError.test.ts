import { AppError } from '../AppError';

describe('AppError', () => {
  it('should correctly assign a message on instantiation', () => {
    const message = 'This is a test error';
    const error = new AppError(message);

    expect(error.message).toEqual(message);
  });
});
