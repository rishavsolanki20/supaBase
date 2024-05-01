/**
 *
 * Asynchronously loads the component for Signin
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Signin = lazyLoad(
  () => import('./index'),
  module => module.default,
);
