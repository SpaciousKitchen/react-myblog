import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { useHistory } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import AppLayout from 'components/common/AppLayout';
import { fetchFeedAddPost } from 'reducers/feedboard';
import {
  GlobalStyle,
  InputStyled,
  ButtonSstyled,
  WriteContainer,
} from 'styles/style';
import { fetchAddPost } from 'reducers/freeboard';
import axios from 'axios';
import * as config from '../../config';

const WriteBoard = ({ match }) => {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [subjectState, setSubjectState] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const onEditorStateChange = (edit) => {
    seteditorState(edit);
  };

  const onClickSubmit = () => {
    const editTextHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    if (!subjectState.trim()) {
      alert('제목을 입력하세요!');
      return;
    }

    if (match.params.postname === 'feedpost') {
      dispatch(
        fetchFeedAddPost({
          content: editTextHtml,
          subject: subjectState,
        }),
      );
      history.push('/feedboard');
    } else {
      dispatch(
        fetchAddPost({
          content: editTextHtml,
          subject: subjectState,
        }),
      );
      history.push('/freeboard');
    }
  };

  const onChangeSubject = (e) => {
    setSubjectState(e.target.value);
  };

  const uploadImageCallBack = async (file) => {
    const formData = new FormData();
    formData.append('img', file);
    const response = await axios.post(`${config.baseUrl}/post/image`, formData);
    const imageObject = {
      file,
      imgSrc: `${config.baseUrl}/images/${response.data.filename}`,
    };
    return new Promise((resolve) => {
      resolve({ data: { link: imageObject.imgSrc } });
    });
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
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: uploadImageCallBack,
                  previewImage: true,
                },
              }}
            />
          </WriteContainer>

          <ButtonSstyled onClick={onClickSubmit}>제출</ButtonSstyled>
        </div>
      </AppLayout>
    </>
  );
};
export default WriteBoard;
