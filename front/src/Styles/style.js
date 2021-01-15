import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
.editor-class{
  height:500px;
  @media only screen and (max-width: 768px) {
      height:300px;
   }
}
`;

export const WriteContainer = styled.div`
  border: 1px solid #f1f1f1;
  padding: 10px;
  margin-top: 5px;
`;
export const InputStyled = styled.input`
  border: 1px solid #f1f1f1;
  height: 34px;
  width: 50%;
  border-radius: 3px;
  font-size: 1rem;
  color: #5f5f5f;
  box-shadow: none;
`;

export const ButtonSstyled = styled.button`
  margin-top: 5px;

  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: 1px solid #f1f1f1;
  color: rgba(0, 0, 0, 0.54);
  height: 34px;

  border-radius: 4px;
  padding: 0px 1.25rem;
`;
