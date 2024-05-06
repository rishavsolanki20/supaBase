import * as React from 'react';
import { render } from '@testing-library/react';

import { Order } from '..';

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

describe('<Order  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Order />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
