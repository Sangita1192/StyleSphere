//admin controllers
const { registerAdmin, adminLogin, generateOtp, updateEmail, verifyAdminLogin } = require("./admin-panel/adminController");

//Color Controllers
const { createColor, viewColorCategories, updateColorStatus, deleteColor, deleteColors, viewColor, updateColor, ActiveColors } = require("./admin-panel/colorController");

//ParentCategory Controllers
const { createParentCategory, viewParentCategory,updateParentCategoryStatus, deleteParentCategory, deleteParentCategories, readParentCategory, updateParentCategory, ActiveParentCategory} = require("./admin-panel/parentCategoryController");

//Product Category controllers
const { createProductCategory, viewProductCategory, updateProductStatus, deleteProduct, deleteProductCategories, readProductCategory, updateProductCategory, ActiveProductCategory, productCategoryByparentCategory, updateProductIsFeaturedStatus } = require("./admin-panel/productCategoryController");

// Size Controllers
const {createSize, viewSizes, updateSizeStatus, deleteSize, deleteMultipleSizes, viewSize, updateSize, ActiveSizes} = require("./admin-panel/sizeController");

//product controllers
const { createProduct, readProducts, updateStatus, deleteOneProduct, deleteProducts, readProduct, updateProduct } = require("./admin-panel/productController");


//WEBSITE CONTROLLERS

//userControllers
const { generateOtpWeb, registerUser, verifyJwt, loginUser, forgotPassword, resetPassword } = require("./website/userController");
const { ActiveParentCategoryWeb } = require("./website/ParentCategoryController");
const { ActiveProductCategoryWeb, ActiveProdCatasParentCategoryWeb, featuredCategoryAsParentCategoryWeb } = require("./website/ProductCategoryController");
const { ActiveProductByParentCatWeb, SearchProducts, AllProductWeb, readProductWeb, mostViewedProducts, incrementViewsCountOfProduct, newlyArrivedProducts } = require("./website/ProductController");
const { createCart, readCartforUser, updateCartItemQty, deleteCartItem, deleteCartItems } = require("./website/cartController");
const { createCheckout, updatePaymentStatus } = require("./website/payment");
const { createStory, readStories, updateStoryStatus, deleteStory, deleteStories, readStory, updateStory } = require("./admin-panel/storyController");
const { createSlider, readSliders, updateSliderStatus, deleteSlider, deleteSliders, readSlider, updateSlider } = require("./admin-panel/sliderController");
const readOrders = require("./admin-panel/orderController");
const { createWishlist, wishlistsForUser, deleteProductFromWishlist } = require("./website/wishListController");
const { readOrderHistory } = require("./website/orderHistoryController");
const { createBanner, readBanners, updateIsfallback, deleteBanner, deleteBanners } = require("./admin-panel/bannerController");
const { readBannersWeb } = require("./website/bannerController");
const { addSearchHistory, viewUserSearchKeyword, trendingSearch } = require("./website/searchHistoryController");




module.exports ={
    createParentCategory,
    viewParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    createSize,
    ActiveParentCategory,
    createProductCategory,
    viewProductCategory,
    updateProductStatus,
    deleteProduct,
    deleteProductCategories,
    readProductCategory,
    updateProductCategory,
    updateProductIsFeaturedStatus,
    ActiveProductCategory,
    registerAdmin,
    adminLogin,
    verifyAdminLogin,
    generateOtp,
    updateEmail,
    viewSizes,
    updateSizeStatus,
    deleteSize,
    deleteMultipleSizes,
    viewSize,
    updateSize,
    ActiveSizes,
    createColor,
    viewColorCategories,
    updateColorStatus,
    deleteColor,
    deleteColors,
    viewColor,
    updateColor,
    ActiveColors,
    productCategoryByparentCategory,
    createProduct,
    readProducts,
    updateStatus,
    deleteOneProduct,
    deleteProducts,
    readProduct,
    updateProduct,
    createStory,
    readStories,
    updateStoryStatus,
    deleteStory,
    deleteStories,
    readStory,
    updateStory,
    createSlider,
    readSliders,
    updateSliderStatus,
    deleteSlider,
    deleteSliders,
    readSlider,
    updateSlider,
    readOrders,
    createBanner,
    readBanners,
    updateIsfallback,
    deleteBanner,
    deleteBanners,

    //web controllers
    generateOtpWeb,
    registerUser ,
    verifyJwt,
    loginUser,
    forgotPassword,
    resetPassword,
    ActiveParentCategoryWeb,
    ActiveProductCategoryWeb,
    ActiveProdCatasParentCategoryWeb,
    ActiveProductByParentCatWeb,
    featuredCategoryAsParentCategoryWeb,
    SearchProducts,
    AllProductWeb,
    readProductWeb,
    incrementViewsCountOfProduct,
    mostViewedProducts,
    newlyArrivedProducts,
    createCart,
    readCartforUser,
    updateCartItemQty,
    deleteCartItem,
    deleteCartItems,
    createCheckout,
    updatePaymentStatus,
    createWishlist,
    wishlistsForUser,
    deleteProductFromWishlist,
    readOrderHistory,
    readBannersWeb,
    addSearchHistory,
    viewUserSearchKeyword,
    trendingSearch,
}