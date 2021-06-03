import log from '../../log';
import User from '../../models/user';
import { exit } from '../../utils/inpututils';
import { queryProduct, registerPassword } from '../input/input';
import inventoryService from '../inventory/inventoryService';
import {
  customerPrompt, employeePrompt, initialPrompt, queryBalance, queryPassword, queryUsername,
} from '../prompt/prompt';
import userService from '../user/userService';

export async function attemptAddProduct(): Promise<void> {
  const item = await queryProduct();
  inventoryService.putProduct(item);
  console.log(`${item.name} has been added to the Vending Machine inventory.`);
}

export async function attemptLogin(): Promise<void> {
  const username = await queryUsername();
  const password = await queryPassword();

  const success = userService.login(username, password);

  if(success) {
    console.log('Login Successful!');
  } else {
    console.log('Login Failed...');
    throw new Error('Login Failed...');
  }
}

export async function attemptRegister(): Promise<void> {
  // We must prompt the user for their username, password, and how much money they have
  const username = await queryUsername();

  // I have to check: Is this username already in use?
  // If it is, I quit back to the initial menu
  // Otherwise, I should register this user
  if(userService.findByUsername(username)) {
    console.log('The provided username is already taken');
    throw new Error('Username already taken');
  }

  const password = await registerPassword();
  const balance = await queryBalance();

  log.debug(`username: ${username}, password: ${password}`);
  // One consideration is to be careful about logging sensitive information
  // In the above statement I am logging a plaintext password
  // Which in the real world is something we definitely don't want to do
  // For our demo, it doesn't really matter
  userService.register(new User(username, password, 'Customer', balance));
  console.log('You have successfully registered');
}

export async function receiveUserSelection(): Promise<void> {
  let response: string;
  if(!userService.currentUser) {
    response = await initialPrompt();

    switch (response) {
    case '0':
      // Allow the User to register
      await attemptRegister();
      break;
    case '1':
      // Allow the User to login
      await attemptLogin();
      break;
    case '2':
      // Display the products to the User
      inventoryService.displayContents();
      break;
    case 'q':
      await exit();
      break;
    default:
      break;
    }
    // Give some other Prompt
  } else if(userService.currentUser.role === 'Customer') {
    await customerPrompt();
  } else {
    response = await employeePrompt();

    switch (response) {
    case '0':
      // Add Product
      await attemptAddProduct();
      break;
    case '1':
      // Restock Product
      break;
    case '2':
      // Display the products to the User
      inventoryService.displayContents();
      break;
    case '3':
      // Logout
      userService.logout();
      break;
    case 'q':
      await exit();
      break;
    default:
      break;
    }
  }
}
