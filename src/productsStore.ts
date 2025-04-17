import { createAsyncThunk, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Define initial state
const initialState = {
  count: 1,
};

interface ProductsState  {
  products: any[];
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

async function fetchAllProducts() {
  
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  
}

export const fetchProducts = createAsyncThunk("users/fetch", async () => {
  try {
    let response : any [] = [];   
    
    response = await fetchAllProducts();
    
      return response;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    throw new Error('An unexpected error occurred');
  }
});

// Create a slice for user management
const countSlice = createSlice({
  name: "counter",
  initialState: {count: 0},
  reducers: {
    setCounter: (state, action) => {
      state.count = action.payload;
    },
  },
});

const navMenuSlice = createSlice({
  name: "navMenu",
  initialState: {
    anchorElNav: true
  },
  reducers: {
    handleOpenNavMenu: (state, action) => {
      state.anchorElNav = action.payload;
    },
    handleCloseNavMenu: (state, action) => {
      state.anchorElNav = action.payload;
    }
  }
})

const productsSlice = createSlice({
  name:"products",
  initialState: {
    products: [],
    page: 0,
    limit: 10,
    loading: true,
    error: null
  } as ProductsState,
  reducers: {
    handleUpdateProductList: (state, action) => {
      state.products = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action : any) => {
        state.loading = false;
        state.products = action.payload;
        state.page = action.meta.arg?.page || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
})

// Export actions
export const { setCounter } = countSlice.actions;
export const { handleOpenNavMenu } = navMenuSlice.actions;
export const { handleCloseNavMenu } = navMenuSlice.actions;

// Create Redux store
const productsStore = configureStore({
  reducer: {
    counter: countSlice.reducer,
    nav: navMenuSlice.reducer,
    products: productsSlice.reducer
  },
});

// Export typed hooks for usage in components
export type RootState = ReturnType<typeof productsStore.getState>;
export type AppDispatch = typeof productsStore.dispatch;
export const productsReducer = productsSlice.reducer;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default productsStore;