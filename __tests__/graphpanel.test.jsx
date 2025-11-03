import { render, screen } from '@testing-library/react';
import GraphPanel from '@/components/tab_panel/graphs';

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => jest.fn()),
}));

// Mock PieChart
jest.mock('@mui/x-charts/PieChart', () => ({
  PieChart: () => null,
  pieArcLabelClasses: { root: 'mock-root' },
}));


describe('GraphPanel Component', () => {
  beforeEach(() => {
    const mockTasks = [
      { id: 1, assigneeId: 1, title: 'Task 1', status: 'todo' },
      { id: 2, assigneeId: 1, title: 'Task 2', status: 'done' },
      { id: 3, assigneeId: 1, title: 'Task 3', status: 'in_progress' },
    ];

    require('react-redux').useSelector.mockReturnValue({
      task: mockTasks,
      assignee: { id: 1, name: 'John Doe' },
    });
  });

  it('renders all chart tabs (Pie, Bar, Calendar)', () => {
    render(<GraphPanel />);
    expect(screen.getByRole('tab', { name: /pie chart/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /bar chart/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /calendar/i })).toBeInTheDocument();
  });
});
