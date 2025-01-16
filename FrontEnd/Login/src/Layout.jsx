import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
function Layout() {
 
    const loggedInUser = "John Doe";

  return (
    <div>
      <Navbar userName={loggedInUser} />
      <Outlet/>
    </div>
  );
}

export default Layout;