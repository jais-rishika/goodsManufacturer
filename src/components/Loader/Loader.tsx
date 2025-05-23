import { useSyncExternalStore } from "react";
import styles from "./Loader.module.scss";
import type { LoadingProps } from "./Loader.types.ts";

const store = {
  _listeners: new Set<() => void>(),
  _showLoader: false,

  subscribe(listener: () => void) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  },
  getSnapshot() {
    return this._showLoader;
  },
  showLoader() {
    this._showLoader = true;
    this._listeners.forEach((listener) => listener());
  },
  hideLoader() {
    this._showLoader = false;
    this._listeners.forEach((listener) => listener());
  },
};
const Loader = ({}: LoadingProps) => {
  const showLoader = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapshot.bind(store)
  );
  if (!showLoader) return false;
  return (
    <div className={styles.LoaderOverlay}>
      <div className={styles.Loader}></div>;
    </div>
  );
};

export const showLoader = store.showLoader.bind(store);
export const hideLoader = store.hideLoader.bind(store);
export default Loader;
