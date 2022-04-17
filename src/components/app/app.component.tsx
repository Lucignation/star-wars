import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import from folders
import Home from '../../pages/home/home.page';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import People from '../../pages/people/people.page';
import Films from '../../pages/films/films.page';

//CSS styling
import './app.component.css';
import '../../common/styles';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/people' element={<People />} />
          <Route path='/films' element={<Films />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
