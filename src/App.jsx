import React from 'react';
import { Helmet } from "react-helmet";

import Header from './components/Header';
import Home from './components/Home';

import './components/styles/global.css';

const injectGA = () => {
  if (typeof window == 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-15487RWJJC');
};

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
          
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-15487RWJJC"
          />
          <script>{injectGA()}</script>
      </Helmet>
      <Header/> 
      <Home/>
    </>
  )
}

export default App;