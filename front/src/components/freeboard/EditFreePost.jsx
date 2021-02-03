import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { useHistory } from 'react-router-dom';
import {
  GlobalStyle,
  InputStyled,
  ButtonSstyled,
  WriteContainer,
} from 'styles/style';
import { fetchEditPost } from 'reducers/freeboard';

const EditFreeBoard = ({ post }) => {
  const [editorState, seteditorState] = useState(
    EditorState.createWithContent(convertFromHTML(post.content)),
  );
  const [subjectState, setSubjectState] = useState(post.subject);
  // 기존 post에 있던 내용으로 초기화

  const dispatch = useDispatch();
  const history = useHistory();
  const onEditorStateChange = (edit) => {
    seteditorState(edit);
  };

  const onClickSubmit = () => {
    const editTextHtml = convertToHTML(editorState.getCurrentContent());
    if (!subjectState.trim()) {
      alert('제목을 입력하세요!');
      return;
    }
    dispatch(
      fetchEditPost({
        id: post.id,
        content: editTextHtml,
        subject: subjectState,
      }),
    );

    history.push(`/freecontent/${post.id}`);
  };

  const onChangeSubject = (e) => {
    setSubjectState(e.target.value);
  };
  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '50px' }}>
        <InputStyled
          value={subjectState}
          onChange={onChangeSubject}
          placeholder="제목을 입력하세요"
          maxLength="30"
        />

        <WriteContainer>
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
        </WriteContainer>

        <ButtonSstyled onClick={onClickSubmit}>제출</ButtonSstyled>
      </div>
    </>
  );
};
export default EditFreeBoard;
