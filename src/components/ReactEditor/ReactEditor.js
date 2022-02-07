    import {Editor} from "react-draft-wysiwyg";
import React from "react";

export default function ReactEditor({onChange, value, height}) {
    return (
        <Editor
            editorState={value}
            onEditorStateChange={onChange}
            editorStyle={{border: "1px solid #C0C0C0", minHeight: height ?? 360, maxHeight: height ?? 360}}
        />
    )
}