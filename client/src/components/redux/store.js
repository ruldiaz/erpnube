import {configureStore, createSlice} from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    value: 0,
    products: []
  },
  reducers: {
    increment: (state)=>{
      state.value += 1
    },
    decrement: (state)=>{
      state.value -= 1
    },
    reset: (state)=>{ 
      state.value = 0
    },
    setProducts: (state, action)=>{
      state.products = action.payload
    },
    deleteProduct: (state, action)=>{
      state.products.filter((product)=>product.id !== action.payload)
    }
  }
})

const store = configureStore({
  reducer: warehouseSlice.reducer
})

const {increment, decrement, reset, setProducts, deleteProduct} = warehouseSlice.actions;

export {store, increment, decrement, reset, setProducts, deleteProduct};