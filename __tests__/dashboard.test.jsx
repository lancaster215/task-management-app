// __tests__/dashboard.test.jsx
import { render, screen } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard.tsx';

// Mock Redux + Next Router
jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({ assignee: { name: 'John Doe' } })),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Dashboard Component', () => {
  it('renders three tabs: Table, Kanban, Graphs', () => {
    render(<Dashboard task={[]} assignee={{ name: 'John Doe' }} />);

    expect(screen.getByRole('tab', { name: /table/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /kanban/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /graphs/i })).toBeInTheDocument();

    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });
});
