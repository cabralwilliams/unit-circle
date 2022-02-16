import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<main className='site-content'>

				</main>
			</div>
		</Router>
	);
}

export default App;
