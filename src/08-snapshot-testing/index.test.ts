import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([{ head: 'value 1' }])).toStrictEqual({
      next: {
        next: null,
        value: null,
      },
      value: {
        head: 'value 1',
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3, 4, 5]);
    expect(linkedList).toMatchSnapshot();
  });
});
