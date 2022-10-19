import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders 3 list items', ()=> {
//   render(<App/>)
//   const linkItems = screen.getAllByRole("listitem");
//   expect(linkItems).toHaveLength(3);
// })

// // test('renders 3 list items with length', ()=> {
// //   render(<App/>)
// //   const linkItems = screen.getAllByRole("listitem");
// //   expect(linkItems.length).toBe(3);
// // })

// test('renders title', ()=> {
//   render(<App />);
//   const title = screen.getByTestId("mytestid")
//   expect(title).toBeInTheDocument()
// })

// test('sum should be 6', ()=> {
//   render(<App />);
//   const sum = screen.getByTitle("sum")
//   expect(sum.textContent).toBe("6")
// })

