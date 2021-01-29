import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../Components/AppLayout';
import {
  REQUEST_ADD_POST,
  SUCCESS_ADD_POST,
  FAIL_ADD_POST,
} from '../modules/actions.js';
import {
  GlobalStyle,
  InputStyled,
  ButtonSstyled,
  WriteContainer,
} from '../Styles/style.js';

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
    console.log('go', editTextHtml);

    dispatch({
      type: REQUEST_ADD_POST,
    });
    axios
      .post('/post/addpost', {
        content: editTextHtml,
        subject: subjectState,
      })
      .then((res) => {
        console.log('제대로옵!!');
        console.log(res.data);
        dispatch({ type: SUCCESS_ADD_POST, data: res.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: FAIL_ADD_POST, error });
      });

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
