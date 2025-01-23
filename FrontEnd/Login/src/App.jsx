// import { useState } from 'react'
import Navbar from './components/Navbar'
import CaseDetailsForm from './components/CaseForm/CaseDetailsForm';
import CheckFirst from './components/CheckReponsive/CheckFirst';
import HeadOfFCR from './components/HeadOfFCR page/HeadOfFCR';
import CreditReviewer from './components/Credit Reviewer/CreditReviewer';
// import CheckCard from './components/checkCard';
import Dashboard from './components/Dashboard/Dashboard'
import SrCreditReviewer from './components/Sr. Credit Reviewer/SrCreditReviewer';
import SrCRAssignCR from './components/Sr. Credit Reviewer/SrCRAssignCR';
import CreditReviewertoAssignSPOC from './components/CreditReviewer/CreditReviewertoAssignSPOC';
import SPOCScreenForIssue from './components/SPOC/SPOCScreenForIssue';
import SPOCScreenForChild from './components/SPOC/SPOCScreenForChild';
import Login from './components/SignIn&SignUp/Login';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
function App() {

  const loggedInUser = "John Doe";
  return (
    <>

    <Login/>
       {/* <Navbar userName={loggedInUser} />
      <Dashboard userName={loggedInUser}/> 
       <SrCreditReviewer loggedInUser={loggedInUser}/> 
      <HeadOfFCR loggedInUser={loggedInUser}/>
       <SrCRAssignCR loggedInUser={loggedInUser}/> 
        <CaseDetailsForm loggedInUser={loggedInUser} /> 
      <CheckFirst loggedInUser={loggedInUser}/>
       <CreditReviewertoAssignSPOC loggedInUser={loggedInUser}/> 
      <SPOCScreenForIssue loggedInUser={loggedInUser}/>
      <SPOCScreenForChild loggedInUser={loggedInUser}/>
      <CreditReviewer loggedInUser={loggedInUser}/> */}
    </>
  )
}
export default App