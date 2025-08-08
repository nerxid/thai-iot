// src/components/TiptapEditor.js

// อิพอร์ตสิ่งที่จำเป็นจากไลบรารี Tiptap และ React
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import './Tiptap.css'; // อิมพอร์ตไฟล์ CSS สำหรับจัดสไตล์ Editor (เราจะต้องสร้างไฟล์นี้เอง)

// --- Component: MenuBar ---
// คอมโพเนントนี้ทำหน้าที่เป็นแถบเครื่องมือสำหรับจัดรูปแบบข้อความ
const MenuBar = ({ editor }) => {
  // ถ้า editor ยังไม่พร้อมใช้งาน (เช่น กำลังโหลด) ให้ return null เพื่อไม่แสดงผลอะไร
  if (!editor) {
    return null
  }

  // ส่งคืน JSX ที่เป็นแถบเครื่องมือ (Menu Bar)
  return (
    <div className="tiptap-menu-bar">
      {/* ปุ่มแต่ละปุ่มจะมีการทำงานคล้ายๆ กัน:
        - onClick: เรียกใช้คำสั่งของ editor เช่น toggleBold() เพื่อทำตัวหนา
        - chain().focus()...run(): เป็นรูปแบบมาตรฐานในการเรียกใช้คำสั่ง เพื่อให้ editor กลับมา focus ที่เดิมหลังกดปุ่ม
        - disabled: เช็คว่าสามารถใช้คำสั่งนี้ได้หรือไม่ (เช่น ไม่สามารถทำตัวหนาใน code block ได้) ปุ่มจะถูกปิดการใช้งานถ้าทำไม่ได้
        - className: เพิ่มคลาส 'is-active' เมื่อ cursor อยู่ในบริเวณที่ใช้สไตล์นั้นๆ อยู่แล้ว เพื่อเปลี่ยนหน้าตาปุ่มให้รู้ว่ากำลังใช้งานอยู่
      */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
        Bold
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
        Italic
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
        Strike
      </button>
      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
        Paragraph
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        H1
      </button>
       <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
        Bullet list
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
        Ordered list
      </button>
    </div>
  )
}


// --- Component: TiptapEditor ---
// นี่คือคอมโพเนนต์หลักของ Editor ที่จะถูกนำไปใช้งาน
// รับ props:
// - content: ข้อมูล HTML เริ่มต้นที่จะแสดงใน Editor
// - setContent: ฟังก์ชันสำหรับอัปเดต state ของ Parent Component เมื่อเนื้อหามีการเปลี่ยนแปลง
const TiptapEditor = ({ content, setContent }) => {
  //ใช้ useEditor hook ของ Tiptap เพื่อสร้างและจัดการ instance ของ editor
  const editor = useEditor({
    // extensions: คือส่วนเสริมต่างๆ ที่จะให้ editor ใช้งานได้
    // StarterKit เป็นแพ็กเกจพื้นฐานที่รวมส่วนเสริมที่ใช้บ่อยๆ มาให้แล้ว (เช่น bold, italic, paragraph, heading)
    extensions: [
      StarterKit,
    ],
    // content: กำหนดเนื้อหาเริ่มต้นที่จะแสดงใน editor โดยรับมาจาก props
    content: content,
    // onUpdate: คือฟังก์ชันที่จะถูกเรียกทุกครั้งที่เนื้อหาใน editor มีการเปลี่ยนแปลง
    onUpdate: ({ editor }) => {
        // เมื่อมีการอัปเดต ให้เรียก getHTML() เพื่อดึงข้อมูลล่าสุดในรูปแบบ HTML
        // แล้วส่งค่านี้กลับไปให้ Parent Component ผ่านฟังก์ชัน setContent ที่รับมาทาง props
        setContent(editor.getHTML());
    },
    // editorProps: สำหรับการกำหนด attributes เพิ่มเติมให้กับ element ของ editor
    editorProps: {
        attributes: {
          // เพิ่ม class 'tiptap-prose' เพื่อให้เราสามารถเขียน CSS จัดสไตล์เฉพาะส่วนที่พิมพ์ได้
          class: 'tiptap-prose',
        },
    },
  })
    useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])
  // ส่งคืน JSX ที่ประกอบกันเป็น Editor ที่สมบูรณ์
  return (
    <div className="tiptap-container">
      {/* แสดงผล MenuBar และส่ง editor instance ไปให้ */}
      <MenuBar editor={editor} />
      {/* แสดงผลพื้นที่สำหรับพิมพ์เนื้อหา และส่ง editor instance ไปให้ */}
      <EditorContent editor={editor} />
    </div>
  )
}

// ส่งออก TiptapEditor component เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default TiptapEditor;