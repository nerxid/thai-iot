import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';
const validateFile = (file) => {
    const MAX_SIZE_MB = 1;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
    if (!file) return 'กรุณาอัปโหลดรูปภาพ';
    if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
    return null;
};

const ProfilePage = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate();
    
    const [profileData, setProfileData] = useState({
        prefix: '',
        firstName: '',
        lastName: '',
        companyName: '',
        position: '',
        address: '',
        phone: '',
        email: '',
        lineId: '',
        membershipType: '',
    });
    
    const [customPrefix, setCustomPrefix] = useState('');
    const [avatar, setAvatar] = useState({
        file: null,
        preview: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (!user?.id) return;
                
                setLoading(true);
                function getCookie(name) {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(';').shift();
                }
                const csrfToken = getCookie('csrftoken');

                const response = await axios.get(`http://localhost:8000/api/accounts/me/`,
                    {
                        headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    }
                );

                const data = response.data;
                
                setProfileData({
                    prefix: data.prefix || 'นาย',
                    firstName: data.firstName || user.first_name || '',
                    lastName: data.lastName || user.last_name || '',
                    companyName: data.orgname || '',
                    position: data.position || '',
                    address: data.address || '',
                    phone: data.phone || '',
                    email: user.email || '',
                    lineId: data.line_id || '',
                    membershipType: data.membership_type || user.membership_type || '',
                });
                
                if (data.profileImage) {
                    setAvatar(prev => ({
                        ...prev,
                        preview: data.profileImage
                    }));
                }
                
            } catch (err) {
                console.error('Failed to fetch profile data:', err);
                setError('ไม่สามารถโหลดข้อมูลโปรไฟล์ได้');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfileData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuccessMessage(''); 
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));

        if (name === 'prefix' && value !== 'อื่นๆ') {
            setCustomPrefix('');
        }
        
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setProfileData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }));
        } else {
            setProfileData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        setSuccessMessage('');
        const file = e.target.files[0];
        setFormErrors(prev => ({...prev, avatar: null}));

        if (!file) return;

        const error = validateFile(file);
        if (error) {
            setFormErrors(prev => ({...prev, avatar: error}));
            e.target.value = null;
            return;
        }
        setAvatar({ file: file, preview: URL.createObjectURL(file) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        const newErrors = {};

        const requiredFields = ['prefix', 'firstName', 'lastName', 'companyName', 'position', 'address', 'phone', 'lineId'];
        requiredFields.forEach(field => {
            if (!profileData[field]?.trim()) {
                newErrors[field] = 'กรุณากรอกข้อมูล';
            }
        });
        if (profileData.prefix === 'อื่นๆ' && !customPrefix.trim()) {
            newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';
        }

        if (profileData.phone && profileData.phone.length !== 10) {
            newErrors.phone = 'หมายเลขโทรศัพท์ต้องมี 10 หลัก';
        }
        
        if (!avatar.preview) {
            newErrors.avatar = 'กรุณาอัปโหลดรูปโปรไฟล์';
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const formData = new FormData();
                const dataToSubmit = { 
                    ...profileData, 
                    prefix: profileData.prefix === 'อื่นๆ' ? customPrefix : profileData.prefix 
                };
                
                // Add all fields to FormData
                Object.keys(dataToSubmit).forEach(key => {
                    formData.append(key, dataToSubmit[key]);
                });
                
                // Add image file if it exists
                if (avatar.file) {
                    formData.append('profileImage', avatar.file);
                }
                
                const response = await axios.put(`/api/users/${user.id}/profile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                setSuccessMessage('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว');
                window.scrollTo(0, 0);
                
                // Update preview if new image was uploaded
                if (response.data.profileImage) {
                    setAvatar(prev => ({
                        file: null,
                        preview: response.data.profileImage
                    }));
                }
                
            } catch (err) {
                console.error('Failed to update profile:', err);
                setError('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        }
    };

    if (loading) {
        return (
            <div className="profile-page-container">
                <Container className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">กำลังโหลดข้อมูล...</p>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page-container">
                <Container>
                    <Alert variant="danger">{error}</Alert>
                    <Button variant="secondary" onClick={() => window.location.reload()}>ลองอีกครั้ง</Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="profile-page-container">
            <Container>
                <h1 className="profile-page-title">แก้ไข Profile</h1>
                
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form noValidate onSubmit={handleSubmit} className="profile-form-card">
                    <div className="profile-picture-section">
                        <Image src={avatar.preview} roundedCircle className="profile-image" />
                        <Form.Group controlId="profileImageUpload" className="mb-3">
                            <Form.Label className="profile-image-change-btn">เปลี่ยนรูปภาพ</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={handleImageChange} 
                                accept=".jpg,.png,.jpeg" 
                            />
                        </Form.Group>
                        {formErrors.avatar && <div className="d-block invalid-feedback text-center">{formErrors.avatar}</div>}
                    </div>

                    <Row className="g-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>คำนำหน้า*</Form.Label>
                                <Form.Select 
                                    name="prefix" 
                                    value={profileData.prefix} 
                                    onChange={handleChange} 
                                    isInvalid={!!formErrors.prefix}
                                >
                                    <option value="">เลือก...</option>
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                    <option value="อื่นๆ">อื่นๆ...</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{formErrors.prefix}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {profileData.prefix === 'อื่นๆ' && (
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>ระบุคำนำหน้า*</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={customPrefix} 
                                        onChange={(e) => setCustomPrefix(e.target.value)} 
                                        placeholder="เช่น ดร., ผศ." 
                                        isInvalid={!!formErrors.customPrefix} 
                                    />
                                    <Form.Control.Feedback type="invalid">{formErrors.customPrefix}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        )}
                        <Col md={profileData.prefix === 'อื่นๆ' ? 3 : 5}>
                            <Form.Group>
                                <Form.Label>ชื่อ*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="firstName" 
                                    value={profileData.firstName} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.firstName} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={profileData.prefix === 'อื่นๆ' ? 4 : 5}>
                            <Form.Group>
                                <Form.Label>นามสกุล*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="lastName" 
                                    value={profileData.lastName} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.lastName} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>ชื่อบริษัท*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="companyName" 
                                    value={profileData.companyName} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.companyName} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.companyName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>ตำแหน่ง*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="position" 
                                    value={profileData.position} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.position} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.position}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>ที่อยู่*</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    name="address" 
                                    value={profileData.address} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.address} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>หมายเลขโทรศัพท์*</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    name="phone" 
                                    value={profileData.phone} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.phone} 
                                    maxLength="10" 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>E-mail (ไม่สามารถแก้ไขได้)</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    value={profileData.email} 
                                    readOnly 
                                    disabled 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Line-ID*</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="lineId" 
                                    value={profileData.lineId} 
                                    onChange={handleChange} 
                                    required 
                                    isInvalid={!!formErrors.lineId} 
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.lineId}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr className="my-4" />
                    <Row className="g-3 align-items-end">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>ประเภทการเป็นสมาชิก</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={profileData.membershipType} 
                                    disabled 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>ใบหนังสือรับรอง</Form.Label>
                                <Button 
                                    as="a" 
                                    href="/mock-document.pdf" 
                                    target="_blank" 
                                    variant="outline-secondary" 
                                    className="w-100"
                                >
                                    ดูหนังสือรับรอง
                                </Button>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value="************" 
                                    disabled 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Button 
                                variant="secondary" 
                                className="w-100" 
                                onClick={() => navigate('/change-password')}
                            >
                                เปลี่ยนรหัสผ่าน
                            </Button>
                        </Col>
                    </Row>
                    <hr className="my-4" />
                   <div className="profile-form-actions">
                        <Button variant="outline-primary" onClick={() => navigate('/change-plan')}>
                            เปลี่ยนแผนสมาชิก
                        </Button>
                        <div>
                            <Button variant="secondary" as={Link} to="/" className="me-2">ยกเลิก</Button>
                            <Button variant="primary" type="submit">บันทึก</Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default ProfilePage;