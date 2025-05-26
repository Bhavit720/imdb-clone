import React, { createContext, useState } from 'react';

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  const saveData = (id) => {
    setSavedItems(prev=>[...prev,id]);
  };

  return (
    <SavedContext.Provider value={{ savedItems, saveData }}>
      {children}
    </SavedContext.Provider>
  );
};
