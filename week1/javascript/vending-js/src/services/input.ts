import readline from 'readline';
import User from '../models/user';
import inventoryService from './inventoryService';
import userService from './userService';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function exit() {
  userService.save();
  rl.close();
  process.exit(0);
}

const currentUser: User | undefined = undefined;

function initialPrompt(): Promise<string> {
  return new Promise<string>(
    (resolve, reject) => {
      rl.question(
        `What do you want to do?
        0. Register
        1. Login
        2. Display Products
        q. Exit\n`,
        (answer) => {
          let valid = false;
          if((!Number.isNaN(Number(answer)) && (Number(answer) <= 2) && (Number(answer) >= 0)) || (answer === 'q')) {
            valid = true;
          }

          if(valid) {
            resolve(answer);
          }

          reject();
        },
      );
    },
  );
}

function customerPrompt(): Promise<string> {
  return new Promise<string>(
    (resolve) => resolve(''),
  );
}

function employeePrompt(): Promise<string> {
  return new Promise<string>(
    (resolve) => resolve(''),
  );
}

function queryUsername(): Promise<string> {
  return new Promise<string>(
    (resolve) => {
      rl.question(
        'What is your username? ',
        (answer) => resolve(answer),
      );
    },
  );
}

function confirmPassword(password: string): Promise<boolean> {
  return new Promise<boolean>(
    (resolve) => {
      rl.question(
        'Please confirm your password: ',
        (answer) => resolve(answer === password),
      );
    },
  );
}

async function queryPassword(): Promise<string> {
  const password = await new Promise<string>(
    (resolve) => {
      rl.question(
        'What is your password? ',
        (answer) => resolve(answer),
      );
    },
  );

  if(await confirmPassword(password)) {
    return password;
  }

  console.log('Passwords did not match');
  throw new Error('Promise did not match');
}

function queryBalance(): Promise<number> {
  return new Promise<number>(
    (resolve, reject) => {
      rl.question('What is your starting balance: ',
        (answer) => {
          if(!Number.isNaN(Number(answer))) {
            resolve(Number(answer));
          }

          reject();
        });
    },
  );
}

async function attemptRegister(): Promise<void> {
  // We must prompt the user for their username, password, and how much money they have
  const username = await queryUsername();

  if(userService.findByUsername(username)) {
    console.log('The provided username is already taken');
    throw new Error('Username already taken');
  }

  const password = await queryPassword();
  const balance = await queryBalance();

  // I have to check: Is this username already in use?
  // If it is, I quit back to the initial menu
  // Otherwise, I should register this user

  userService.register(new User(username, password, 'Customer', balance));
}

async function receiveUserSelection(): Promise<void> {
  let response: string;
  if(!currentUser) {
    response = await initialPrompt();

    switch (response) {
    case '0':
      // Allow the User to register
      await attemptRegister();
      break;
    case '1':
      break;
    // etc
    default:
      exit();
    }
  } else {
    if(currentUser.role === 'Customer') {
      await customerPrompt();
    }

    await employeePrompt();
  }
  // Give some other Prompt
}

export async function start() {
  await userService.load();
  await inventoryService.load();

  // eslint-disable-next-line no-constant-condition
  while(true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await receiveUserSelection();
    // eslint-disable-next-line no-empty
    } catch(error) {}
  }
}
