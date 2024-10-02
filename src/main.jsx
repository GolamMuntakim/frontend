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
const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    errorElement:<Error></Error>,
    children:[
    {path: "create-post", element:<CreatePost></CreatePost>}
      
    ]
  },
  {path:'/register',element:<Register></Register>},
  {path:'/login',element:<Login></Login>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
    <RouterProvider router={router} />
    <Toaster/>
    </AuthProviders>
  </StrictMode>,
)
