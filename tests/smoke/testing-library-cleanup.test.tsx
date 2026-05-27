import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('testing library cleanup', () => {
  it('renders the first marker', () => {
    render(<div>first-marker</div>);

    expect(screen.getByText('first-marker')).toBeInTheDocument();
  });

  it('starts the next test with a clean document', () => {
    render(<div>second-marker</div>);

    expect(screen.queryByText('first-marker')).not.toBeInTheDocument();
    expect(screen.getByText('second-marker')).toBeInTheDocument();
  });
});
