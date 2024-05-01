import * as React from 'react';
import { render } from '@testing-library/react';

import { Viewcart } from '..';

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

describe('<Viewcart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Viewcart />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
