import {configureStore, createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
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
      state.products = action.payload;
    },
  }
})

const store = configureStore({
  reducer: counterSlice.reducer
})

const {increment, decrement, reset, setProducts} = counterSlice.actions;

export {store, increment, decrement, reset, setProducts};