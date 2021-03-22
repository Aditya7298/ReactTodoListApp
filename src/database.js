export const resolveDatabaseCall = () => {
  const faliureProbability = Math.random();
  return new Promise((resolve, reject) => {
    if (faliureProbability >= -1) {
      resolve();
    } else {
      reject();
    }
  });
};
