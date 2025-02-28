import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Navigation from './pages/Auth/Navigation';
import 'react-toastify/ReactToastify.css';
function App() {
  
  return (
    <>
       <ToastContainer/>
       <Outlet/>
       <Navigation/>
       <main className="py-3">

       </main>
       <h1>App JSX</h1>
    </>
  )
}

export default App
