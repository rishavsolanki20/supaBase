/**
 *
 * Asynchronously loads the component for Order
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Order = lazyLoad(
  () => import('./index'),
  module => module.Order,
);
