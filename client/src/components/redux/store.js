import {configureStore, createSlice} from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    value: 0,
    products: [],
    clients: [],
    suppliers: [],
    purchases: [],
    users: [],
    carrito: [],
    inventory: []
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
    },
    setSuppliers: (state, action)=>{
      state.suppliers = action.payload
    },
    deleteSupplier: ()=>{
      state.suppliers.filter(()=>supplier.id !== action.payload)
    },
    setPurchases: (state, action)=>{
      state.purchases = action.payload
    },
    deletePurchases: (state, action)=>{
      state.purchases.filter(()=>purchase.idPurchase !== action.payload)
    },
    setUsers: (state, action)=>{
      state.users = action.payload
    },
    setCarrito: (state, action)=>{
      state.carrito = action.payload
    },
    setInventory: (state, action) => {
      state.inventory = action.payload
    }
  }
})

const store = configureStore({
  reducer: warehouseSlice.reducer
})

const {increment, decrement, reset, setProducts, deleteProduct, setClients, setSuppliers, deleteClient, deleteSupplier, setPurchases, deletePurchases, setUsers, setCarrito, setInventory} = warehouseSlice.actions;

export {store, increment, decrement, reset, setProducts, deleteProduct, setClients, setSuppliers, setPurchases, deletePurchases, deleteClient, deleteSupplier, setUsers, setCarrito, setInventory};