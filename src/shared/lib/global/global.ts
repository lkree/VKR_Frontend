import type { Store } from '~/app/model/store';

export const getStore = () => window.store;
export const setStore = (store: Store) => (window.store = store);

declare global {
  interface Window {
    store: Store;
  }
}
