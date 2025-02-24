import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    value: {
        data: [],       // Initialize as empty array
        filePath: "",   // Initialize as empty string
      },
    error: null,
    loading: false
}

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (userId, thunkApi) => {
        try {
            const response = await axios.get(`http://localhost:4800/api/website/wishlist/read-wishlist/${userId}`);
            return response.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const WishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default WishlistSlice.reducer;