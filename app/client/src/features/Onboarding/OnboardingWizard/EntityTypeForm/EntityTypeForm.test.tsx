import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { EntityTypeForm } from './EntityTypeForm';

describe('EntityTypeForm', () => {
  const onSelect = vi.fn();
  const onSubmit = vi.fn();

  const setup = () => {
    render(<EntityTypeForm onSelect={onSelect} onSubmit={onSubmit} />);
  };

  beforeEach(() => {
    onSelect.mockClear();
    onSubmit.mockClear();
  });

  it('should have submit button disabled on initial render', () => {
    setup();
    expect(getSubmitButton()).toBeDisabled();
  });

  it('should call onSelect when clicking on entity type options', async () => {
    setup();
    const radioLLC = getRadioLLC();
    const radioSP = getRadioSP();

    await user.click(radioSP);
    expect(radioSP).toBeChecked();
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith('Sole Proprietor');
    });

    await user.click(radioLLC);
    expect(radioLLC).toBeChecked();
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith('LLC');
    });

    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('should call onSubmit when clicking submit', async () => {
    setup();
    await user.click(getRadioLLC());
    user.click(getSubmitButton());

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { entityType: 'LLC', mockEnabled: false },
        expect.any(Object),
      );
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit with mockedEnabled true if it is checked', async () => {
    setup();
    await user.click(getRadioSP());
    user.click(getMockEnabledCheckbox());
    user.click(getSubmitButton());

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { entityType: 'Sole Proprietor', mockEnabled: true },
        expect.any(Object),
      );
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

function getRadioLLC() {
  return screen.getByRole('radio', {
    name: /LLC/i,
  });
}

function getRadioSP() {
  return screen.getByRole('radio', {
    name: /Sole Proprietor/i,
  });
}

function getMockEnabledCheckbox() {
  return screen.getByRole('checkbox', {
    name: /Auto-fill forms with mock data/i,
  });
}

function getSubmitButton() {
  return screen.getByRole('button', { name: /Get started!/i });
}
