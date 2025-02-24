import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchBanner = createAsyncThunk(
    'parentCategory/fetchBanner',
    async(_, thunkApi)=>{
        try{
            const response = await axios.get('http://localhost:4800/api/website/banner/read-banner');
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

export const BannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchBanner.fulfilled,(state, action)=>{
            state.value = action.payload;
            
        })
        .addCase(fetchBanner.rejected, (state,action)=>{
            state.error = action.payload;
        })
    }

});


export default BannerSlice.reducer