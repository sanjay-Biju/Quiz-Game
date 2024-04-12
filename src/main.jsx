import * as React from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import FileTwo from './pages/FileTwo.jsx';
import FileThree from './pages/FileThree.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
    {
      path:'/',
      element: <FileTwo/>,
    },
    {
      path:'/FileThree',
      element: <FileThree/>,
    },
    
]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 
)
