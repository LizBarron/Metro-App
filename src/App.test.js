// import { render, screen } from '@testing-library/react';
// import App from './App';
import { isNullOrUndefined } from './services/TypeChecks';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('pass a null variable into isNullOrUndefined(...) and it should return true', () => {
  const testVar = null;
  expect(isNullOrUndefined(testVar)).toBe(true);
});

test('pass a undefined variable into isNullOrUndefined(...) and it should return true', () => {
  const testVar = undefined;
  expect(isNullOrUndefined(testVar)).toBe(true);
});

test('pass an object into isNullOrUndefined(...) and it should return false', () => {
  const testVar = {};
  expect(isNullOrUndefined(testVar)).toBe(false);
});

test('pass an empty string into isNullOrUndefined(...) and it should return false', () => {
  const testVar = '';
  expect(isNullOrUndefined(testVar)).toBe(false);
});

test('pass an non-empty string into isNullOrUndefined(...) and it should return false', () => {
  const testVar = 'Hello World';
  expect(isNullOrUndefined(testVar)).toBe(false);
});