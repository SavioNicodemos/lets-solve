export function findDeletedObjects<T>(
  initialArray: T[],
  finalArray: T[],
  key: keyof T,
): T[] {
  return initialArray.filter(initialObject => {
    return !finalArray.some(finalObject => {
      return finalObject[key] === initialObject[key];
    });
  });
}
