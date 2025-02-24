import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

//to integrate api globally can't be done into reducers because it works synchronously, so we need to use separate function for this and use AsyncThunk
//takes two parameter one is name and other is async function can't use then/catch
export const verifyLogin = createAsyncThunk(
    //name- usually taken slice_name follwed by function-name
    'user/verifyLogin',
    //two-paramenter first one comes from user, and second user-state(standard name used thunkApi)
    async(auth, thunkApi)=>{
       try{
        const response = await axios.post('http://localhost:4800/api/website/users/verify-user', {auth});
        return response.data;
       } 
       catch(error){
        return thunkApi.rejectWithValue(error.message);
       }

    }
);

const initialState = {
    value: {},
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        setUser : (state,action)=>{
            state.value = action.payload;
        }
    },
    //used to take response from asyncThunk, Builder add cases depends on api response- pending, reject and fulfilled
    extraReducers:(builder)=>{
        builder
        .addCase(verifyLogin.pending, (state, action)=>{
            state.loading = true;      
        })
        .addCase(verifyLogin.fulfilled, (state,action)=>{
            state.loading = false;
            state.value = action.payload;     
        })
        .addCase(verifyLogin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
        
});

//export const {  } = userSlice.actions

export default userSlice.reducer