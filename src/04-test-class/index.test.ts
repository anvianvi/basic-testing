import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(1000);
    expect(myAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myAccount = getBankAccount(100);
    expect(() => myAccount.withdraw(150)).toThrow(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(200);
    const targetAccount = getBankAccount(0);
    expect(() => myAccount.transfer(300, targetAccount)).toThrow(
      new InsufficientFundsError(200),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(100);
    expect(() => myAccount.transfer(1000, myAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const myAccount = getBankAccount(150);
    expect(myAccount.deposit(150).getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const myAccount = getBankAccount(300);
    expect(myAccount.withdraw(150).getBalance()).toBe(150);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(100);
    const targetAccount = getBankAccount(0);
    myAccount.transfer(69, targetAccount);
    expect(myAccount.getBalance()).toBe(31);
    expect(targetAccount.getBalance()).toBe(69);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const myAccount = getBankAccount(666);
    let balance = null;
    while (balance === null) {
      balance = await myAccount.fetchBalance();
    }
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(100);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValue(50);
    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(100);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
