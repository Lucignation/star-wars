import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import from folders
import Home from '@/pages/home/home.page';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import People from '@/pages/people/people.page';
import Films from '@/pages/films/films.page';
import Vehicles from '@/pages/vehicles/vehicles.page';
import Film from '@/pages/film/film.page';
import Planet from '@/pages/planet/planet.page';
import StarShips from '@/pages/starships/starships.page';
import StarShip from '@/pages/starship/starship.page';
import PeoplePage from '@/pages/peoplePage/poeplePage.page';
import Favorites from '@/pages/favorites/favorites.page';

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
          <Route path='/starships' element={<StarShips />} />
          <Route path='/starships/:id' element={<StarShip />} />
          <Route path='/people/:id' element={<PeoplePage />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
