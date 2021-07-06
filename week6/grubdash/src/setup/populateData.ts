import dotenv from 'dotenv';
import User from '../models/user';
import userRepository from '../repositories/user.repository';

dotenv.config({});

async function populateTable() {
  await userRepository.add(
    new User(
      'larry',
      'password',
      'Customer',
      '1 Finite Loop',
      '5742340334',
    ),
  );

  await userRepository.add(
    new User(
      'bobby',
      'password123',
      'Admin',
      '221b Baker St',
      '1112223333',
    ),
  );
}

(async () => {
  try {
    await populateTable();
  } catch(error) {
    console.log('Failed to populate table: ', error);
  }
})();
