import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

function Layout() {
  const location = useLocation();

   const hideNavbarPaths = ['/login', '/register'];

   const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
       {!shouldHideNavbar && <Navbar />}
       <Outlet />
    </div>
  );
}

export default Layout;
