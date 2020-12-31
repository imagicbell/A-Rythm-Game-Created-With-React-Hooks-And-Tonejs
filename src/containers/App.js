import { Provider } from 'react-redux';
import { configureStore } from '../store/index';
import Playboard from '../components/Playboard';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Playboard />
    </Provider>
  );
}

export default App;
