import React from 'react';
import { useParams } from 'react-router-dom';

import ChangePlanIndividualForm from '../../../components/froms/ChangePlan/ChangePlan_IndividualMemberForm';
import ChangePlanCorporateForm from '../../../components/froms/ChangePlan/ChangePlan_CorporateMemberForm';

const ChangePlanFormHost = () => {
    const { memberType } = useParams();
 
    const renderForm = () => {
        switch (memberType) {
            case 'individual':
                return <ChangePlanIndividualForm />;
            case 'corporate':
                return <ChangePlanCorporateForm />;
            default:
                return <div className="text-center p-5 bg-white rounded-3 shadow">ไม่สามารถเปลี่ยนเป็นแผนสมาชิกนี้ได้</div>;
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

export default ChangePlanFormHost;