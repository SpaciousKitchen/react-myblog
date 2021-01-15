import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import styled from 'styled-components';
import AppLayout from '../Components/AppLayout';

import { REQUEST_ADD_POST } from '../modules/actions.js';

const WriteContainer = styled.div`
  border: 1px solid #f1f1f1;
  padding: 10px;
`;
const WriteFreeBoard = () => {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [subjectState, setSubjectState] = useState('');

  const dispatch = useDispatch();

  const onEditorStateChange = (edit) => {
    seteditorState(edit);
  };
  const onClickSubmit = () => {
    dispatch({
      type: REQUEST_ADD_POST,
      data: {
        content: convertToHTML(editorState.getCurrentContent()),
        subject: subjectState,
      },
    });
  };
  const onChangeSubject = (e) => {
    setSubjectState(e.target.value);
  };

  return (
    <>
      <AppLayout>
        <div style={{ padding: '20px' }}>
          <input
            style={{ border: '1px solid #f1f1f1' }}
            value={subjectState}
            onChange={onChangeSubject}
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

          <Button onClick={onClickSubmit}>제출</Button>
        </div>
      </AppLayout>
    </>
  );
};
export default WriteFreeBoard;
