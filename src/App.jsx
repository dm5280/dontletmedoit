import React from 'react';
import { Helmet } from "react-helmet";

import Header from './components/Header';
import Home from './components/Home';

import './components/styles/global.css';

function App() {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang : 'en' }}
      >
          <title>dontletmedoit</title>
          <meta name="description" content="description" />
          <meta name="keywords" content="keywords" />
          <meta name="robots" content="index, follow" />

          <meta property="og:title" content="title" />
          <meta property="og:description" content="description" />
          <meta property="og:image" content="https://" />
          <meta property="og:url" content="https://" />

          <meta name="twitter:title" content="title" />
          <meta name="twitter:description" content="description" />
          <meta name="twitter:url" content="https://" />
          <meta name="twitter:card" content="description" />
      </Helmet>
      <Header/> 
      <Home/>
    </>
  )
}

export default App;