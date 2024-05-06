
import {Routes,Route} from 'react-router-dom'
import PrivateRoute from './components/Routes/Private';
import About from './pages/About';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import Dashboard from './pages/user/Dashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateSite from './pages/Admin/CreateSite';
import Users from './pages/Admin/Users';
import Bookings from './pages/user/Bookings';
import Profile from './pages/user/Profile';
import Sites from './pages/Admin/Sites';
import UpdateSite from './pages/Admin/UpdateSite';
import Search from './pages/Search';
import SiteDetails from './pages/SiteDetails';
import Categories from './pages/Categories';
import CategorySite from './pages/CategorySite';
import CartPage from './pages/CartPage';




function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/site/:slug' element={<SiteDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/category/:slug' element={<CategorySite/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/bookings" element={<Bookings />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-site" element={<CreateSite />} />
          <Route path="admin/site/:slug" element={<UpdateSite />} />
          <Route path="admin/sites" element={<Sites />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    
     
    </>
  );
}

export default App;
