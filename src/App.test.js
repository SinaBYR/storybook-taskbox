import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskbox span inside heading 1 tag', () => {
  const { container } = render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // expect(container.querySelector('.page.lists-show '))
  //   .not.toBe(null);
  const spanInsideHeadingOneTag = screen.getByText('Taskbox')
  expect(spanInsideHeadingOneTag).toHaveClass('title-wrapper');
});
