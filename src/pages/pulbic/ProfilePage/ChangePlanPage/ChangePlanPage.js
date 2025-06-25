import React from 'react';
import { useParams } from 'react-router-dom';

import ChangePlan_IndividualForm from '../../../../components/froms/ChangePlan/ChangePlan_IndividualMemberForm';
import ChangePlan_CorporateForm from '../../../../components/froms/ChangePlan/ChangePlan_CorporateMemberForm';

const ChangePlanPage = () => {
    const { memberType } = useParams();
 
    const renderForm = () => {
        switch (memberType) {
            case 'individual':
                return <ChangePlan_IndividualForm />;
            case 'corporate':
                return <ChangePlan_CorporateForm />;
            default:
                return <div>ไม่พบประเภทสมาชิกที่เลือก หรือไม่สามารถเปลี่ยนแผนได้</div>;
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

export default ChangePlanPage;