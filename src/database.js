// This is a fake database designed so that 10% of the database calls will fail.

export const resolveDatabaseCall = () => {
  const faliureProbability = Math.random();
  return new Promise((resolve, reject) => {
    if (faliureProbability >= 0.1) {
      resolve();
    } else {
      reject();
    }
  });
};
