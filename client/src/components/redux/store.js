import {configureStore, createSlice} from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    value: 0,
    products: [],
    clients: []
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
    },
    setClients: (state, action)=>{
      state.clients = action.payload
    },
    deleteClient: (state, action)=>{
      state.clients.filter((client)=>client.id !== action.payload)
    }
  }
})

const store = configureStore({
  reducer: warehouseSlice.reducer
})

const {increment, decrement, reset, setProducts, deleteProduct, setClients, deleteClient} = warehouseSlice.actions;

export {store, increment, decrement, reset, setProducts, deleteProduct, setClients, deleteClient};