import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Home';
import Easy from './pages/Easy';
import Medium from './pages/Medium';
import Hard from './pages/Hard';
import Extreme from './pages/Extreme';
import Footer from './components/Footer';
import HighScores from './pages/HighScores';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './utils/store';
import { Provider } from 'react-redux';
import { useState } from 'react';

function App() {
	const [selectedLink, setSelectedLink] = useState('/');
	console.log(selectedLink);
	return (
		<Router>
			<div className="App">
				<Provider store={store}>
					<Header selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
					<main className='site-content bottom-buffer-40-20'>
						{selectedLink === '/' && <Homepage selectedLink={selectedLink} setSelectedLink={setSelectedLink} />}
						{selectedLink === '/easy' && <Easy setSelectedLink={setSelectedLink} />}
						{selectedLink === '/medium' && <Medium setSelectedLink={setSelectedLink} />}
						{selectedLink === '/hard' && <Hard setSelectedLink={setSelectedLink} />}
						{selectedLink === '/extreme' && <Extreme setSelectedLink={setSelectedLink} />}
						{selectedLink === '/high_scores' && <HighScores />}
							{/* <Route exact path='/' element={<Homepage />} />
							<Route path='/easy' element={<Easy />} />
							<Route path='/medium' element={<Medium />} />
							<Route path='/hard' element={<Hard />} />
							<Route path='/extreme' element={<Extreme />} />
							<Route path='/high_scores' element={<HighScores />} /> */}
					</main>
					<Footer />
				</Provider>
			</div>
		</Router>
	);
}

export default App;
