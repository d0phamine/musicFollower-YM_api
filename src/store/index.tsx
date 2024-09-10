import React, { createContext, useContext } from "react";
import { musicStore } from "./musicStore";
import { authStore } from "./authStore";

interface IStores {
  authStore:unknown,
  musicStore:unknown
}

type StoreProps = {
    store: any,
    children:any,
}

export const rootStore:IStores = {musicStore, authStore};

export const RootStoreContext = createContext({ rootStore });

export const useRootStore = () => useContext(RootStoreContext);

export const RootStoreProvider: React.FC<StoreProps> = ({ store, children }) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};