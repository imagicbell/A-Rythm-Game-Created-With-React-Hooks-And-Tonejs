import { Provider } from 'react-redux';
import { configureStore } from '../store/index';
import LightList from './LightList';
import MusicPlay from './MusicPlay';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <LightList />
      <MusicPlay />
    </Provider>
  );
}

export default App;
