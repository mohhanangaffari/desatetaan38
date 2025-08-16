import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home';
import FasilitasPendidikanDanIbadah from './pages/pendidikandanibadah';
import Petadesa from './pages/petadesa';
import Gallery from './pages/Gallery';
import AdminGallery from './pages/AdminGallery'
import Adminpeta from './pages/Adminpetadesa';
import Admincheck from "./admincheck";
import AdminLogin from "./pages/LoginAdmin"
import Adminpopup from './adminpopup';
import AdminFasilitas from './pages/AdminFasilitas';
import useAdminAuth from './adminsession';
import LogoutAdmin from './logoutadmin';
import Adminkegiatandesa from './pages/Adminkegiatandesa';
import AdminDataDesa from './pages/AdminDataDesa';
import AdminStrukturDesa from './pages/AdminStrukturDesa';
import AdminGambarDesa from './pages/AdminGambarDesa';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



export default function App() {
  const {isadmin} = useAdminAuth();
  return (
    <>
    
    <BrowserRouter>
    {isadmin && <Adminpopup/>}
    <div className='min-h-screen '
    style={{ backgroundImage: "url('bg.png')",backgroundSize: "auto 70%",
        backgroundPosition: "center", }}
    >
      <header className='bg-brand-maroon text-white shadow-soft'>
      <nav className='bg-brand-maroon text-white p-4 flex gap-4'>        
        <Link to="/">Beranda</Link>
        <Link to="/pendidikandanibadah">Fasilitas Pendidikan Dan Ibadah</Link>
        <Link to="/petadesa">Peta Desa</Link>
        <Link to="/gallery">Gallery Desa</Link>
        <Link to="/loginadmin">Login Admin</Link>      
      </nav>
      </header>
      <div className='pb-6 pl-6 pr-6 overflow-x-hidden' >
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/pendidikandanibadah' element={<FasilitasPendidikanDanIbadah/>}/>
          <Route path='/petadesa' element={<Petadesa/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/admingallery' element={<Admincheck><AdminGallery/></Admincheck>}/>
          <Route path='/adminpetadesa' element={<Admincheck><Adminpeta/></Admincheck>}/>
          <Route path='/adminfasilitas' element={<Admincheck><AdminFasilitas/></Admincheck>}/>
          <Route path='/adminkegiatandesa' element={<Admincheck><Adminkegiatandesa/></Admincheck>}/>
          <Route path='/admindatadesa' element={<Admincheck><AdminDataDesa/></Admincheck>}/>
          <Route path='/adminstruktur' element={<Admincheck><AdminStrukturDesa/></Admincheck>}/>
          <Route path='/admingambardesa' element={<Admincheck><AdminGambarDesa/></Admincheck>}/>
          <Route path='/loginadmin' element={<AdminLogin/>}/>
          <Route path='/adminlogout' element={<LogoutAdmin/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  );
}





