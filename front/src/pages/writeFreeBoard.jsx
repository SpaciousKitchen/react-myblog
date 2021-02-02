import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useHistory } from 'react-router-dom';

import AppLayout from 'components/common/AppLayout';

import {
  GlobalStyle,
  InputStyled,
  ButtonSstyled,
  WriteContainer,
} from 'styles/style';
import { fetchAddPost } from 'reducers/freeboard';

const WriteFreeBoard = () => {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [subjectState, setSubjectState] = useState('');

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
      fetchAddPost({
        content: editTextHtml,
        subject: subjectState,
      }),
    );

    history.push('/freeboard');
  };

  const onChangeSubject = (e) => {
    setSubjectState(e.target.value);
  };
  return (
    <>
      <AppLayout>
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
      </AppLayout>
    </>
  );
};
export default WriteFreeBoard;
