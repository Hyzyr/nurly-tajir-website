export const dummyAwait = <T>(locale: string, data: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 20);
  });
