import * as React from 'react';
import { render } from '@testing-library/react';

import { Signin } from '..';

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

describe('<Signin  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Signin />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
