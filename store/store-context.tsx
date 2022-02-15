import { createContext, useReducer } from "react";


interface ICoffeeStores {

  [key: string]: any
  , id: string,
  name: string,
  imgUrl: string


}
interface IntineState {
  latLong: string,
  coffeeStores: Array<ICoffeeStores>
}

export interface IStoreContext {
  state: IntineState,
  dispatch: React.Dispatch<any>;

}
const initialState: IntineState = {
  latLong: "",
  coffeeStores: [],
};
export const StoreContext = createContext<IStoreContext>({
  state: {
    coffeeStores: [],
    latLong: ''

  },
  dispatch: () => null
});

export enum ACTION_TYPES {
  SET_LAT_LONG = "SET_LAT_LONG",
  SET_COFFEE_STORES = "SET_COFFEE_STORES",
};


interface ISET_LAT_LONG {
  type: typeof ACTION_TYPES.SET_LAT_LONG,
  payload: {
    latLong: string

  }
}



interface ISET_COFFEE_STORES {
  type: typeof ACTION_TYPES.SET_COFFEE_STORES,
  payload: {
    coffeeStores: Array<ICoffeeStores>

  }
}


type Action = ISET_LAT_LONG | ISET_COFFEE_STORES


const storeReducer = (state: IntineState = initialState, action: Action): IntineState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action?.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload?.coffeeStores };
    }
    default: state
  }
};

const StoreProvider = ({ children }) => {


  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}x
    </StoreContext.Provider>
  );
};

export default StoreProvider;
