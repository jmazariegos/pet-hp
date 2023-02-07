import './App.css';
import Calculator from './components/Calculator'

function App() {
    return (
        <div id='app'>
            <div id='title'>
                <h1>PET HP CALCULATOR</h1>
                <a href='https://www.polygon.com/videos/2019/9/9/20849172/unraveled-how-to-calculate-pet-hp-hit-points'>
                    (using the formula by BDG)
                </a>
            </div>
            <Calculator/>
        </div>
  );
}

export default App;
