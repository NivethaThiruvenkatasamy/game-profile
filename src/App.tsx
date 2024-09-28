
import { Provider } from 'react-redux';
import './App.css';
import { LeftPanel } from './components/LeftPanel/LeftPanel';
import store from './store';
import { RightPanel } from './components/RightPanel/RightPanel';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <div className='left-pane'>
         <LeftPanel/>
        </div>
        <div className='right-pane'>
         <RightPanel/>
        </div>
      </Provider>
    </div>
  );
}

export default App;
