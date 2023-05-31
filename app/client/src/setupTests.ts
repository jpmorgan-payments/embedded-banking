import { vi } from 'vitest';
import matchers, {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers';
//@ts-ignore
import replaceAllInserter from 'string.prototype.replaceall';
import mockedResizeObserver from 'resize-observer-polyfill';

replaceAllInserter.shim();
global.ResizeObserver = mockedResizeObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers);
