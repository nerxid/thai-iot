import React from 'react';


import GeneralMemberForm from '../../../components/froms/GeneralMemberForm';
import IndividualMemberForm from '../../../components/froms/IndividualMemberForm';
import StudentMemberForm from '../../../components/froms/StudentMemberForm';
import CorporateMemberForm from '../../../components/froms/CorporateMemberForm';


const RegistrationForm = ({ memberType }) => {
  
  const renderForm = () => {
    switch (memberType) {
      case 'general':
        return <GeneralMemberForm />;
      case 'individual':
        return <IndividualMemberForm />;
      case 'student':
        return <StudentMemberForm />;
      case 'corporate':
        return <CorporateMemberForm />;
      default:
        return <div>ไม่พบประเภทสมาชิกที่เลือก</div>;
    }
  };

  return (
    <div style={{ backgroundColor: "#cde4ff", minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container">
        {renderForm()}
      </div>
    </div>
  );
};

export default RegistrationForm;