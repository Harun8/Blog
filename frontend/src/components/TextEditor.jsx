import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { Component } from "react";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.quillRef = null;
    this.reactQuillRef = null;
  }
  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  // attachQuillRefs = () => {
  //   if (typeof this.reactQuillRef.getEditor !== "function") return;
  //   this.quillRef = this.reactQuillRef.getEditor();
  // };

  attachQuillRefs = () => {
    if (
      this.reactQuillRef &&
      typeof this.reactQuillRef.getEditor === "function"
    ) {
      this.quillRef = this.reactQuillRef.getEditor();
    }
  };

  getText = () => {
    if (this.reactQuillRef === null) {
      this.attachQuillRefs();
      if (this.reactQuillRef === null) {
        return;
      }
    }

    const editor = this.reactQuillRef.getEditor();

    const unprivilegedEditor =
      this.reactQuillRef.makeUnprivilegedEditor(editor);
    const htmlText = unprivilegedEditor.getHTML();
    const string = unprivilegedEditor.getText();
    if (string.trim() === "") {
      return;
      this.props.onContentChange(string);
    } else {
      this.props.saveText(htmlText);
    }
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
    "align",
  ];

  render() {
    return (
      <div>
        <ReactQuill
          defaultValue={this.props.isInEditMode ? this.props.textValue : null}
          modules={this.modules}
          formats={this.formats}
          onChange={this.getText}
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
        />
      </div>
    );
  }
}

export default TextEditor;
