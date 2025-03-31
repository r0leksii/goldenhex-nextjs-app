export const parseNumericParam = (
  param: string | number | undefined | null,
  defaultValue: number
): number => {
  if (param === undefined || param === null || String(param).trim() === "") {
    return defaultValue;
  }
  const parsedValue = parseInt(String(param), 10);
  return !isNaN(parsedValue) ? parsedValue : defaultValue;
};
