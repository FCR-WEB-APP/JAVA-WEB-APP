import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'; // Import Provider if using Redux
import Layout from './Layout.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
 import SrCreditReviewer from './components/Sr. Credit Reviewer/SrCreditReviewer';
import DashboardOfSrCR from './components/Dashboard/Dashboard.jsx'
import DashboardOfHOFCR from './components/Dashboard/DashboardOfHOFCR.jsx'
import HeadOfFCR from './components/HeadOfFCR page/HeadOfFCR.jsx'
import SrCRAssignCR from './components/Sr. Credit Reviewer/SrCRAssignCR.jsx'
import DashboardtoAssignCR from './components/Dashboard/DashboardtoAssignCR.jsx'
import CreditReviewertoAssignSPOC from './components/CreditReviewer/CreditReviewertoAssignSPOC.jsx'
import SPOCScreenForChild from './components/SPOC/SPOCScreenForChild.jsx'
import SPOCScreenForIssue from './components/SPOC/SPOCScreenForIssue.jsx'
import LoginPage from './components/SignIn&SignUp/Login.jsx'
import store from './components/features/store.js';
const loggedInUser = "John Doe";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/"  element={<DashboardOfSrCR loggedInUser={loggedInUser}    />} /> 
        <Route path="srcreditreviewer" element={<SrCreditReviewer loggedInUser={loggedInUser}/>} /> 
        <Route path="dashboardfcr" element={<DashboardOfHOFCR loggedInUser={loggedInUser}/>} /> 
        <Route path="headOfFCR" element={<HeadOfFCR loggedInUser={loggedInUser} />} /> 
        <Route path="srcrassign" element={<SrCRAssignCR loggedInUser={loggedInUser}/>} />
        <Route path="dashtoAssign" element={<DashboardtoAssignCR loggedInUser={loggedInUser}/>} /> 
        <Route path="creditreviewerassign" element={<CreditReviewertoAssignSPOC loggedInUser={loggedInUser} />} />
        <Route path="spocchild" element={<SPOCScreenForChild loggedInUser={loggedInUser}/>} />
        <Route path="spocissue" element={<SPOCScreenForIssue loggedInUser={loggedInUser}/>} />
      </Route>
    )
  )

  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
  



// import React from 'react';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute.jsx';
// import Layout from './Layout.jsx';
// import SrCreditReviewer from './components/Sr. Credit Reviewer/SrCreditReviewer';
// import DashboardOfSrCR from './components/Dashboard/Dashboard.jsx';
// import DashboardOfHOFCR from './components/Dashboard/DashboardOfHOFCR.jsx';
// import HeadOfFCR from './components/HeadOfFCR page/HeadOfFCR.jsx';
// import SrCRAssignCR from './components/Sr. Credit Reviewer/SrCRAssignCR.jsx';
// import DashboardtoAssignCR from './components/Dashboard/DashboardtoAssignCR.jsx';
// import CreditReviewertoAssignSPOC from './components/CreditReviewer/CreditReviewertoAssignSPOC.jsx';
// import SPOCScreenForChild from './components/SPOC/SPOCScreenForChild.jsx';
// import SPOCScreenForIssue from './components/SPOC/SPOCScreenForIssue.jsx';
// import Login from './components/SignIn&SignUp/Login.jsx';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <DashboardOfSrCR />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="srcreditreviewer"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <SrCreditReviewer />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="dashboardfcr"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <DashboardOfHOFCR />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="headOfFCR"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <HeadOfFCR />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="srcrassign"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}    >
//             <SrCRAssignCR />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="dashtoAssign"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <DashboardtoAssignCR />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="creditreviewerassign"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <CreditReviewertoAssignSPOC />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="spocchild"
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}    >
//             <SPOCScreenForChild />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="spocissue"  
//         element={
//           <PrivateRoute allowedRoles={['SrCreditReviewer','HeadOfFCR','CreditReviewer', 'SPOC']}>
//             <SPOCScreenForIssue />
//           </PrivateRoute>
//         }
//       />
//       <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
//     </Route>
//   )
// );

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );

