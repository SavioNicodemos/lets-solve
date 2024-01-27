import { findDeletedObjects } from '../arrayHelper';

describe('findDeletedObjects', () => {
  it('should return an array of objects deleted from the initial array', () => {
    const initialArray = [
      { id: 1, name: 'Object 1' },
      { id: 2, name: 'Object 2' },
      { id: 3, name: 'Object 3' },
    ];
    const finalArray = [
      { id: 1, name: 'Object 1' },
      { id: 3, name: 'Object 3' },
    ];
    const key = 'id';
    const expected = [{ id: 2, name: 'Object 2' }];

    const result = findDeletedObjects(initialArray, finalArray, key);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if no objects were deleted', () => {
    const initialArray = [
      { id: 1, name: 'Object 1' },
      { id: 2, name: 'Object 2' },
    ];
    const finalArray = [
      { id: 1, name: 'Object 1' },
      { id: 2, name: 'Object 2' },
    ];
    const key = 'id';
    const expected: any[] = [];

    const result = findDeletedObjects(initialArray, finalArray, key);

    expect(result).toEqual(expected);
  });

  it('should return the whole initial array if the final array is empty', () => {
    const initialArray = [
      { id: 1, name: 'Object 1' },
      { id: 2, name: 'Object 2' },
      { id: 3, name: 'Object 3' },
    ];
    const finalArray: any[] = [];
    const key = 'id';
    const expected = initialArray;

    const result = findDeletedObjects(initialArray, finalArray, key);

    expect(result).toEqual(expected);
  });
});
