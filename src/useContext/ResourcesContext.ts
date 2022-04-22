import { createContext, useContext } from 'react';

export type GlobalContent = {
  toast: string;
  setToast: (message: string) => void;
};

export const ResourcesContext = createContext<GlobalContent>({
  toast: '', // set a default value
  setToast: () => {},
});
export const useGlobalContext = () => useContext(ResourcesContext);
