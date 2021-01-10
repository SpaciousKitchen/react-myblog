import React, { useState } from 'react';
import MenuLayout from '../Components/MenuLayout';

const Main = () => {
  const [state, setstate] = useState('');
  return (
    <>
      <MenuLayout>
        <h1>Main</h1>
      </MenuLayout>
    </>
  );
};
export default Main;
