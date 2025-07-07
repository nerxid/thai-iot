import React, { useState, useMemo, createRef, useRef } from 'react';
import { Container, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { BsPlusLg, BsTrashFill, BsCameraFill, BsGripVertical } from 'react-icons/bs';
import { ReactSortable } from "react-sortablejs";
import './ManageCommittee.css';

const initialCommitteeData = [
    { id: 1, name: "ดร.สุทัด ครองชนม์", title: "นายกสมาคม", tier: 1, imageUrl: "https://www.thaiiot.org/wp-content/uploads/elementor/thumbs/S__9773340-ql92394o1pih74r2dxhe1inm5vlj02gcl6h7nsce2o.jpg" },
    { id: 2, name: "นายเขมรัฐ โชคมั่งมี", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534938.jpg" },
    { id: 3, name: "นายอภิรัตน์ หวานชะเอม", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534943.jpg" },
    { id: 4, name: "นายชาญศิลป์ ม้าทอง", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453051.jpg" },
    { id: 5, name: "ว่าที่ รต.อาคม ไทยเจริญ", title: "เลขาธิการสมาคม", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453045.jpg" },
    { id: 6, name: "นายการุณ หงษ์สืบชาติ", title: "กรรมการบริหารและเหรัญญิก", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453052.jpg" },
    { id: 7, name: "นายธีรพัฒน์ ทองสุโชติ", title: "กรรมการบริหารและสาราณียกร", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453047.jpg" },
    { id: 8, name: "นายเทวัน ส่งเสริมสกุลสุข", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453050.jpg" },
    { id: 9, name: "ผศ.ดร.พงศ์ศรัณย์ บุญโญปกรณ์", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534941.jpg" },
    { id: 10, name: "ดร.สุรชัย ทองแก้ว", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534940.jpg" },
    { id: 11, name: "ดร.วโรดม คำแผ่นชัย", title: "กรรมการบริหารและพัฒนาเครือข่าย", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534948.jpg" },
    { id: 12, name: "นายไทเยนทร์ รัตนวิจารณ์", title: "กรรมการบริหารและพัฒนาเครือข่าย", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453049.jpg" },
    { id: 13, name: "นายธนัทเมศร์ โชติกีรติศาสตร์", title: "กรรมการบริหารและประชาสัมพันธ์", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453048.jpg" },
];

const ManageCommitteePage = () => {
    const [committeeMembers, setCommitteeMembers] = useState(initialCommitteeData);
    const [description, setDescription] = useState('วาระปี 2567 - 2569');
    const [availableTiers, setAvailableTiers] = useState([1, 2, 3, 4, 5]);
    const [newTierValue, setNewTierValue] = useState('');
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberTitle, setNewMemberTitle] = useState('');
    const [newMemberTier, setNewMemberTier] = useState(5);
    const [newMemberImagePreview, setNewMemberImagePreview] = useState('');
    const newMemberImageInputRef = useRef(null);

    const fileInputRefs = useMemo(() => committeeMembers.reduce((acc, member) => {
        acc[member.id] = createRef();
        return acc;
    }, {}), [committeeMembers]);

     const handleDeleteTier = (tierToDelete) => {
        if (groupedMembers[tierToDelete] && groupedMembers[tierToDelete].length > 0) {
            alert(`ไม่สามารถลบลำดับขั้นที่ ${tierToDelete} ได้ เนื่องจากยังมีสมาชิกอยู่`);
            return;
        }
        if (window.confirm(`คุณต้องการลบลำดับขั้นที่ ${tierToDelete} ใช่หรือไม่?`)) {
            setAvailableTiers(availableTiers.filter(t => t !== tierToDelete));
        }
    };

    const groupedMembers = useMemo(() => {
        const grouped = availableTiers.reduce((acc, tier) => {
            acc[tier] = committeeMembers.filter(m => m.tier === tier);
            return acc;
        }, {});
        return grouped;
    }, [committeeMembers, availableTiers]);

    const handleSortEnd = (sortedList, tier) => {
        const otherTiersMembers = committeeMembers.filter(m => m.tier !== tier);
        setCommitteeMembers([...otherTiersMembers, ...sortedList]);
    };

    const handleMemberChange = (id, field, value) => {
        const newValue = (field === 'tier') ? Number(value) : value;
        setCommitteeMembers(committeeMembers.map(member => 
            member.id === id ? { ...member, [field]: newValue } : member
        ));
    };

    const handleDeleteMember = (id) => {
        if (window.confirm('คุณต้องการลบสมาชิกคนนี้ใช่หรือไม่?')) {
            setCommitteeMembers(committeeMembers.filter(member => member.id !== id));
        }
    };

    const handleMemberImageChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setCommitteeMembers(committeeMembers.map(member => 
                member.id === id ? { ...member, imageUrl: URL.createObjectURL(file) } : member
            ));
        }
    };

    const handleNewMemberImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewMemberImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleAddMember = () => {
        if (!newMemberName || !newMemberTitle || !newMemberImagePreview) {
            alert('กรุณากรอกข้อมูลและเลือกรูปภาพสำหรับสมาชิกใหม่');
            return;
        }
        const newMember = {
            id: Date.now(),
            name: newMemberName,
            title: newMemberTitle,
            imageUrl: newMemberImagePreview,
            tier: newMemberTier,
        };
        setCommitteeMembers([...committeeMembers, newMember]);
        setNewMemberName('');
        setNewMemberTitle('');
        setNewMemberTier(Math.max(...availableTiers, 0));
        setNewMemberImagePreview('');
        if(newMemberImageInputRef.current) {
            newMemberImageInputRef.current.value = "";
        }
    };
    
    const handleSaveChanges = () => {
        console.log("Saving data (sorted):", { description, committeeMembers });
        alert('บันทึกการเปลี่ยนแปลงสำเร็จ!');
    };

     const handleAddNewTier = () => {
        const tierNumber = Number(newTierValue);
        if (!tierNumber || tierNumber <= 0) {
            alert('กรุณาใส่ลำดับขั้นที่ต้องการเพิ่มเป็นตัวเลขที่มากกว่า 0');
            return;
        }
        if (availableTiers.includes(tierNumber)) {
            alert(`ลำดับขั้นที่ ${tierNumber} มีอยู่แล้ว`);
            return;
        }
        setAvailableTiers([...availableTiers, tierNumber].sort((a,b) => a-b));
        setNewTierValue('');
    };
    

    return (
        <Container fluid className="manage-events-page manage-committee-page">
            <div className="page-header"><h2 className="page-title">จัดการคณะกรรมการ</h2></div>
            <div className="list-container">
                <Form.Group className="mb-4">
                    <Form.Label>คำอธิบาย</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                 <div className="tier-management-section">
                    <Form.Label>จัดการลำดับขั้น</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type="number" 
                            placeholder="เพิ่มลำดับขั้นใหม่ (เช่น 6)"
                            value={newTierValue}
                            onChange={(e) => setNewTierValue(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={handleAddNewTier}>
                            + เพิ่มขั้น
                        </Button>
                    </InputGroup>
                    <Form.Text>ลำดับขั้นที่มีอยู่ตอนนี้: {availableTiers.join(', ')}</Form.Text>
                </div>
                <hr />

                {Object.entries(groupedMembers).map(([tier, members]) => (
                    <div key={tier} className="tier-group-container">
                        <div className="tier-title-container">
                            <h3 className="tier-title">ลำดับขั้นที่ {tier}</h3>
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDeleteTier(Number(tier))}
                                disabled={members.length > 0}
                                title={members.length > 0 ? 'ต้องลบสมาชิกทั้งหมดในขั้นนี้ก่อน' : 'ลบลำดับขั้น'}
                            >
                                <BsTrashFill />
                            </Button>
                        </div>

                        <ReactSortable
                            list={members}
                            setList={(sortedList) => handleSortEnd(sortedList, Number(tier))}
                            className="committee-grid"
                            animation={200}
                            handle=".drag-handle"
                        >
                            {members.map(member => (
                                <div key={member.id} className="committee-member-card">
                                     <span className="drag-handle"><BsGripVertical /></span>
                                    <Button variant="light" size="sm" className="delete-member-btn" onClick={() => handleDeleteMember(member.id)}><BsTrashFill /></Button>
                                    <div className="image-upload-container" onClick={() => fileInputRefs[member.id]?.current?.click()}>
                                        <Image src={member.imageUrl} className="member-image" />
                                        <div className="overlay"><BsCameraFill /></div>
                                        <Form.Control type="file" ref={fileInputRefs[member.id]} onChange={(e) => handleMemberImageChange(member.id, e)} accept="image/*" hidden />
                                    </div>
                                    <Form.Control className="name-input mb-2" value={member.name} onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)} />
                                    <Form.Control className="title-input mb-3" value={member.title} onChange={(e) => handleMemberChange(member.id, 'title', e.target.value)} />
                                    <Form.Select className="custom-form-select" value={member.tier} onChange={(e) => handleMemberChange(member.id, 'tier', e.target.value)}>
                                        {availableTiers.map(t => <option key={t} value={t}>Tier {t}</option>)}
                                    </Form.Select>
                                </div>
                            ))}
                        </ReactSortable>
                    </div>
                ))}
                
                <div className="tier-group-container">
                    <h3 className="tier-title">เพิ่มสมาชิกใหม่</h3>
                    <div className="committee-grid">
                        <div className="add-member-card">
                            <Form.Label htmlFor="new-member-upload" className="upload-box">
                                {newMemberImagePreview ? <Image src={newMemberImagePreview} className="member-image" /> : <BsPlusLg size={40} />}
                            </Form.Label>
                            <Form.Control id="new-member-upload" type="file" ref={newMemberImageInputRef} onChange={handleNewMemberImageChange} accept="image/*" hidden />
                            <Form.Control type="text" placeholder="ชื่อ-นามสกุล" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} />
                            <Form.Control type="text" placeholder="ตำแหน่ง" value={newMemberTitle} onChange={(e) => setNewMemberTitle(e.target.value)} className="mt-2" />
                            <Form.Select className="custom-form-select mt-2" value={newMemberTier} onChange={(e) => setNewMemberTier(Number(e.target.value))}>
                                {availableTiers.map(t => <option key={t} value={t}>Tier {t}</option>)}
                            </Form.Select>
                            <Button variant="primary" className="w-100 mt-3" onClick={handleAddMember}>เพิ่มสมาชิก</Button>
                        </div>
                    </div>
                 </div> 
            </div>
            
            <div className="form-actions-footer">
                <Button variant="secondary">ยกเลิก</Button>
                <Button variant="primary" onClick={handleSaveChanges}>บันทึกการเปลี่ยนแปลง</Button>
            </div>
        </Container>
    );
};

export default ManageCommitteePage;