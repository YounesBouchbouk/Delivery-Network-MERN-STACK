import { createContext, useContext, useState, useReducer } from "react";

const StepperContext = createContext({
  dispatche: null,
  loading: false,
  error: false,
});

export function UsePackageContextProvider({ children }) {
  const Reducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return { ...state, loading: !state.loading };

      case "ADD_SHIPPMENT":
        return { ...state, shipments: action.Globalshipments };
      case "ADD_SHIPPMENT_FRAGMENT":
        return {
          ...state,
          shipment_fragments: [...state.shipment_fragments, action.newOne],
        };
      case "DELETE_SHIPPMENT_FRAGMENT":
        return {
          ...state,
          shipment_fragments: state.shipment_fragments.filter(
            (item) => item.ChosedTarrif !== action.id
          ),
        };
      case "ADD_ORDERLINES_PRICEANDLENGHT":
        return {
          ...state,
          packages: {
            ...state.packages,
            orderLines: {
              ...state.packages.orderLines,
              qty: action.qty,
              totalPrice: action.totalPrice,
            },
          },
        };

      case "ADD_TOTAL_AMOUNT_TO_PACKAGE":
        return {
          ...state,
          packages: { ...state.packages, amout: action.total },
        };
      case "ADD_WORKFLOW_TO_SHIPPMENT":
        return {
          ...state,
          shipments: { ...state.shipments, workflow: action.workflow },
        };
      case "ADD_STATUS_TO_SHIPPMENT":
        return {
          ...state,
          shipments: { ...state.shipments, status: action.status },
        };
      case "ADD_STATUS_TO_FRAGMENTSLIST":
        let newLists = state.shipment_fragments.map((item) => {
          return { ...item, currentstatus: action.currentstatus };
        });
        return {
          ...state,
          shipment_fragments: newLists,
        };
      case "ADD_PACKAGEINFO":
        return { ...state, packages: action.packageInfo };
      case "ADD_NEW_PRODUCT":
        if (state.packages.orderLines?.products) {
          return {
            ...state,
            packages: {
              ...state.packages,
              orderLines: {
                ...state.packages.orderLines,
                products: [
                  ...state.packages.orderLines.products,
                  action.newOne,
                ],
              },
            },
          };
        } else {
          return {
            ...state,
            packages: {
              ...state.packages,
              orderLines: {
                ...state.packages.orderLines,
                products: [action.newOne],
              },
            },
          };
        }

      case "DELETE_PRODUCT":
        const newList = state.packages.orderLines.products.filter(
          (item) => item.index !== action.index
        );
        return {
          ...state,
          packages: {
            ...state.packages,
            orderLines: { ...state.packages.orderLines, products: newList },
          },
        };
      default:
        break;
    }
  };

  const [data, dispatche] = useReducer(Reducer, {
    shipments: {},
    shipment_fragments: [],
    packages: { orderLines: { products: [] }, receiver: {}, dimentions: {} },
  });

  return (
    <StepperContext.Provider value={{ data, dispatche }}>
      {children}
    </StepperContext.Provider>
  );
}

export function PackageStepperContext() {
  const { data, dispatche } = useContext(StepperContext);

  return { data, dispatche };
}
