import React, { useState, useCallback } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload, BsFileEarmarkText, BsDownload } from 'react-icons/bs';

// ฟังก์ชันสำหรับสร้างและดาวน์โหลดไฟล์เทมเพลต CSV
const downloadTemplate = () => {
    const headers = "FullName,Email,JoinDate,Plan,Status,Phone,Organization";
    const exampleRow = "User test,test.u@example.com,2025-07-15,บุคคลธรรมดา,อนุมัติ,0123456789,ExampleCompany";
    const csvContent = "data:text/csv;charset=utf-8,"
    + "\uFEFF" 
    + headers + "\n" + exampleRow;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "member_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


const ImportMembersModal = ({ show, onHide }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [importResult, setImportResult] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        // รับเฉพาะไฟล์แรกที่ถูกต้อง
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setImportResult(null); // เคลียร์ผลลัพธ์เก่าเมื่อมีไฟล์ใหม่
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
        },
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setImportResult(null);

        // --- ส่วนนี้คือการจำลองการส่งข้อมูลไป Backend ---
        // จะต้องใช้ `fetch` หรือ `axios` เพื่อส่ง `file`
        // ไปยัง API Endpoint ของ Backend
        console.log("Simulating upload for file:", file.name);

        // จำลองการรอผลลัพธ์จาก Backend (เช่น 2 วินาที)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // จำลองผลลัพธ์ที่ได้จาก Backend
        const mockResult = {
            success: true,
            message: "นำเข้าข้อมูลสำเร็จ 95 รายการ มีข้อผิดพลาด 5 รายการ",
            details: "คุณสามารถดาวน์โหลดรายงานข้อผิดพลาดเพื่อตรวจสอบ"
        };
        setImportResult(mockResult);
        // --- จบส่วนจำลอง ---

        setIsUploading(false);
        setFile(null); // เคลียร์ไฟล์หลังอัปโหลด
    };

    const handleClose = () => {
        setFile(null);
        setImportResult(null);
        setIsUploading(false);
        onHide();
    }

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Import สมาชิกจากไฟล์ CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body className="import-modal-body">
                <p>
                    เพื่อนำเข้าข้อมูลได้อย่างถูกต้อง กรุณาใช้ไฟล์เทมเพลตของเรา
                    <span onClick={downloadTemplate} className="template-download-link ms-2">
                         <BsDownload /> ดาวน์โหลดเทมเพลตที่นี่
                    </span>
                </p>

                <div {...getRootProps()} className={`upload-drop-zone ${isDragActive ? 'is-active' : ''}`}>
                    <input {...getInputProps()} />
                    <BsCloudUpload className="upload-icon" />
                    {isDragActive ?
                        <p className="lead">วางไฟล์ที่นี่...</p> :
                        <p className="lead">ลากไฟล์ .csv มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                    }
                </div>

                {file && !isUploading && (
                    <div className="file-info">
                        <BsFileEarmarkText size={24} />
                        <span>ไฟล์ที่เลือก: <strong>{file.name}</strong></span>
                    </div>
                )}
                
                {importResult && (
                    <Alert variant={importResult.success ? 'success' : 'danger'} className="import-results">
                        <Alert.Heading>{importResult.success ? 'Import สำเร็จ!' : 'พบข้อผิดพลาด'}</Alert.Heading>
                        <p>{importResult.message}</p>
                        {importResult.details && <p className="mb-0">{importResult.details}</p>}
                    </Alert>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>ยกเลิก</Button>
                <Button 
                    variant="primary" 
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                >
                    {isUploading ? 'กำลังนำเข้า...' : 'อัปโหลดและนำเข้าข้อมูล'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportMembersModal;