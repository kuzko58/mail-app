import * as crypto from 'crypto';

export const generateRandomString = (num: number) => {
  const bytes = new Uint8Array(num);
  crypto.randomFillSync(bytes, 0, num);
  return bytes.toString();
};
