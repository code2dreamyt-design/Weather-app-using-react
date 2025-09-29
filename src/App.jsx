// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Main from './comps/Main';

const App = () => {
  const api_key = 'pk.7f0f1db6d4a6780d7474b2968c4a4e05'
  return (
    <>
    <Main api_key={api_key}></Main>
    </>
  )
}

export default App;
