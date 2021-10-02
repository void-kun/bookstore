import { getRepository } from 'typeorm';
import { Account } from '../entities';

const checkEmailExists = async (value: string): Promise<boolean> => {
  const accountRepo = getRepository(Account);
  try {
    const account = await accountRepo.findOne({ email: value });
    if (account) throw new Error();
  } catch (error) {
    return false;
  }
  return true;
};

export { checkEmailExists };
