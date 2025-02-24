import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slices/userSlice'
import ParentCategorySlice  from './slices/parentCategorySlice'
import ProductCategorySlice from './slices/productCategorySlice'
import ProductSlice from './slices/productSlice'
import CartSlice from './slices/cartSlice'
import WishlistSlice from './slices/wishlistSlice'
import OrderSlice from './slices/orderSlice'
import BannerSlice from './slices/bannerSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    parentCategory: ParentCategorySlice,
    productCategory: ProductCategorySlice,
    product: ProductSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
    order: OrderSlice,
    banner: BannerSlice
  },
})