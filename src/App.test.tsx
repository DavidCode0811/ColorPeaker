import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './app';  // <-- fixed here

test('renders ColorDetector component', () => {
  render(<App />);
  expect(screen.getByText(/color/i)).toBeInTheDocument();
});
