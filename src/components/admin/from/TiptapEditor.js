// src/components/TiptapEditor.js
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import './Tiptap.css'; // เราจะสร้างไฟล์ CSS นี้ต่อไป

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="tiptap-menu-bar">
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

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
    },
    editorProps: {
        attributes: {
          class: 'tiptap-prose',
        },
    },
  })

  return (
    <div className="tiptap-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor;