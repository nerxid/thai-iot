import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import TiptapEditor from '../../../components/admin/from/TiptapEditor.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ManageNews.css';
import { newsData } from '../../../data/mock-news';

const NewsFormPage = () => {
    const { newsId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(newsId);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState({ file: null, preview: '' });
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [status, setStatus] = useState('เผยแพร่');
    const [scheduledAt, setScheduledAt] = useState(new Date());

    const [coverImageError, setCoverImageError] = useState('');
    const [secondaryImagesError, setSecondaryImagesError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const article = newsData.find(item => item.id.toString() === newsId);
            if (article) {
                setTitle(article.title);
                setContent(article.content);
                setStatus(article.status);
                setCoverImage({ file: null, preview: article.imageUrl });
               
            }
        }
    }, [newsId, isEditMode]);

    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
        
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `ประเภทไฟล์ไม่ถูกต้อง (อนุญาตเฉพาะ .jpg, .png, .jpeg)`;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB} MB`;
        }
        return null; 
    };

    const handleCoverImageChange = (e) => {
        setCoverImageError(''); 
        const file = e.target.files[0];

        if (file) {
            const error = validateFile(file);
            if (error) {
                setCoverImageError(error);
                e.target.value = null; 
                return;
            }
            setCoverImage({ file, preview: URL.createObjectURL(file) });
        }
    };

    const handleSecondaryImagesChange = (e) => {
        setSecondaryImagesError('');
        const files = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                if (!errors.includes(error)) {
                    errors.push(error);
                }
            } else {
                validFiles.push({ file, preview: URL.createObjectURL(file) });
            }
        });

        if (errors.length > 0) {
            setSecondaryImagesError(`พบปัญหา: ${errors.join(', ')}`);
        }
        
        setSecondaryImages(prev => [...prev, ...validFiles].slice(0, 5));
        e.target.value = null; 
    };
    
    const removeSecondaryImage = (indexToRemove) => {
        setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!coverImage.preview) {
             setCoverImageError('กรุณาอัปโหลดรูปภาพหน้าปก');
             return;
        }

        const formData = { title, content, status, scheduledAt, coverImage, secondaryImages };
        console.log("Form Data:", formData);
        alert(isEditMode ? 'แก้ไขข่าวสำเร็จ!' : 'เพิ่มข่าวสำเร็จ!');
        navigate('/admin/manage-news');
    };

    return (
        <Container fluid className="manage-news-page">
             <div className="page-header">
                 <h2 className="page-title">{isEditMode ? 'แก้ไขข่าว' : 'เพิ่มข่าว'}</h2>
             </div>

             <Form onSubmit={handleSubmit} className="news-form">
                 
                 <Form.Group className="mb-4">
                     <Form.Label>อัปโหลดรูปภาพหน้าปก*</Form.Label>
                     <p className="form-text">ใช้รูปภาพทั้งหมด 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                     <Form.Label htmlFor="cover-upload" className="upload-box-square">
                         {coverImage.preview ? <Image src={coverImage.preview} fluid /> : <Plus size={40} />}
                     </Form.Label>
                     <Form.Control 
                        id="cover-upload" 
                        type="file" 
                        onChange={handleCoverImageChange} 
                        hidden 
                        accept=".jpg,.png,.jpeg" 
                    />
                    {coverImageError && <Alert variant="danger" className="mt-2">{coverImageError}</Alert>}
                 </Form.Group>

                 <Form.Group className="mb-4">
                     <Form.Label>อัปโหลดรูปภาพรอง</Form.Label>
                     <p className="form-text">ใช้รูปภาพได้สูงสุด 5 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                      <div className="thumbnail-container">
                          {secondaryImages.map((img, index) => (
                               <div key={index} className="thumbnail-item">
                                   <Image src={img.preview} thumbnail />
                                   <Button variant="danger" size="sm" className="thumbnail-delete-btn" onClick={() => removeSecondaryImage(index)}><X size={16} /></Button>
                               </div>
                          ))}
                          {secondaryImages.length < 5 && (
                               <Form.Label htmlFor="secondary-upload" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                          )}
                           <Form.Control 
                                id="secondary-upload" 
                                type="file" 
                                onChange={handleSecondaryImagesChange} 
                                multiple 
                                hidden 
                                accept=".jpg,.png,.jpeg" 
                            />
                      </div>
                      {secondaryImagesError && <Alert variant="danger" className="mt-2">{secondaryImagesError}</Alert>}
                 </Form.Group>

                 <Form.Group className="mb-3">
                     <Form.Label>หัวข้อข่าว*</Form.Label>
                     <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                 </Form.Group>

                 <Form.Group className="mb-4">
                     <Form.Label>รายละเอียด*</Form.Label>
                     <TiptapEditor content={content} setContent={setContent} />
                 </Form.Group>
                 
                 <Row>
                     <Col md={6}>
                         <Form.Group className="mb-4">
                             <Form.Label>สถานะการเผยแพร่*</Form.Label>
                             <div>
                                 <Form.Check inline label="เผยแพร่" name="status" type="radio" value="เผยแพร่" checked={status === 'เผยแพร่'} onChange={(e) => setStatus(e.target.value)} />
                                 <Form.Check inline label="แบบร่าง" name="status" type="radio" value="แบบร่าง" checked={status === 'แบบร่าง'} onChange={(e) => setStatus(e.target.value)} />
                             </div>
                         </Form.Group>
                     </Col>
                     <Col md={6}>
                          <Form.Group className="mb-4">
                              <Form.Label>ตั้งเวลาเผยแพร่</Form.Label>
                              <div>
                                 <DatePicker selected={scheduledAt} onChange={(date) => setScheduledAt(date)} showTimeSelect dateFormat="Pp" className="form-control" />
                              </div>
                          </Form.Group>
                     </Col>
                 </Row>

                 <div className="form-actions">
                     <Button variant="secondary" type="button" onClick={() => navigate('/admin/manage-news')}>ยกเลิก</Button>
                     <Button variant="primary" type="submit">บันทึก</Button>
                 </div>

             </Form>
        </Container>
    );
};

export default NewsFormPage;