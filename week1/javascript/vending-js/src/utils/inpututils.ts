import readline from 'readline';
import inventoryService from '../services/inventory/inventoryService';
import userService from '../services/user/userService';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function exit() {
  await userService.save();
  await inventoryService.save();
  rl.close();
  process.exit(0);
}

/**
 * A wrapper around the rl.question() method that returns a Promise of the response.
 * An optional callback to determine if a provided input is valid
 * If the callback is provided, but evaluates to false, the promise is rejected.
 */
// eslint-disable-next-line max-len
export function questionAsync(question: string, isValid?: (answer: string) => boolean): Promise<string> {
  return new Promise<string>(
    (resolve, reject) => {
      rl.question(question, (answer) => {
        if(!isValid) {
          resolve(answer);
          return;
        }

        if(isValid(answer)) {
          resolve(answer);
        }

        reject(new Error(`${answer} is not valid according to ${isValid}`));
      });
    },
  );
}
