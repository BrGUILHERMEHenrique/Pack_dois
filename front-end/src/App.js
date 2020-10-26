import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/index'
import Routes from './routes';
import Footer from './components/Footer/index'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header /> 
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
