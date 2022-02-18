import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Home';
import Easy from './pages/Easy';
import Medium from './pages/Medium';
import Hard from './pages/Hard';
import Extreme from './pages/Extreme';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './utils/store';
import { Provider } from 'react-redux';

function App() {
	return (
		<Router>
			<div className="App">
				<Provider store={store}>
					<Header />
					<main className='site-content bottom-buffer-40-20'>
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route path='/easy' element={<Easy />} />
							<Route path='/medium' element={<Medium />} />
							<Route path='/hard' element={<Hard />} />
							<Route path='/extreme' element={<Extreme />} />
						</Routes>
					</main>
					<Footer />
				</Provider>
			</div>
		</Router>
	);
}

export default App;
