import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3.14, b: 3.86, action: Action.Add })).toBe(7);
    expect(simpleCalculator({ a: -6, b: 6, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({ a: 2024, b: 1992, action: Action.Subtract }),
    ).toBe(32);
    expect(
      simpleCalculator({ a: 3010, b: 3020, action: Action.Subtract }),
    ).toBe(-10);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 25, b: 4, action: Action.Multiply })).toBe(
      100,
    );
    expect(simpleCalculator({ a: -25, b: 4, action: Action.Multiply })).toBe(
      -100,
    );
    expect(simpleCalculator({ a: -25, b: -4, action: Action.Multiply })).toBe(
      100,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 5, action: Action.Divide })).toBe(20);
    expect(simpleCalculator({ a: -100, b: 5, action: Action.Divide })).toBe(
      -20,
    );
    expect(simpleCalculator({ a: -100, b: -5, action: Action.Divide })).toBe(
      20,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(
      243,
    );
    expect(simpleCalculator({ a: -3, b: 5, action: Action.Exponentiate })).toBe(
      -243,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 11, b: 22, action: 'unknownAction' }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 33, b: 44, action: 123456789012345 }),
    ).toBeNull();
    expect(simpleCalculator({ a: 55, b: 66, action: {} })).toBeNull();
    expect(simpleCalculator({ a: 77, b: 88, action: [] })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '55', b: '77', action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 55, b: '77', action: Action.Multiply }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '55', b: 77, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: ['55'], b: 77, action: Action.Exponentiate }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 55, b: ['77'], action: Action.Exponentiate }),
    ).toBeNull();
  });
});
