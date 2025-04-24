import { editor } from "@/types/editor";
import { Editor as EditorTinymce } from "@tinymce/tinymce-react";

const Editor = ({ onChange, value }: editor) => {
    return(
        <EditorTinymce
        onEditorChange={onChange}
        value={value}
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
        init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        >
        </EditorTinymce>
    )
}

export default Editor;