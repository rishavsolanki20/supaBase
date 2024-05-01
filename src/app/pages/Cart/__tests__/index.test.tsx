import * as React from 'react';
import { render } from '@testing-library/react';

import { Cart } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<Cart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Cart />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
