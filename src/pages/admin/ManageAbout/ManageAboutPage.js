import React, { useState, useEffect } from 'react';
import { Container, Nav, Form, Button, Row, Col, Image, Card, Alert } from 'react-bootstrap';
import { Plus, X, TrashFill } from 'react-bootstrap-icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockAboutContent } from '../../../data/mock-about-content';
import './ManageAbout.css';
import axios from 'axios';

const SortableAboutImage = ({ item, index, onRemove, onImageChange }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.preview });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab' };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="thumbnail-item">
            <Image src={item.preview} thumbnail />
            <Button 
                variant="danger" 
                size="sm" 
                className="thumbnail-delete-btn" 
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                }}
            >
                <X size={16} />
            </Button>
        </div>
    );
};


const ManageAboutPage = () => {
    const [loading, setLoading] = useState(false);
    // ฟังก์ชันรีเฟรชข้อมูลทั้งหมด
    const fetchAllData = () => {
        axios.get('http://localhost:8000/api/association/about/')
            .then(res => {
                setAboutData({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                setAboutOriginal({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
            })
            .catch(err => console.error(err));

        axios.get('http://localhost:8000/api/association/about/images/')
            .then(res => {
                const sorted = [...res.data].sort((a, b) => a.display_order - b.display_order);
                setAboutImages(sorted.map(img => ({ file: null, preview: img.image.startsWith('http') ? img.image : `http://localhost:8000${img.image}`, id: img.id })));
            })
            .catch(err => console.error(err));

        Promise.all([
            axios.get('http://localhost:8000/api/association/association-missions/'),
            axios.get('http://localhost:8000/api/association/mission-images/')
        ]).then(([missionsRes, imagesRes]) => {
            // สำหรับ mission_index 1-4 ให้เลือก mission ที่ id สูงสุดในแต่ละกลุ่ม
            const missionsByIndex = [1,2,3,4].map(idx => {
                const group = missionsRes.data.filter(m => m.mission_index === idx);
                if (group.length === 0) return null;
                return group.reduce((max, cur) => cur.id > max.id ? cur : max, group[0]);
            });
            // mapping รูปภาพตาม display_order (id สูงสุด)
            const imagesByOrder = [0,1,2,3].map(order => {
                const imgs = imagesRes.data.filter(img => img.display_order === order);
                if (imgs.length === 0) return null;
                return imgs.reduce((max, cur) => cur.id > max.id ? cur : max, imgs[0]);
            });
            // สร้าง missionsWithImages โดย mapping mission_index กับ display_order
            const missionsWithImages = missionsByIndex.map((mission, idx) => {
                if (!mission) return { title: '', description: '', imageUrl: '' };
                const img = imagesByOrder[idx];
                let imgUrl = img?.image;
                if (imgUrl && !imgUrl.startsWith('http')) {
                    imgUrl = `http://localhost:8000${imgUrl}`;
                }
                return { ...mission, imageUrl: imgUrl || '' };
            });
            setMissionsData(missionsWithImages);
        }).catch(err => console.error('Error fetching missions/images:', err));

        axios.get('http://localhost:8000/api/association/association/vision/')
            .then(res => {
                setVisionData({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                setVisionOriginal({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                if (res.data.image) {
                    setVisionImage(prev => ({ ...prev, preview: res.data.image.startsWith('http') ? res.data.image : `http://localhost:8000${res.data.image}`, file: null }));
                } else {
                    setVisionImage({ file: null, preview: '' });
                }
            })
            .catch(err => console.error('Error fetching vision:', err));
    };
    // ฟังก์ชันลบรูป mission image
    const handleRemoveMissionImage = async (imageId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/association/mission-images/${imageId}/`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined
                },
                withCredentials: true
            });
            fetchAllData();
        } catch (err) {
            console.error('Error deleting mission image:', err);
        }
        setLoading(false);
    };
    const [isSaving, setIsSaving] = useState(false);
    // ลบรูปเกี่ยวกับสมาคมใน backend
    const handleRemoveAboutImage = async (indexToRemove) => {
        const img = aboutImages[indexToRemove];
        if (!img || !img.preview) return;
        // หา id ของรูปจาก backend
        const found = img.id ? img : null;
        if (!found) {
            // ลบแค่ใน state ถ้าไม่มี id
            setAboutImages(prev => prev.filter((_, index) => index !== indexToRemove));
            return;
        }
        if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            try {
                await axios.delete(`http://localhost:8000/api/association/about/images/${found.id}/`, {
                    withCredentials: true
                });
                // รีเฟรชข้อมูลรูปภาพใหม่
                const res = await axios.get('http://localhost:8000/api/association/about/images/');
                const sorted = [...res.data].sort((a, b) => a.display_order - b.display_order);
                setAboutImages(sorted.map(img => ({ file: null, preview: img.image.startsWith('http') ? img.image : `http://localhost:8000${img.image}`, id: img.id })));
            } catch (err) {
                alert('เกิดข้อผิดพลาดในการลบรูปภาพ');
            }
        }
    };
    // PATCH mission (ใช้รูปเดิมถ้าไม่ได้อัปโหลดใหม่)
    const handleMissionPatch = async (index) => {
        const mission = missionsData[index];
        if (!mission.id) return alert('ไม่พบ id ของพันธกิจ');
        try {
            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
            const patchData = {};
            // ส่งเฉพาะ field ที่มีการเปลี่ยนแปลง
            if (mission.title && mission.title !== mission.originalTitle) patchData.title = mission.title;
            if (mission.description && mission.description !== mission.originalDescription) patchData.description = mission.description;
            if (mission.imageId) patchData.image_id = mission.imageId;
            if (Object.keys(patchData).length === 0) {
                alert('ไม่มีข้อมูลที่เปลี่ยนแปลง');
                return;
            }
            await axios.patch(`http://localhost:8000/api/association/association-missions/${mission.id}/`, patchData, {
                headers: { 'X-CSRFToken': csrfToken },
                withCredentials: true,
            });
            alert('แก้ไขข้อมูลพันธกิจเรียบร้อย!');
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการแก้ไขพันธกิจ');
        }
    };
    const [activeTab, setActiveTab] = useState('about');
    const [aboutData, setAboutData] = useState({ title: '', description: '' });
    const [aboutOriginal, setAboutOriginal] = useState({ title: '', description: '' });
    const [aboutImages, setAboutImages] = useState([]);
    const [visionData, setVisionData] = useState({ title: '', description: '' });
const [visionOriginal, setVisionOriginal] = useState({ title: '', description: '' });
    const [visionImage, setVisionImage] = useState({ file: null, preview: '' });
    const [missionsData, setMissionsData] = useState([]);
    const [fileErrors, setFileErrors] = useState({});

    useEffect(() => {
        // ดึงข้อมูลวิสัยทัศน์จาก backend
        axios.get('http://localhost:8000/api/association/association/vision/')
            .then(res => {
                setVisionData({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                setVisionOriginal({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                if (res.data.image) {
                    setVisionImage(prev => ({ ...prev, preview: res.data.image.startsWith('http') ? res.data.image : `http://localhost:8000${res.data.image}`, file: null }));
                } else {
                    setVisionImage({ file: null, preview: '' });
                }
            })
            .catch(err => console.error('Error fetching vision:', err));
        // ดึงข้อมูลเกี่ยวกับสมาคม
        axios.get('http://localhost:8000/api/association/about/')
            .then(res => {
                setAboutData({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
                setAboutOriginal({
                    title: res.data.title || '',
                    description: res.data.description || ''
                });
            })
            .catch(err => console.error(err));

        // ดึงรูปเกี่ยวกับสมาคม
        axios.get('http://localhost:8000/api/association/about/images/')
            .then(res => {
                const sorted = [...res.data].sort((a, b) => a.display_order - b.display_order);
                setAboutImages(sorted.map(img => ({ file: null, preview: img.image.startsWith('http') ? img.image : `http://localhost:8000${img.image}`, id: img.id })));
            })
            .catch(err => console.error(err));

        // ดึงข้อมูลพันธกิจและรูปจาก backend พร้อม mapping
        Promise.all([
            axios.get('http://localhost:8000/api/association/association-missions/'),
            axios.get('http://localhost:8000/api/association/mission-images/')
        ]).then(([missionsRes, imagesRes]) => {
            // สำหรับ mission_index 1-4 ให้เลือก mission ที่ id สูงสุดในแต่ละกลุ่ม
            const missionsByIndex = [1,2,3,4].map(idx => {
                const group = missionsRes.data.filter(m => m.mission_index === idx);
                if (group.length === 0) return null;
                return group.reduce((max, cur) => cur.id > max.id ? cur : max, group[0]);
            });
            // mapping รูปภาพตาม display_order (id สูงสุด)
            const imagesByOrder = [0,1,2,3].map(order => {
                const imgs = imagesRes.data.filter(img => img.display_order === order);
                if (imgs.length === 0) return null;
                return imgs.reduce((max, cur) => cur.id > max.id ? cur : max, imgs[0]);
            });
            // สร้าง missionsWithImages โดย mapping mission_index กับ display_order
            const missionsWithImages = missionsByIndex.map((mission, idx) => {
                if (!mission) return { title: '', description: '', imageUrl: '' };
                const img = imagesByOrder[idx];
                let imgUrl = img?.image;
                if (imgUrl && !imgUrl.startsWith('http')) {
                    imgUrl = `http://localhost:8000${imgUrl}`;
                }
                return { ...mission, imageUrl: imgUrl || '' };
            });
            setMissionsData(missionsWithImages);
        }).catch(err => console.error('Error fetching missions/images:', err));
            // ดึงข้อมูลวิสัยทัศน์จาก backend
            axios.get('http://localhost:8000/api/association/association/vision/')
                .then(res => {
                    setVisionData({
                        title: res.data.title || '',
                        description: res.data.description || ''
                    });
                    if (res.data.image) {
                        setVisionImage(prev => ({ ...prev, preview: res.data.image.startsWith('http') ? res.data.image : `http://localhost:8000${res.data.image}`, file: null }));
                    } else {
                        setVisionImage({ file: null, preview: '' });
                    }
                })
                .catch(err => console.error('Error fetching vision:', err));
    }, []);
    
    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!file) return 'ไม่มีไฟล์';
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };

    const handleImageChange = (e, section, index = null) => {
        const file = e.target.files[0];
        const errorKey = section.startsWith('about') ? 'about' : section === 'missions' ? `mission-${index}` : section;
        setFileErrors(prev => ({...prev, [errorKey]: null}));
        if (!file) return;
        const error = validateFile(file);
        if (error) {
            setFileErrors(prev => ({...prev, [errorKey]: error}));
            e.target.value = null;
            return;
        }
        const newImage = { file, preview: URL.createObjectURL(file) };
        if (section === 'about-add') {
            setAboutImages(prev => [...prev, newImage].slice(0, 4));
        } else if (section === 'about-update') {
            setAboutImages(prev => {
                const updated = [...prev];
                updated[index] = newImage;
                return updated;
            });
        } else if (section === 'vision') {
            setVisionImage(newImage);
        } else if (section === 'missions') {
            const updatedMissions = [...missionsData];
            updatedMissions[index].imageUrl = newImage.preview;
            updatedMissions[index].file = newImage.file;
            setMissionsData(updatedMissions);
        }
        e.target.value = null;
    };

const handleFormSubmit = async (e, section) => {
    e.preventDefault();
    
    if (section === 'เกี่ยวกับสมาคม') {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        const csrfToken = getCookie('csrftoken');

        // PATCH เฉพาะ field ที่เปลี่ยนแปลง (เทียบกับข้อมูล backend จริง)
        const patchData = {};
        if (aboutData.title !== aboutOriginal.title) patchData.title = aboutData.title;
        if (aboutData.description !== aboutOriginal.description) patchData.description = aboutData.description;

        let changed = false;
        if (Object.keys(patchData).length > 0) {
            try {
                await axios.patch(
                    "http://localhost:8000/api/association/about/",
                    patchData,
                    {
                        headers: { "X-CSRFToken": csrfToken },
                        withCredentials: true,
                    }
                );
                changed = true;
            } catch (error) {
                console.error("Error patching about:", error);
                alert(`เกิดข้อผิดพลาดในการแก้ไขข้อมูลส่วน "${section}"`);
                return;
            }
        }

        for (let i = 0; i < aboutImages.length; i++) {
            const img = aboutImages[i];
            if (img.file) {
                const imageData = new FormData();
                imageData.append("image", img.file);
                imageData.append("display_order", i);
                if (img.id) {
                    // PATCH/PUT รูปเดิม
                    try {
                        await axios.patch(
                            `http://localhost:8000/api/association/about/images/${img.id}/`,
                            imageData,
                            {
                                headers: {
                                    "X-CSRFToken": csrfToken,
                                    "Content-Type": "multipart/form-data",
                                },
                                withCredentials: true,
                            }
                        );
                        console.log(`Image ${i + 1} patched`);
                        changed = true;
                    } catch (error) {
                        console.error(`Error patching image ${i + 1}:`, error);
                        alert(`เกิดข้อผิดพลาดในการแก้ไขรูปภาพที่ ${i + 1}`);
                        return;
                    }
                } else {
                    // POST รูปใหม่
                    try {
                        await axios.post(
                            "http://localhost:8000/api/association/about/images/upload/",
                            imageData,
                            {
                                headers: {
                                    "X-CSRFToken": csrfToken,
                                    "Content-Type": "multipart/form-data",
                                },
                                withCredentials: true,
                            }
                        );
                        console.log(`Image ${i + 1} uploaded`);
                        changed = true;
                    } catch (error) {
                        console.error(`Error uploading image ${i + 1}:`, error);
                        alert(`เกิดข้อผิดพลาดในการอัปโหลดรูปภาพที่ ${i + 1}`);
                        return;
                    }
                }
            }
        }
        let success = false;
        try {
            if (changed) {
                await fetchAllData(); // รีเฟรชข้อมูลล่าสุด
                success = true;
            }
        } catch (err) {
            // handle error
        }
        if (success) {
            alert(`บันทึกข้อมูลส่วน "${section}" เรียบร้อย!`);
            window.location.reload();
        }
        return;
    }

    if (section === 'วิสัยทัศน์') {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        const csrfToken = getCookie('csrftoken');

        // PATCH เฉพาะ field ที่เปลี่ยนแปลง + รูปภาพ
        const formVisionData = new FormData();
        let changed = false;
        if (visionData.title !== visionOriginal.title) { formVisionData.append('title', visionData.title); changed = true; }
        if (visionData.description !== visionOriginal.description) { formVisionData.append('description', visionData.description); changed = true; }
        if (visionImage.file) { formVisionData.append('image', visionImage.file); changed = true; }

        if (changed) {
            try {
                await axios.patch(
                    "http://localhost:8000/api/association/association/vision/",
                    formVisionData,
                    {
                        headers: {
                            "X-CSRFToken": csrfToken,
                            "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                    }
                );
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error("Error patching vision:", error);
                alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูลส่วน "${section}"`);
            }
        }
    }

    if (section === 'พันธกิจ') {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        const csrfToken = getCookie('csrftoken');

        // POST ข้อมูลพันธกิจ
        for (let i = 0; i < missionsData.length; i++) {
            const mission = missionsData[i];
            const formMission = new FormData();
            formMission.append("title", mission.title);
            formMission.append("description", mission.description);
            formMission.append("mission_index", i + 1);

            try {
                const res = await axios.post(
                    "http://localhost:8000/api/association/association-missions/",
                    formMission,
                    {
                        headers: {
                            "X-CSRFToken": csrfToken,
                            "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                    }
                );
                console.log(`Mission ${i + 1} saved:`, res.data);
            } catch (error) {
                console.error(`Error saving mission ${i + 1}:`, error);
                alert(`เกิดข้อผิดพลาดในการบันทึกพันธกิจที่ ${i + 1}`);
                return;
            }
        }

        for (let i = 0; i < missionsData.length; i++) {
            const mission = missionsData[i];
            if (!mission.file) continue;
            const formImage = new FormData();
            formImage.append("image", mission.file);
            formImage.append("display_order", i);
            formImage.append("caption", mission.title);

            try {
                const resImg = await axios.post(
                    "http://localhost:8000/api/association/mission-images/",
                    formImage,
                    {
                        headers: {
                            "X-CSRFToken": csrfToken,
                            "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                    }
                );
                console.log(`Mission image ${i + 1} uploaded:`, resImg.data);
            } catch (error) {
                console.error(`Error uploading mission image ${i + 1}:`, error);
                alert(`เกิดข้อผิดพลาดในการอัปโหลดรูปพันธกิจที่ ${i + 1}`);
                return;
            }
        }

        alert('บันทึกข้อมูลพันธกิจหลัก 4 ด้านเรียบร้อย!');
        window.location.reload();
        return;
    }

    // ส่วนอื่นๆ...
    alert(`บันทึกข้อมูลส่วน "${section}" เรียบร้อย!`);
};

    const removeAboutImage = (indexToRemove) => {
        if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            setAboutImages(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    const handleAboutDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setAboutImages((items) => {
                const oldIndex = items.findIndex(item => item.preview === active.id);
                const newIndex = items.findIndex(item => item.preview === over.id);
                const newArr = arrayMove(items, oldIndex, newIndex);
                // PATCH display_order ไป backend ทันทีหลัง drag
                newArr.forEach((img, idx) => {
                    if (img.id) {
                        axios.patch(
                            `http://localhost:8000/api/association/about/images/${img.id}/`,
                            { display_order: idx },
                            { withCredentials: true }
                        ).catch(err => console.error('Error updating display_order:', err));
                    }
                });
                return newArr;
            });
        }
    };
    
    const handleMissionChange = (index, field, value) => {
        const updatedMissions = [...missionsData];
        updatedMissions[index][field] = value;
        setMissionsData(updatedMissions);
    };
    
    const renderAboutForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'เกี่ยวกับสมาคม')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (ต้องมี 4 รูป, ลากเพื่อสลับตำแหน่ง)</Form.Label>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleAboutDragEnd}>
                    <SortableContext items={aboutImages.map(img => img.preview)} strategy={horizontalListSortingStrategy}>
                        <div className="thumbnail-container">
                            {aboutImages.map((img, index) => (
                                <SortableAboutImage 
                                    key={img.preview} 
                                    item={img} 
                                    index={index} 
                                    onRemove={handleRemoveAboutImage}
                                    onImageChange={(e) => handleImageChange(e, 'about-update', index)}
                                />
                            ))}
                            {aboutImages.length < 4 && (
                                <Form.Label htmlFor="about-image-add" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                            )}
                            <Form.Control id="about-image-add" type="file" onChange={(e) => handleImageChange(e, 'about-add')} hidden accept=".jpg,.png,.jpeg" />
                        </div>
                    </SortableContext>
                </DndContext>
                {fileErrors.about && <Alert variant="danger" className="mt-2 small-alert">{fileErrors.about}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={aboutData.title} onChange={(e) => setAboutData({...aboutData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={5} value={aboutData.description} onChange={(e) => setAboutData({...aboutData, description: e.target.value})} required /></Form.Group>
            
            <div className="form-actions-wrapper">
                {aboutImages.length !== 4 && (
                    <Alert variant="warning" className="text-center">
                        กรุณาอัปโหลดรูปภาพให้ครบ 4 รูปเพื่อเปิดใช้งานปุ่มบันทึก
                    </Alert>
                )}
                <div className="form-actions">
                    <Button variant="primary" type="submit" disabled={aboutImages.length !== 4}>
                        บันทึก
                    </Button>
                </div>
            </div>
        </Form>
    );

    const renderVisionForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'วิสัยทัศน์')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (ใช้รูปภาพ 1 รูป)</Form.Label>
                <Form.Label htmlFor="vision-upload" className="upload-box-square upload-box-large">
                    {visionImage.preview ? <Image src={visionImage.preview} /> : <Plus size={40} />}
                </Form.Label>
                <Form.Control id="vision-upload" type="file" onChange={(e) => handleImageChange(e, 'vision')} hidden accept=".jpg,.png,.jpeg" />
                {fileErrors.vision && <Alert variant="danger" className="mt-2 small-alert">{fileErrors.vision}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={visionData.title} onChange={(e) => setVisionData({...visionData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={3} value={visionData.description} onChange={(e) => setVisionData({...visionData, description: e.target.value})} required /></Form.Group>
            <div className="form-actions"><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    const renderMissionsForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'พันธกิจ')}>
            <Row>
                {(missionsData.length === 0 ? Array(4).fill().map(() => ({ title: '', description: '', imageUrl: '' })) : missionsData).map((mission, index) => (
                    <Col md={6} key={index} className="mb-3">
                        <Card className="mission-card h-100">
                            <Card.Body>
                                <Card.Title>พันธกิจหลักที่ {index + 1}</Card.Title>
                                    <Form.Group className="mb-3">
                                        <Form.Label>รูปภาพ</Form.Label>
                                        <Form.Label htmlFor={`mission-upload-${index}`} className="upload-box-square w-100" style={{ height: '150px' }}>
                                            {mission.imageUrl ? <Image src={mission.imageUrl} style={{width:'100%', height:'100%', objectFit: 'cover'}} /> : <Plus size={30} />}
                                        </Form.Label>
                                        <Form.Control id={`mission-upload-${index}`} type="file" onChange={(e) => handleImageChange(e, 'missions', index)} hidden accept=".jpg,.png,.jpeg" />
                                        {fileErrors[`mission-${index}`] && <Alert variant="danger" className="mt-2 small-alert">{fileErrors[`mission-${index}`]}</Alert>}
                                    </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>หัวข้อ*</Form.Label>
                                    <Form.Control type="text" value={mission.title} onChange={(e) => handleMissionChange(index, 'title', e.target.value)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>คำอธิบาย*</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={mission.description} onChange={(e) => handleMissionChange(index, 'description', e.target.value)} required />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="form-actions"><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    return (
        <Container fluid className="manage-about-page">
            <div className="page-header"><h2 className="page-title">จัดการเนื้อหาสมาคม</h2></div>
            <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item><Nav.Link eventKey="about">เกี่ยวกับสมาคม</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="vision">วิสัยทัศน์</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="missions">พันธกิจหลัก 4 ด้าน</Nav.Link></Nav.Item>
            </Nav>
            <div className="form-container">
                {activeTab === 'about' && renderAboutForm()}
                {activeTab === 'vision' && renderVisionForm()}
                {activeTab === 'missions' && renderMissionsForm()}
            </div>
        </Container>
    );
};

export default ManageAboutPage;