import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    const element = screen.getByText('Task Manager');
    expect(element).toBeInTheDocument();
  })
})