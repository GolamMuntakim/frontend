import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'react-hot-toast'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './components/Error.jsx';
import Register from './components/Register.jsx';
import AuthProviders from './Providers/AuthProviders.jsx'
import Login from './components/Login.jsx'
import CreatePost from './components/CreatePost.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AllPost from './components/AllPost.jsx'
import PostDetails from './components/PostDetails.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import AddedProperty from './Dashboard/AddedProperty.jsx'
import UserRoute from './Route/UserRoute.jsx'
import ManageUser from './Dashboard/ManageUser.jsx'
import Home from './components/Home.jsx'
import {  HelmetProvider } from 'react-helmet-async';
import Details from './components/Details.jsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    errorElement:<Error></Error>,
    children:[
      {path: "/", element: <Home></Home>},
    {path: "create-post", element:<PrivateRoute><CreatePost></CreatePost></PrivateRoute>},
    {path: "all-post", element:<AllPost></AllPost>},
    {path:'postDetails/:id',element:<PrivateRoute><PostDetails></PostDetails></PrivateRoute>},
      
    ]
  },
  {path:'/register',element:<Register></Register>},
  {path:'/login',element:<Login></Login>},
  {
    path:'/dashboard',
   element:<Dashboard></Dashboard>,
   children:[
    {
      path:'my-added',
      element:<UserRoute> <AddedProperty /></UserRoute>
    },
    {
      path:'users',
      element:<UserRoute> <ManageUser></ManageUser></UserRoute>
    },
    {
      path:'postDetails/:id',
      element:<Details></Details>
    },
   ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
    <AuthProviders>
    <RouterProvider router={router} />
    <Toaster/>
    </AuthProviders>
    </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
