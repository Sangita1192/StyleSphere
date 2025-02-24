import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    value:{},
    error:null,
    loading:false
}

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(userData, thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4800/api/website/cart/read-cart/${userData}`);
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error);
        }
    }
)

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.value = action.payload;
        })
        .addCase(fetchCart.rejected, (state,action)=>{
            state.error = action.payload;
        })

    }
})

export default CartSlice.reducer;