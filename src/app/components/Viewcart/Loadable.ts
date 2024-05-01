/**
 *
 * Asynchronously loads the component for Viewcart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Viewcart = lazyLoad(
  () => import('./index'),
  module => module.Viewcart,
);
