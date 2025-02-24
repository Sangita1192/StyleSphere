import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

export const fetchActiveProducts = createAsyncThunk(
    'product/fetchActiveProducts',
    async(category,thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4800/api/website/products/active-products/${category}`);
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const fetchallProducts = createAsyncThunk(
    'product/fetchAllProduts',
    async(_,thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4800/api/website/products/all-products`);
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const fetchProduct = createAsyncThunk(
    'product/fetchProdut',
    async(id,thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4800/api/website/products/read-product/${id}`);
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const fetchNewlyArrivedProducts = createAsyncThunk(
    'product/fetchNewlyArrivedProducts',
    async(_,thunkApi)=>{
        try{
            const response = await axios.get(`http://localhost:4800/api/website/products/newly-arrived`);
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

const initialState ={
    value:{},
    loading:false,
    error:null
}

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchActiveProducts.fulfilled, (state,action)=>{
            state.value = action.payload;
            state.loading = false;
        })
        .addCase(fetchActiveProducts.rejected, (state, action)=>{
            state.error = action.payload;
        })
        .addCase(fetchallProducts.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false;
        })
        .addCase(fetchallProducts.rejected, (state, action)=>{
            state.error = action.payload;
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false;
        })
        .addCase(fetchProduct.rejected, (state, action)=>{
            state.error = action.payload;
        })
        .addCase(fetchNewlyArrivedProducts.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false;
        })
        .addCase(fetchNewlyArrivedProducts
            .rejected, (state, action)=>{
            state.error = action.payload;
        })

    }
})

export default ProductSlice.reducer;