import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
import { Plus, X } from "react-bootstrap-icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TiptapEditor from "../../../components/admin/from/TiptapEditor.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManageNewsAndEvents.css";
import { newsData } from "../../../data/mock-news";
import axios from "axios";
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const csrfToken = getCookie("csrftoken");
const SortableSecondaryImage = ({ image, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.preview });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="thumbnail-item"
    >
      <Image src={image.preview} thumbnail />
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

const NewsFormPage = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(newsId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState({ file: null, preview: "" });
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [status, setStatus] = useState("เผยแพร่");
  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [formErrors, setFormErrors] = useState({});

useEffect(() => {
  const fetchNewsData = async () => {
    if (isEditMode && newsId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/content/posts/${newsId}/`
        );
        const article = response.data;
        
        console.log('ข้อมูลที่ได้จาก API:', article);

        // ตั้งค่าข้อมูลพื้นฐาน
        setTitle(article.title);
        setContent(article.content);
        setStatus(article.is_published ? "เผยแพร่" : "แบบร่าง");
        setScheduledAt(new Date(article.published_at));

        // ตั้งค่ารูปภาพหน้าปก
        if (article.cover_image) {
          setCoverImage({
            file: null,
            preview: article.cover_image
          });
        }

        // ตั้งค่ารูปภาพรอง (ถ้ามี)
        if (article.images && article.images.length > 0) {
          setSecondaryImages(
            article.images.map((img) => ({
              id: img.id, // <-- เพิ่ม id ของรูปภาพ
              file: null,
              preview: img.image
            }))
          );
        } else {
          setSecondaryImages([]);
        }

      } catch (error) {
        console.error('ดึงข้อมูลไม่สำเร็จ:', error);
        if (error.response?.status === 404) {
          alert('ไม่พบข่าวที่ต้องการแก้ไข');
          navigate('/admin/manage-news');
        }
      }
    }
  };

  fetchNewsData();
}, [newsId, isEditMode, navigate]);

  const validateFile = (file) => {
    const MAX_SIZE_MB = 1;
    const ALLOWED_TYPES = ["image/jpeg", "image/png"];
    if (!ALLOWED_TYPES.includes(file.type))
      return "ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น";
    if (file.size > MAX_SIZE_MB * 1024 * 1024)
      return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
    return null;
  };

  const handleCoverImageChange = (e) => {
    setFormErrors((prev) => ({ ...prev, coverImage: null }));
    const file = e.target.files[0];
    if (!file) return;
    const error = validateFile(file);
    if (error) {
      setFormErrors((prev) => ({ ...prev, coverImage: error }));
      e.target.value = null;
      return;
    }
    setCoverImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleSecondaryImagesChange = (e) => {
    setFormErrors((prev) => ({ ...prev, secondaryImages: null }));
    const files = Array.from(e.target.files);
    const validFiles = [];
    const errors = [];
    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        if (!errors.includes(error)) errors.push(error);
      } else {
        validFiles.push({ file, preview: URL.createObjectURL(file) });
      }
    });
    if (errors.length > 0)
      setFormErrors((prev) => ({
        ...prev,
        secondaryImages: errors.join(", "),
      }));
    setSecondaryImages((prev) => [...prev, ...validFiles].slice(0, 5));
    e.target.value = null;
  };

  const removeSecondaryImage = async (indexToRemove) => {
  if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
    const imageToRemove = secondaryImages[indexToRemove];
    
    // แยกการจัดการระหว่างรูปใหม่และรูปเก่า
    if (imageToRemove.file) {
      // รูปใหม่ที่ยังไม่ได้อัปโหลด (ไม่มี id) - ลบจาก state ได้เลย
      setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
    } else {
      // รูปเก่าที่มีอยู่ในระบบ (มี id) - ต้องเรียก API ลบ
      try {
        const csrfToken = getCookie('csrftoken');
        await axios.delete(
          `http://localhost:8000/api/content/post-images/${imageToRemove.id}/`,
          {
            headers: {
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        
        // ลบออกจาก state หลังจากลบจากเซิร์ฟเวอร์สำเร็จ
        setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
        alert('ไม่สามารถลบรูปภาพได้ กรุณาลองอีกครั้ง');
      }
    }
  }
};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSecondaryImages((items) => {
        const oldIndex = items.findIndex((item) => item.preview === active.id);
        const newIndex = items.findIndex((item) => item.preview === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const csrfToken = getCookie("csrftoken");
  const is_published = status === "เผยแพร่";

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", "news");
    formData.append("published_at", scheduledAt.toISOString());
    formData.append("is_published", is_published);

    // เพิ่ม cover image ถ้ามีการอัปโหลดใหม่
    if (coverImage.file) {
      formData.append("cover_image", coverImage.file);
    }

    let response;
    if (isEditMode) {
      // โหมดแก้ไข - ใช้ PUT
      response = await axios.put(
        `http://localhost:8000/api/content/posts/${newsId}/`,
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
    } else {
      // โหมดสร้างใหม่ - ใช้ POST
      response = await axios.post(
        "http://localhost:8000/api/content/posts/",
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
    }

    const postId = response.data.id || newsId;

    // อัปโหลดรูปภาพรอง (เฉพาะไฟล์ใหม่เท่านั้น)
    for (let i = 0; i < secondaryImages.length; i++) {
      const img = secondaryImages[i];
      if (img.file) { // เฉพาะรูปที่อัปโหลดใหม่
        const imageForm = new FormData();
        imageForm.append("image", img.file);
        imageForm.append("caption", "");
        imageForm.append("display_order", i + 1);
        imageForm.append("post", postId);

        await axios.post(
          "http://localhost:8000/api/content/post-images/",
          imageForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
          }
        );
      }
    }

    alert(`บันทึกข่าว${isEditMode ? 'แก้ไข' : 'ใหม่'}สำเร็จ!`);
    navigate('/admin/manage-news');

  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    if (error.response?.data) {
      console.error("รายละเอียดข้อผิดพลาด:", error.response.data);
      alert(`เกิดข้อผิดพลาด: ${JSON.stringify(error.response.data)}`);
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  }
};

  return (
    <Container fluid className="manage-news-page p-0">
      <div className="content-wrapper p-3 p-md-4">
        <Container fluid className="manage-news-page">
          <div className="page-header">
            <h2 className="page-title">
              {isEditMode ? "แก้ไขข่าว" : "เพิ่มข่าว"}
            </h2>
          </div>

          <Form
            noValidate
            onSubmit={handleSubmit}
            className="news-form"
            encType="multipart/form-data"
          >
            <Form.Group className="mb-4">
              <Form.Label>อัปโหลดรูปภาพหน้าปก*</Form.Label>
              <p className="form-text">
                ใช้ 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB
              </p>
              <Form.Label
                htmlFor="cover-upload"
                className={`upload-box-square ${
                  formErrors.coverImage ? "is-invalid" : ""
                }`}
              >
                {coverImage.preview ? (
                  <Image src={coverImage.preview} fluid />
                ) : (
                  <Plus size={40} />
                )}
              </Form.Label>
              <Form.Control
                id="cover-upload"
                type="file"
                onChange={handleCoverImageChange}
                hidden
                accept=".jpg,.png,.jpeg"
              />
              {formErrors.coverImage && (
                <Alert variant="danger" className="mt-2">
                  {formErrors.coverImage}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                อัปโหลดรูปภาพรอง (สูงสุด 5 รูป, ลากเพื่อสลับตำแหน่ง)
              </Form.Label>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={secondaryImages.map((img) => img.preview)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="thumbnail-container">
                    {secondaryImages.map((img, index) => (
                      <SortableSecondaryImage
                        key={img.preview}
                        image={img}
                        index={index}
                        onRemove={removeSecondaryImage}
                      />
                    ))}
                    {secondaryImages.length < 5 && (
                      <Form.Label
                        htmlFor="secondary-upload"
                        className="thumbnail-upload-box"
                      >
                        <Plus size={24} />
                      </Form.Label>
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
                </SortableContext>
              </DndContext>
              {formErrors.secondaryImages && (
                <Alert variant="danger" className="mt-2">
                  {formErrors.secondaryImages}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>หัวข้อข่าว*</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!formErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>รายละเอียด*</Form.Label>
              <div className={formErrors.content ? "tiptap-is-invalid" : ""}>
                <TiptapEditor content={content} setContent={setContent} />
              </div>
              {formErrors.content && (
                <div className="d-block invalid-feedback">
                  {formErrors.content}
                </div>
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>สถานะการเผยแพร่*</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="เผยแพร่"
                      name="status"
                      type="radio"
                      value="เผยแพร่"
                      checked={status === "เผยแพร่"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label="แบบร่าง"
                      name="status"
                      type="radio"
                      value="แบบร่าง"
                      checked={status === "แบบร่าง"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>ตั้งเวลาเผยแพร่</Form.Label>
                  <div>
                    <DatePicker
                      selected={scheduledAt}
                      onChange={(date) => setScheduledAt(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      className="form-control"
                      portalId="datepicker-portal"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="form-actions">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate("/admin/manage-news")}
              >
                ยกเลิก
              </Button>
              <Button variant="primary" type="submit">
                บันทึก
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </Container>
  );
};

export default NewsFormPage;
