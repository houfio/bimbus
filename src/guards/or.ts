export function or(...fns: (() => void)[]) {
  let first: Error | undefined;

  for (const fn of fns) {
    try {
      fn();

      return;
    } catch (e) {
      if (!first) {
        first = e;
      }
    }
  }

  throw first;
}
