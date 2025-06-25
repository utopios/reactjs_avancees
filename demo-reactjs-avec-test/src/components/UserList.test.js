import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {rest} from 'msw';
import { setupServer } from 'msw/node';
import { renderWithClient } from '../helpers/query-test-utils';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ])
    );
  })
);  

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList Component', () => {
  test('renders user list with fetched data', async () => {
    const { renderWithClient } = renderWithClient(<UserList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('handles server error gracefully', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { renderWithClient } = renderWithClient(<UserList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/error fetching users/i)).toBeInTheDocument();
    });
  });
}
);