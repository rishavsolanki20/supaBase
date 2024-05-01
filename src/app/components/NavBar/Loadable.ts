/**
 *
 * Asynchronously loads the component for Navbar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Navbar = lazyLoad(
  () => import('./index'),
  module => module.Navbar,
);
