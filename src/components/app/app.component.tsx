import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import from folders
import Home from '../../pages/home/home.page';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import People from '../../pages/people/people.page';
import Films from '../../pages/films/films.page';
import Vehicles from '../../pages/vehicles/vehicles.page';
import Film from '../../pages/film/film.page';
import Planet from '../../pages/planet/planet.page';

//CSS styling
import './app.component.css'; //modular style
import '../../common/styles'; //general styles

const App: React.FC = () => {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/people' element={<People />} />
          <Route path='/films' element={<Films />} />
          <Route path='/films/:id' element={<Film />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/planets/:id' element={<Planet />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
