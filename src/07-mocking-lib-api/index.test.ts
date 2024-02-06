import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const moduleLodash = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...moduleLodash,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const requestPath = '/todos';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: requestPath }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(requestPath);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(requestPath);
    expect(mock.get).toHaveBeenCalledWith(requestPath);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(requestPath);
    expect(await throttledGetDataFromApi(requestPath)).toEqual(requestPath);
  });
});
