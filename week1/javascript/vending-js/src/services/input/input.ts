import Item from '../../models/item';
import {
  confirmPassword,
  queryPassword,
  queryProductName,
  queryProductPosition,
  queryProductPrice,
  queryProductStock,
} from '../prompt/prompt';

export async function registerPassword(): Promise<string> {
  const password = await queryPassword();

  if(await confirmPassword(password)) {
    return password;
  }

  console.log('Passwords did not match');
  throw new Error('Promise did not match');
}

export async function queryProduct(): Promise<Item> {
  const name = await queryProductName();
  const price = await queryProductPrice();
  const position = await queryProductPosition();
  const stock = await queryProductStock();

  return new Item(name, price, position, stock);
}
