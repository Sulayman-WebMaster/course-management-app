
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routers/route.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'



createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider>

)
