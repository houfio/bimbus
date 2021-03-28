export function filter(key: string, value: any) {
  if (value === undefined) {
    return {};
  }

  return { [key]: value };
}
