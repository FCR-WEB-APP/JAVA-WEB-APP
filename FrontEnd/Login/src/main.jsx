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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<DashboardOfSrCR />} /> 
      <Route path="srcreditreviewer" element={<SrCreditReviewer />} /> 
      <Route path="dashboardfcr" element={<DashboardOfHOFCR />} /> 
      <Route path="headOfFCR" element={<HeadOfFCR />} /> 
      <Route path="srcrassign" element={<SrCRAssignCR />} />
      <Route path="dashtoAssign" element={<DashboardtoAssignCR />} /> 
      <Route path="creditreviewerassign" element={<CreditReviewertoAssignSPOC />} />
      <Route path="spocchild" element={<SPOCScreenForChild />} />
      <Route path="spocissue" element={<SPOCScreenForIssue/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
