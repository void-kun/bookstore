import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Account, User } from '../entities';


class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req?.body;
    if (!(email && password)) res.status(400).send();

    const accountRepo = getRepository(Account);
    let account: Account;
    try {
      account = await accountRepo.findOneOrFail({ email: email });
    } catch(error) {
      res.status(401).send();
      return next(error);
    }

    if (!account.checkPasswordIsValid(password)) {
      res.status(401).send();
      return next(new Error("password invalid"));
    }

    res.send({message: 'login success!'});
    return next();
  }

  static register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req?.body;
    if (!(email && password)) res.status(401).send();
      
    const accountRepo = getRepository(Account);
    try {
      const account = await accountRepo.findOne({ email: email });
      if (account) throw new Error("Email existed");
    } catch(error) {
      res.status(401).send({message: error});
      return next(error);
    }

    await getConnection().manager.transaction(async (entityManager) => {
      try {
        const user: User = new User();
        user.avatar = 'default avatar';
        await entityManager.save(user);
      
        const account: Account = new Account();
        account.user = user;
        account.username = email;
        account.email = email;
        account.hash = password;
        await entityManager.save(account);
                                                 
      } catch(error) {
        return next(new Error(error));
      }
    });
  
    res.send({message: 'regiter action'});
    return next();
  }
};

export default AuthController;

