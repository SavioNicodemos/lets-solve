export const chooseIfNewOrUsedIsBooleanOrNull = (
  isEnabled: boolean,
  type: 'new' | 'used',
  isNewValue: boolean | null,
): boolean | null => {
  if (type === 'new') {
    if (isEnabled && isNewValue === null) {
      return true;
    }
    if (isEnabled && isNewValue === false) {
      return null;
    }
    if (!isEnabled && isNewValue === null) {
      return false;
    }
    return null;
  }
  if (type === 'used') {
    if (isEnabled && isNewValue === null) {
      return false;
    }
    if (isEnabled && isNewValue === true) {
      return null;
    }
    if (!isEnabled && isNewValue === null) {
      return true;
    }
    return null;
  }
  return null;
};
