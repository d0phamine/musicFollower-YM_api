import React, { createContext, useContext } from "react";
import { musicStore } from "./musicStore";
import { authStore } from "./authStore";

type StoreProps = {
    store: any,
    children:any,
}

export const rootStore = {musicStore, authStore};

export const RootStoreContext = createContext({ rootStore });

export const useRootStore = () => useContext(RootStoreContext);

export const RootStoreProvider: React.FC<StoreProps> = ({ store, children }) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};