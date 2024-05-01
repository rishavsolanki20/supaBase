/**
 *
 * Asynchronously loads the component for Cart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Cart = lazyLoad(
  () => import('./index'),
  module => module.Cart,
);
