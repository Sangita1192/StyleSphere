import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchParentCategory = createAsyncThunk(
    'parentCategory/fetchParentCategory',
    async(_, thunkApi)=>{
        try{
            const response = await axios.get('http://localhost:4800/api/website/parent-categories/active-parent-categories');
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

export const ParentCategorySlice = createSlice({
    name: 'parentCategory',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchParentCategory.fulfilled,(state, action)=>{
            state.value = action.payload;
            
        })
        .addCase(fetchParentCategory.rejected, (state,action)=>{
            state.error = action.payload;
        })
    }

});


export default ParentCategorySlice.reducer