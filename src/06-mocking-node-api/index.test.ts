import path from 'path';
import fs from 'fs';
import * as fsPr from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs/promises');
jest.mock('fs');

describe('doStuffByTimeout', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 400);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockFn, 400);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 400);
    expect(mockFn).not.toBeCalled();
    jest.runAllTimers();
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should set interval with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, 100);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockFn, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFn = jest.fn();
    doStuffByInterval(mockFn, 1500);
    expect(mockFn).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1500 * 3);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './test.ts';
    const joinMock = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './test.ts';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './test.ts';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPr, 'readFile').mockResolvedValue('someData');
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('someData');
  });
});
