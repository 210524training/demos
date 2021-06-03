import log from './log';
import { receiveUserSelection } from './services/menu/menu';

/**
 * Features:
 * Contains Products - Check
 * Displays info on Products - Check
 * Accept Selection for a product
 *      - Find a Product based on a selection - Check
 *      - Receive a Selection from a User - Check (Sort of)
 * Accept payment for product
 * Dispense a product
 * Restock Products - Check
 * Adding new Products - Check
 * Dispense Change (optional)
 * Track which products have been sold (analytics) (optional)
 * Register Users - Check
 *      - Only Customers can be registered - Check
 *      - Employees must be created manually
 * Login as a User - Check
 * Data Persistence - Check
 */

async function start() {
  // eslint-disable-next-line no-constant-condition
  while(true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await receiveUserSelection();
    } catch(error) {
      log.debug(error);
    }
  }
}

start();
