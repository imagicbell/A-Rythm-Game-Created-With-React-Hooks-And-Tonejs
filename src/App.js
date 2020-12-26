import './App.css';
import { loadMidiFromUrl } from './services/midiLoader';

loadMidiFromUrl(process.env.PUBLIC_URL + '/midiFiles/Analogsynth2_highmp3.mid');

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
