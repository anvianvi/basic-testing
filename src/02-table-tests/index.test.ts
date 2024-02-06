import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: -2, b: 2, action: Action.Add, expected: 0 },
  { a: -12, b: 2, action: Action.Add, expected: -10 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: -5, b: 2, action: Action.Subtract, expected: -7 },
  { a: -5, b: -2, action: Action.Subtract, expected: -3 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: -3, b: 3, action: Action.Multiply, expected: -9 },
  { a: -3, b: -3, action: Action.Multiply, expected: 9 },
  { a: 100, b: 20, action: Action.Divide, expected: 5 },
  { a: -100, b: 20, action: Action.Divide, expected: -5 },
  { a: -100, b: -20, action: Action.Divide, expected: 5 },
  { a: -3, b: 5, action: Action.Exponentiate, expected: -243 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: 55, b: 77, action: 'unknownAction', expected: null },
  { a: 55, b: 77, action: 123, expected: null },
  { a: 55, b: 77, action: [], expected: null },
  { a: '55', b: 77, action: Action.Add, expected: null },
  { a: 55, b: '77', action: Action.Add, expected: null },
  { a: '55', b: '77', action: Action.Add, expected: null },
  { a: 55, b: ['77'], action: Action.Add, expected: null },
  { a: 55, b: {}, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'getting the expected result for all provided cases',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
