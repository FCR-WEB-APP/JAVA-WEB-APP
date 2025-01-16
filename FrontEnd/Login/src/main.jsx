import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

const loggedInUser = "John Doe";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<DashboardOfSrCR loggedInUser={loggedInUser}/>} /> 
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
    <RouterProvider router={router} />
  </StrictMode>
)
