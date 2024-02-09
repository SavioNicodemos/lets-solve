import { chooseIfNewOrUsedIsBooleanOrNull } from '@/utils/helpers/conditions';

describe('chooseIfNewOrUsedIsBooleanOrNull', () => {
  it.each<
    [
      isEnabled: boolean,
      type: 'new' | 'used',
      isNewValue: boolean | null,
      expected: boolean | null,
    ]
  >([
    [true, 'new', null, true],
    [true, 'new', false, null],
    [false, 'new', null, false],
    [false, 'new', true, null],
    [true, 'used', null, false],
    [true, 'used', true, null],
    [false, 'used', null, true],
    [false, 'used', false, null],
    [true, 'unknown' as 'new', true, null],
  ])(
    'should return the correct value when isEnabled is %s, type is %s, and isNewValue is %s',
    (isEnabled, type, isNewValue, expected) => {
      const result = chooseIfNewOrUsedIsBooleanOrNull(
        isEnabled,
        type,
        isNewValue,
      );
      expect(result).toEqual(expected);
    },
  );
});
