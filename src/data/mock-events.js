export const rawEventsData = [
  {
    id: 1,
    title: 'Smart Solution for all manufacturing',
    start: '2025-07-29', 
    end: '2025-07-29',
    publishStatus: 'เผยแพร่',
    registrantCount: 20,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00001_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg",
    summary: 'สายอุตสาหกรรมห้ามพลาด! งานสัมมนาด้าน IoT หัวข้อ Smart Solution for all manufacturing จัดโดยสมาคมไทยไอโอทีและบริษัทพันธมิตร',
    content: '<h2>ขอเรียนเชิญสมาชิกสมาคมไทยไอโอที ผู้ประกอบการภาคอุตสาหกรรม ผู้บริหารฝ่ายผลิต ร่วมงานสัมมนาด้าน IoT หัวข้อ Smart Solution for all manufacturing จัดโดยสมาคมไทยไอโอทีและบริษัทพันธมิตร วันที่ 29 กรกฎาคม 2568 ที่โรงแรมนิกโก้ อมตะซิตี้ ชลบุรี รีบลงทะเบียนก่อนที่นั่งจะเต็ม</p>',
     details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
   formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 2,
    title: 'I² Starter Kit',
    start: '2025-06-28',
    end: '2025-06-29', 
    publishStatus: 'เผยแพร่',
    registrantCount: 35,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-0001_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-0001-1024x1024.jpg",
    summary: 'Short course – I² Starter Kit 12 ชม. เตรียมพร้อมสำหรับการเป็นมืออาชีพ Train The Trainer โดยคุณปิยวัฒน์ จอมสถาน นักวิจัยจาก NECTEC',
    content: '<h2>รายละเอียดกิจกรรม I² Starter Kit</h2><p>ข่าวดีสำหรับสมาชิกสมาคมไทยไอโอที สมาชิกสามารถเข้าร่วมอบรมในราคาพิเศษเพียง 2,200 บาท (จำกัด 2 คนต่อสมาชิก 1 ราย)</p>',
    details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 3,
    title: 'I²-Starter Kit – Demo Day 2025',
    start: '2025-06-20',
    end: '2025-06-20',
    publishStatus: 'แบบร่าง',
    registrantCount: 0,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/05/20250527-01_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/05/20250527-03_edited-1024x576.jpg",
    summary: 'ดร.สุทัด ครองชนม์ นายกสมาคมไทยไอโอที ร่วมเสวนางาน I²-Starter Kit – Demo Day 2025 ที่จัดขึ้นเมื่อวันที่ 27 พฤษภาคม 2568 SYN HUB Incubation Center SYNHUB Digi-Tech Community โดยมีวัตถุประสงค์เพื่อนำเสนอศักยภาพของชุดอุปกรณ์ I²-Starter Kit ซึ่งเป็นนวัตกรรมการเรียนรู้ด้าน Industrial Internet of Things (IIoT) ที่พัฒนาโดย เนคเทค สวทช. ผลิตและจัดจำหน่ายโดย บริษัท ซีนเนอร์ยี่ เทคโนโลยี (SYNTECH) โตไปกับ I²',
    content: '<h2>งาน I²-Starter Kit – Demo Day 2025 SYN HUB Incubation Center SYNHUB Digi-Tech Community เพื่อนำเสนอศักยภาพของชุดอุปกรณ์ I²-Starter Kit</h2><p>ดร.สุทัด ครองชนม์ นายกสมาคมไทยไอโอที ร่วมเสวนางาน I²-Starter Kit – Demo Day 2025 ที่จัดขึ้นเมื่อวันที่ 27 พฤษภาคม 2568 SYN HUB Incubation Center SYNHUB Digi-Tech Community โดยมีวัตถุประสงค์เพื่อนำเสนอศักยภาพของชุดอุปกรณ์ I²-Starter Kit ซึ่งเป็นนวัตกรรมการเรียนรู้ด้าน Industrial Internet of Things (IIoT) ที่พัฒนาโดย เนคเทค สวทช. ผลิตและจัดจำหน่ายโดย บริษัท ซีนเนอร์ยี่ เทคโนโลยี (SYNTECH) โตไปกับ I²</p>',
   details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 4,
    title: 'ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM',
    start: '2025-05-30',
    end: '2025-05-30',
    publishStatus: 'เผยแพร่',
    registrantCount: 25,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01-1024x1024.jpg",
    summary: 'อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI',
    content: '<h2>อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</h2><p>สมาคมไทยไอโอทีขอเชิญชวนสมาชิก และผู้สนใจสมัครเข้าร่วมอบรมโครงการดี ๆ ที่เพิ่งเปิดรับสมัครอีกครั้ง ACC PROGRAM 2 ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</p>',
    details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 5,
    title: 'ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM',
    start: '2025-05-30',
    end: '2025-05-30',
    publishStatus: 'เผยแพร่',
    registrantCount: 15,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01-1024x1024.jpg",
    summary: 'อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI',
    content: '<h2>อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</h2><p>สมาคมไทยไอโอทีขอเชิญชวนสมาชิก และผู้สนใจสมัครเข้าร่วมอบรมโครงการดี ๆ ที่เพิ่งเปิดรับสมัครอีกครั้ง ACC PROGRAM 2 ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</p>',
    details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 6,
    title: 'ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM',
    start: '2025-05-30',
    end: '2025-05-30',
    publishStatus: 'เผยแพร่',
    registrantCount: 5,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01-1024x1024.jpg",
    summary: 'อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI',
    content: '<h2>อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</h2><p>สมาคมไทยไอโอทีขอเชิญชวนสมาชิก และผู้สนใจสมัครเข้าร่วมอบรมโครงการดี ๆ ที่เพิ่งเปิดรับสมัครอีกครั้ง ACC PROGRAM 2 ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</p>',
    details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
  {
    id: 7,
    title: 'ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM',
    start: '2025-05-30',
    end: '2025-05-30',
    publishStatus: 'แบบร่าง',
    registrantCount: 0,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01_edited-1024x576.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2025/05/20250516-01-1024x1024.jpg",
    summary: 'อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI',
    content: '<h2>อบรมโครงการดี ๆ ACC PROGRAM 2 – ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</h2><p>สมาคมไทยไอโอทีขอเชิญชวนสมาชิก และผู้สนใจสมัครเข้าร่วมอบรมโครงการดี ๆ ที่เพิ่งเปิดรับสมัครอีกครั้ง ACC PROGRAM 2 ARI CORPORATE COACHING PROGRAM หลักสูตรเข้มข้นเพื่อเร่งสร้าง Tech Talent ด้านธุรกิจ DIGITAL และ AI</p>',
 details: `
            
            <p>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ได้ดำเนินโครงการ ๑ ตำบล ๑ ดิจิทัล (One Tambon One Digital: OTOD#2) ใน ๕ </p>
            <p>ภูมิภาคทั่วประเทศ ประกอบด้วย ภาคเหนือ ภาคตะวันออกเฉียงเหนือ ภาคกลาง ภาคตะวันออก และภาคใต้ </p>
            <p>เพื่อส่งเสริมและสนับสนุนให้เกิดการยกระดับทักษะด้าน Digital Agriculture</p>
            <p>ที่ส่งเสริมการประยุกต์ใช้บริการดิจิทัลที่เกี่ยวข้องกับภาคการเกษตร </p>
            <p>และเพิ่มโอกาสในการเข้าถึงการประยุกต์ใช้บริการดิจิทัลของกลุ่มชุมชน เกษตรกร ช่างชุมชนและกลุ่มอื่นๆ ที่เกี่ยวข้องด้านการเกษตร </p>
            <p>ให้สามารถใช้บริการดิจิทัลการเกษตรได้อย่างมีประสิทธิภาพตั้งแต่กระบวนการเพาะปลูก ดูแลรักษา และจัดการผลผลิต</p>
            <p>ตลอดจนสามารถวิเคราะห์ข้อมูลที่เกี่ยวข้องกับการเกษตรเพื่อการตัดสินใจที่แม่นยำ  นั้น</p>
            <p>ในการนี้ สำนักงานส่งเสริมเศรษฐกิจดิจิทัล มีกำหนดการจัดเสวนาในกิจกรรม Digital Agriculture Final Pitching Day</p>
            <p>รอบตัดสิน ภายใต้โครงการดังกล่าว ระหว่างวันที่ ๕ – ๖ สิงหาคม ๒๕๖๘ ณ ห้องวายุภักษ์ ๓ - ๔ ชั้น ๔ เซ็นทารา ไลฟ์ </p>
            <p>ศูนย์ราชการแจ้งวัฒนะ ซึ่งสำนักงานฯ ได้พิจารณาแล้ว </p>
            <p>เห็นว่าท่านเป็นผู้มีความรู้และมีประสบการณ์อันจะเป็นประโยชน์แก่ผู้เข้าร่วมกิจกรรมฯ ได้เป็นอย่างด</p>
            <p>จึงใคร่ขอเรียนเชิญท่านร่วมเป็นวิทยากรเสวนาในกิจกรรมฯ โดยมีกำหนดการปรากฏตามสิ่งที่ส่งมาด้วย ทั้งนี้ </p>
            <p>กรุณาส่งแบบตอบรับภายในวันศุกร์ที่ ๑๑ กรกฎาคม ๒๕๖๘ โดยขอมอบหมายให้ นางสาวพิชยา กาทอง โทรศัพท์ ๐๘ ๔๔๘๔ ๐๔๙๐ </p>
            <p>เป็นผู้ประสานงานในรายละเอียดต่างๆ ต่อไป</p>

            
            
           
        `,
        posterImages: [
            'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg',
            'https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg',
        ],
    formFields: [
            { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
            { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
            { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
            { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน*', type: 'text', required: true },
            { id: 'position', label: 'ตำแหน่ง*', type: 'text', required: true },
            { id: 'email', label: 'อีเมล (สำหรับติดต่อกลับ)*', type: 'email', required: true },
            { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
            { id: 'foodType', label: 'ประเภทอาหาร', type: 'radio', options: ['ทั่วไป', 'มังสวิรัติ', 'อิสลาม'], required: false },
            { id: 'foodAllergy', label: 'อาหารที่แพ้', type: 'text', required: false },
            { id: 'contact', label: 'ช่องทางการติดต่ออื่นๆ*', type: 'text', required: true },
            { 
              id: 'eventDates', 
              label: 'วันที่เข้าร่วมกิจกรรม*', 
              type: 'checkbox', 
              options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
              required: true 
            },
        ]
  },
 {
    id: 8, 
    title: 'Thai IoT Expo 2025 - Booth Registration',
    type: 'booth', 
    restrictedTo: 'corporate', 
    start: '2025-09-15', 
    end: '2025-09-18',
    publishStatus: 'เผยแพร่',
    registrantCount: 12,
    imageUrl: 'https://www.thaiiot.org/wp-content/uploads/2022/09/90525189.jpg',
    fullImageUrl: "https://www.thaiiot.org/wp-content/uploads/2022/09/90525189.jpg",
    summary: 'โอกาสสำหรับสมาชิกนิติบุคคลในการจัดแสดงสินค้าและบริการในงาน Thai IoT Expo ประจำปี 2025 เปิดลงทะเบียนเพื่อจองพื้นที่บูธแล้ววันนี้!',
    details: `
        <h4><b>เกี่ยวกับงาน Thai IoT Expo 2025</b></h4>
        <p>งานจัดแสดงนวัตกรรมและเทคโนโลยี Internet of Things ที่ใหญ่ที่สุดในประเทศ เปิดโอกาสให้ผู้ประกอบการได้พบปะกับลูกค้าและพันธมิตรทางธุรกิจ</p>
        <h4><b>ข้อกำหนดเบื้องต้น</b></h4>
        <ul>
            <li>สงวนสิทธิ์สำหรับสมาชิกประเภทนิติบุคคลเท่านั้น</li>
            <li>กรุณากรอกข้อมูลเกี่ยวกับบริษัทและเจ้าหน้าที่ให้ครบถ้วน</li>
            <li>เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันการลงทะเบียน</li>
        </ul>
    `,
    posterImages: [
      'https://www.thaiiot.org/wp-content/uploads/2025/06/20250529-00002-724x1024.jpg',
        'https://www.thaiiot.org/wp-content/uploads/2022/09/90525189.jpg',
    ],
    formFields: [
        { id: 'prefix', label: 'คำนำหน้า*', type: 'select', options: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ...'], required: true },
        { id: 'firstName', label: 'ชื่อ*', type: 'text', required: true },
        { id: 'lastName', label: 'นามสกุล*', type: 'text', required: true },
        { id: 'company', label: 'ชื่อบริษัท/หน่วยงาน', type: 'text', required: false },
        { id: 'position', label: 'ตำแหน่ง', type: 'text', required: false },
        { id: 'phone', label: 'เบอร์โทรศัพท์*', type: 'tel', required: true },
        { id: 'email', label: 'อีเมล*', type: 'email', required: true },
        { id: 'otherContact', label: 'ช่องทางการติดต่ออื่นๆ', type: 'text', required: false },
        { id: 'staffCount', label: 'จำนวนเจ้าหน้าที่ในบูธ*', type: 'number', required: true },
        { 
          id: 'eventDates', 
          label: 'วันที่เข้าร่วมกิจกรรม*', 
          type: 'checkbox', 
          options: ['28 พฤษภาคม 2568', '29 พฤษภาคม 2568'], 
          required: true 
        },
    ]
  },
];