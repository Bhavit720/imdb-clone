
import React, { createContext, useState } from 'react';

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);
  

  const saveData = (movie) => {
    setSavedItems((prev) => {
      if (prev.some(item => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeData = (movie) => {
    setSavedItems((prev) => prev.filter(item => item.id !== movie.id));
  };

  return (
    <SavedContext.Provider value={{ savedItems, saveData, removeData }}>
      {children}
    </SavedContext.Provider>
  );
};
