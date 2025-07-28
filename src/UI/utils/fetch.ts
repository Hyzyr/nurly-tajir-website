export const dummyAwait = <T>(locale: string, data: T): Promise<T> =>
  new Promise((resolve) => {
    console.log(`dummyAwait locale: ${locale}`);
    setTimeout(() => {
      resolve(data);
    }, 20);
  });
