import { Toast } from 'native-base';
import { AppError } from '../AppError';
import { handleError } from '../handleError';

jest.mock('native-base', () => ({
  Toast: {
    show: jest.fn(),
  },
}));

describe('handleError', () => {
  beforeEach(() => {
    // clear the mock before each test
    (Toast.show as jest.Mock).mockClear();
  });

  it('should display a custom error message for AppError', () => {
    const error = new AppError('Custom error message');
    handleError(error);

    expect(Toast.show).toHaveBeenCalledWith({
      title: 'Custom error message',
      placement: 'top',
      bgColor: 'red.500',
    });
  });

  it('should display a generic error message for non-AppError', () => {
    const error = new Error('Some error');
    handleError(error);

    expect(Toast.show).toHaveBeenCalledWith({
      title: 'Não foi possível entrar. Tente novamente mais tarde.',
      placement: 'top',
      bgColor: 'red.500',
    });
  });
});
