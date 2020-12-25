import React, { createContext, useContext, useReducer } from 'react';

//Create data layer
export const StateContext = createContext();

// Wrap application and provide data layer to every component of app
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);