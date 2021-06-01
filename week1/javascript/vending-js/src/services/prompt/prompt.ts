import { isPosition, Position } from '../../models/item';
import { questionAsync } from '../../utils/inpututils';
import inventoryService from '../inventory/inventoryService';

export function initialPrompt(): Promise<string> {
  return questionAsync(
    `What do you want to do?
      0. Register
      1. Login
      2. Display Products
      q. Exit\n`,
    (answer) => ['0', '1', '2', 'q'].includes(answer),
  );
}

export function customerPrompt(): Promise<string> {
  return questionAsync(
    `What do you want to do?
      0. Purchase Product
      1. Display Products
      2. Logout
      q. Exit\n`,
    (answer) => ['0', '1', '2', 'q'].includes(answer),
  );
}

export function employeePrompt(): Promise<string> {
  return questionAsync(
    `What do you want to do?
      0. Add Product
      1. Restock
      2. Display Products
      3. Logout
      q. Exit\n`,
    (answer) => ['0', '1', '2', '3', 'q'].includes(answer),
  );
}

export function queryUsername(): Promise<string> {
  return questionAsync('What is your username? ');
}

export function queryPassword(): Promise<string> {
  return questionAsync('What is your password? ');
}

export async function confirmPassword(password: string): Promise<boolean> {
  const answer = await questionAsync('Please confirm your password: ');

  return answer === password;
}

export async function queryBalance(): Promise<number> {
  const answer = await questionAsync('What is your starting balance: ');

  if(!Number.isNaN(Number(answer))) {
    return Number(answer);
  }

  throw new Error('Provided balance was not a Number');
}

export function queryProductName(): Promise<string> {
  return questionAsync('What is the name of your product? ', (answer) => inventoryService.getByName(answer) === undefined);
}

// Needed to limit the size of the input to 14 whole number digits
// due to limitations on JavaScript's precision
export async function queryProductPrice(): Promise<number> {
  const response = await questionAsync(
    `What is the price of your product?
    It will be rounded to 2 decimal places and must have at most 14 whole number digits.
    $`, (answer) => !Number.isNaN(Number(answer)) && Number(answer) < 10 ** 14,
  );

  return Math.round(Number(response) * 100) / 100;
}

export async function queryProductPosition(): Promise<Position> {
  return await questionAsync(
    `What is the position of your product?
It must be of the pattern [A-F][0-9].\n`, isPosition,
  ) as Position;
}

export async function queryProductStock(): Promise<number> {
  const response = await questionAsync(
    `How many of your product is in stock?
It must be an integer.\n`, (answer) => Number.isInteger(Number(answer)) && Number(answer) >= 0,
  );

  return Number(response);
}
