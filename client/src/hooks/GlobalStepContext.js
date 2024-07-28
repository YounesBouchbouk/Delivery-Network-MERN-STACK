import { createContext } from "react";

// const GlobalStepContext = createContext({
//   index: 1,
//   setIndex: null,
// });

// export function UseGlobalStepContextProvider({ children }) {
//   const [index, setIndex] = useState(1);

//   return (
//     <GlobalStepContext.Provider value={{ index, setIndex }}>
//       {children}
//     </GlobalStepContext.Provider>
//   );
// }

// export function useGlobalStepContext() {
//   const { index, setIndex } = useContext(GlobalStepContext);

//   return { index, setIndex };
// }

export const GlobalStepContext = createContext({
  index: 1,
  setIndex: null,
});
