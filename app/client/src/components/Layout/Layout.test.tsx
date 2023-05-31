import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';

describe('Layout', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout
          themeProps={{
            currentThemeName: '',
            themeNames: [],
            setThemeName: vi.fn(),
          }}
        />
      </BrowserRouter>,
    );
  });

  it('should have banner, navigation, and main', () => {
    const banner = screen.getByRole('banner');
    const navigation = screen.getByRole('navigation');
    const main = screen.getByRole('main');
    expect(banner).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
