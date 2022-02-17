import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Home';
import Easy from './pages/Easy';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './utils/store';
import { Provider } from 'react-redux';

function App() {
	return (
		<Router>
			<div className="App">
				<Provider store={store}>
					<Header />
					<main className='site-content'>
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route path='/easy' element={<Easy />} />
						</Routes>
					</main>
				</Provider>
			</div>
		</Router>
	);
}

export default App;
