export const membersData = [
    // --- สมาชิกที่ชำระเงิน (Paid Members) ---
    { 
        id: 1, prefix: 'นาย', firstName: 'วิชา', lastName: 'สมคิด', 
        organization: 'บริษัท ไอโอที จำกัด', position: 'กรรมการผู้จัดการ', phone: '0812345678', 
        address: '123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', email: 'wicha.som@gmail.com', 
        lineId: 'wicha.s', plan: 'นิติบุคคล', type: 'paid', status: 'รอการอนุมัติเอกสาร', 
        joinDate: '28 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 2, prefix: 'นาย', firstName: 'สมชาย', lastName: 'ใจดี', 
        organization: 'Tech Solutions', position: 'นักพัฒนาซอฟต์แวร์', phone: '0887654321', 
        address: '456 ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', email: 'somchai.jai@example.com', 
        lineId: 'somchai.j', plan: 'บุคคลธรรมดา', type: 'paid', status: 'อนุมัติ', 
        joinDate: '27 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 3, prefix: 'นางสาว', firstName: 'มานี', lastName: 'มีสุข', 
        organization: 'อิสระ', position: 'นักการตลาด', phone: '0911223344', 
        address: '789 ถ.พหลโยธิน แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400', email: 'manee.mee@example.com', 
        lineId: 'manee.m', plan: 'บุคคลธรรมดา', type: 'paid', status: 'รอการอนุมัติการชำระเงิน', 
        joinDate: '26 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 4, prefix: 'นาง', firstName: 'มาลี', lastName: 'ศรีสมร', 
        organization: 'บริษัท เทค จำกัด', position: 'ผู้จัดการฝ่ายบุคคล', phone: '0655443322', 
        address: '101 ถ.เพชรบุรี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400', email: 'contact@tech.co.th', 
        lineId: 'malee.contact', plan: 'นิติบุคคล', type: 'paid', status: 'อนุมัติ', 
        joinDate: '25 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 8, prefix: 'นาย', firstName: 'ก้องหล้า', lastName: 'นภาลัย', 
        organization: '', position: '', phone: '0815975324', 
        address: '44 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', email: 'kongla@example.com', 
        lineId: 'kongla.n', plan: 'บุคคลธรรมดา', type: 'paid', status: 'อนุมัติ', 
        joinDate: '21 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 9, prefix: 'นาง', firstName: 'นารี', lastName: 'ศรีสยาม', 
        organization: 'Innovate Corp', position: 'ประธานเจ้าหน้าที่บริหาร', phone: '0824681357', 
        address: '55 ถ.สาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500', email: 'naree.sri@example.com', 
        lineId: 'naree.s', plan: 'นิติบุคคล', type: 'paid', status: 'รอการอนุมัติเอกสาร', 
        joinDate: '20 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 12, prefix: 'นาย', firstName: 'วีระ', lastName: 'กล้าหาญ', 
        organization: 'V-Tech', position: 'เจ้าของกิจการ', phone: '0898765432', 
        address: '111 ถ.แจ้งวัฒนะ ต.ปากเกร็ด อ.ปากเกร็ด นนทบุรี 11120', email: 'veera.k@vtech.co.th', 
        lineId: 'veera.k', plan: 'บุคคลธรรมดา', type: 'paid', status: 'รอการอนุมัติการชำระเงิน', 
        joinDate: '17 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
     { 
        id: 14, prefix: 'ดร.', firstName: 'อำนาจ', lastName: 'เจริญพร', 
        organization: 'สถาบันวิจัยไทย', position: 'นักวิจัยอาวุโส', phone: '0851112222', 
        address: '222 ถ.อโศกมนตรี แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110', email: 'umnaj.c@thairesearch.or.th', 
        lineId: 'dr.umnaj', plan: 'บุคคลธรรมดา', type: 'paid', status: 'รอการอนุมัติเอกสาร', 
        joinDate: '15 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },
    { 
        id: 15, prefix: 'นาง', firstName: 'ดวงใจ', lastName: 'รักไทย', 
        organization: '', position: '', phone: '0843334444', 
        address: '333 หมู่ 5 ต.บางเมือง อ.เมือง สมุทรปราการ 10270', email: 'duangjai.r@hotmail.com', 
        lineId: 'duangjai.rak', plan: 'บุคคลธรรมดา', type: 'paid', status: 'อนุมัติ', 
        joinDate: '14 มิ.ย. 2568', documentUrl: '/sample-document.pdf'
    },

    // --- สมาชิกฟรี (Free Members) ---
    { 
        id: 5, prefix: 'นาย', firstName: 'ปิติ', lastName: 'ยินดี', 
        organization: 'มหาวิทยาลัยไทยไอโอที', position: 'นักศึกษา', phone: '0812349876', 
        address: '11 ถ.วิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900', email: 'piti.yin@university.ac.th', 
        lineId: 'piti.y', plan: 'วิสามัญ', type: 'free', status: 'ฟรี', 
        joinDate: '24 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 6, prefix: 'นางสาว', firstName: 'สุดา', lastName: 'มาไว', 
        organization: '', position: 'ผู้สนใจ', phone: '0876541234', 
        address: '22 ถ.ลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900', email: 'suda.ma@gmail.com', 
        lineId: 'suda.m', plan: 'ผู้สนใจทั่วไป', type: 'free', status: 'ฟรี', 
        joinDate: '23 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 7, prefix: 'นาย', firstName: 'อาทิตย์', lastName: 'สดใส', 
        organization: 'โรงเรียนเตรียมวิทย์', position: 'อาจารย์', phone: '0998887776', 
        address: '33 ถ.สามเสน แขวงวชิรพยาบาล เขตดุสิต กรุงเทพฯ 10300', email: 'arthit.sod@school.ac.th', 
        lineId: 'arthit.s', plan: 'วิสามัญ', type: 'free', status: 'ฟรี', 
        joinDate: '22 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 10, prefix: 'นาย', firstName: 'เจษฎา', lastName: 'เดชดี', 
        organization: 'J-Studio', position: 'ฟรีแลนซ์', phone: '0613579246', 
        address: '66 ถ.อโศก แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110', email: 'jesada@gmail.com', 
        lineId: 'jesada.d', plan: 'ผู้สนใจทั่วไป', type: 'free', status: 'ฟรี', 
        joinDate: '19 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 11, prefix: 'นางสาว', firstName: 'กานดา', lastName: 'ชอบเรียน', 
        organization: 'มหาวิทยาลัยไทยไอโอที', position: 'นักศึกษา', phone: '0987654321', 
        address: '77 ถ.งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900', email: 'kanda.ch@university.ac.th', 
        lineId: 'kanda.c', plan: 'วิสามัญ', type: 'free', status: 'ฟรี', 
        joinDate: '18 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 13, prefix: 'นางสาว', firstName: 'สมศรี', lastName: 'เรียนดี', 
        organization: 'มหาวิทยาลัยเกษตรศาสตร์', position: 'นักศึกษา', phone: '0832221111', 
        address: '50 ถ.งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900', email: 'somsri.r@ku.th', 
        lineId: 'somsri.rian', plan: 'วิสามัญ', type: 'free', status: 'ฟรี', 
        joinDate: '16 มิ.ย. 2568', documentUrl: null 
    },
    { 
        id: 16, prefix: 'นาย', firstName: 'อดิศร', lastName: 'มุ่งมั่น', 
        organization: '', position: 'ผู้สนใจ', phone: '0869998888', 
        address: '555 ถ.ศรีนครินทร์ แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250', email: 'adisorn.m@yahoo.com', 
        lineId: 'adisorn.mungman', plan: 'ผู้สนใจทั่วไป', type: 'free', status: 'ฟรี', 
        joinDate: '13 มิ.ย. 2568', documentUrl: null
    },
];