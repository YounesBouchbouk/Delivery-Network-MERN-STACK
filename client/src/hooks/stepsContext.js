import { createContext, useContext, useState, useReducer } from "react";

const StepperContext = createContext({
  data: {
    phones: [],
    workingdays: {},
    adresses: [],
    deliveryzones: [],
    loading: false,
    status: false,
    error: false,
  },
  dispatche: null,
});

export function UseContextProvider({ children }) {
  const reducerFun = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return { ...state, loading: !state.loading };
      case "SET_STATUS":
        return { ...state, status: action.status };
      case "SET_ERROR":
        return { ...state, error: action.error };
      case "ADD_PHONE_NUMBER":
        const newphoneList = [...state.phones, action.phone];
        return { ...state, phones: newphoneList };
        break;
      case "REMOVE_PHONE_NUMBER":
        const newListe = state.phones.filter((item) => item !== action.phone);
        return { ...state, phones: newListe };
        break;
      case "ADD_ADRESS":
        return { ...state, adresses: [...state.adresses, action.adress] };
        break;
      case "REMOVE_ADRESS":
        const newList = state.adresses.filter((item) => {
          return item.index !== action.index;
        });
        return { ...state, adresses: newList };
        break;
      case "ADD_ZONE":
        return {
          ...state,
          deliveryzones: [...state.deliveryzones, action.zone],
        };
        break;
      case "REMOVE_ZONE":
        const newList2 = state.deliveryzones.filter((item) => {
          return item.index !== action.index;
        });
        return { ...state, deliveryzones: newList2 };
        break;
      case "AFFICHE_DATA":
        console.log(state);
        break;
      case "ADD_DAY":
        return {
          ...state,
          workingdays: { ...state.workingdays, [action.day]: true },
        };
        break;
      case "REMOVE_DAY":
        return {
          ...state,
          workingdays: { ...state.workingdays, [action.day]: false },
        };
        break;

      default:
        break;
    }
  };

  const [data, dispatche] = useReducer(reducerFun, {
    phones: [],
    workingdays: {},
    adresses: [],
    deliveryzones: [],
  });

  return (
    <StepperContext.Provider value={{ data, dispatche }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { data, dispatche } = useContext(StepperContext);

  return { data, dispatche };
}
