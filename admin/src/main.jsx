import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App.jsx'
import './App.css'
import './index.css';
import './media.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './Admin/Admin.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import Profile from './Admin/Profile.jsx';
import AddSize from './Admin/AddSize.jsx';
import ViewSize from './Admin/ViewSize.jsx';
import AddColor from './Admin/AddColor.jsx';
import ViewColor from './Admin/ViewColor.jsx';
import AddCat from './Admin/AddCat.jsx';
import ViewCat from './Admin/ViewCat.jsx';
import AddProdCat from './Admin/AddProdCat.jsx';
import ViewProdCat from './Admin/ViewProdCat.jsx';
import ProdAdd from './Admin/ProdAdd.jsx';
import ProdView from './Admin/ProdView.jsx';
import StoryDetail from './Admin/StoryDetail.jsx';
import StoryView from './Admin/StoryView.jsx';
import Order from './Admin/Order.jsx';
import Slider from './Admin/Slider.jsx';
import Dash from './Admin/Dash.jsx';
import UpdateCat from './Admin/UpdateCat.jsx';
import UpdatePCat from './Admin/UpdatePCat.jsx';
import UpdateSize from './Admin/UpdateSize.jsx';
import UpdateColor from './Admin/UpdateColor.jsx';
import ViewSlider from './Admin/ViewSlider.jsx';
import UpdateStory from './Admin/UpdateStory.jsx';
import UpdateSlider from './Admin/UpdateSlider.jsx';
import UpdateProduct from './Admin/UpdateProduct.jsx';
import Banner from './Admin/AddBanner.jsx';
import { ViewBanner } from './Admin/ViewBanner.jsx';
import { UpdateBanner } from './Admin/UpdateBanner.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path:'/admin',
    element:<Admin/>
  },
  {
    path:"/admin/dashboard",
    element:<Dashboard/>,
    children: [
      {
        path: '/admin/dashboard/dashboard',
        element: <Dash/>
      },
      {
        path: '/admin/dashboard/profile',
        element: <Profile/>
      },
      {
        path: '/admin/dashboard/profile/sizedetails',
        element: <AddSize/> 
      },
      {
        path: '/admin/dashboard/profile/viewsize',
        element: <ViewSize/> 
      },
      {
        path: '/admin/dashboard/profile/updatesize/:id',
        element: <UpdateSize/> 
      },
      {
        path: '/admin/dashboard/profile/addcolor',
        element: <AddColor/> 
      },
      {
        path: '/admin/dashboard/profile/viewcolor',
        element: <ViewColor/> 
      },
      {
        path: '/admin/dashboard/profile/updatecolor/:id',
        element: <UpdateColor/> 
      },
      {
        path: '/admin/dashboard/profile/addcategory',
        element: <AddCat/> 
      },
      {
        path: '/admin/dashboard/profile/viewcategory',
        element: <ViewCat/> 
      },
      {
        path: '/admin/dashboard/profile/updatecategory/:id',
        element: <UpdateCat/> 
      },
      {
        path: '/admin/dashboard/profile/addproductcategory',
        element: <AddProdCat/> 
      },
      {
        path: '/admin/dashboard/profile/viewproductcategory',
        element: <ViewProdCat/> 
      },
      {
        path: '/admin/dashboard/profile/updateproductcategory/:id',
        element: <UpdatePCat/> 
      },
      {
        path: '/admin/dashboard/profile/productadd',
        element: <ProdAdd/> 
      },
      {
        path: '/admin/dashboard/profile/productview',
        element: <ProdView/> 
      },
      {
        path: '/admin/dashboard/profile/updateproduct/:id',
        element: <UpdateProduct/> 
      },
      {
        path: '/admin/dashboard/profile/storydetails',
        element: <StoryDetail/> 
      },
      {
        path: '/admin/dashboard/profile/viewstory',
        element: <StoryView/> 
      },
      {
        path: '/admin/dashboard/profile/updatestory/:id',
        element: <UpdateStory/> 
      },
      {
        path: '/admin/dashboard/profile/order',
        element: <Order/> 
      },
      {
        path: '/admin/dashboard/profile/slider',
        element: <Slider/> 
      },
      {
        path: '/admin/dashboard/profile/viewslider',
        element: <ViewSlider/> 
      },
      {
        path: '/admin/dashboard/profile/updateslider/:id',
        element: <UpdateSlider/> 
      },
      {
        path: '/admin/dashboard/profile/banner',
        element: <Banner/> 
      },
      {
        path: '/admin/dashboard/profile/viewbanner',
        element: <ViewBanner/> 
      },
      {
        path: '/admin/dashboard/profile/updatebanner/:id',
        element: <UpdateBanner/> 
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
