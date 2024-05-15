import './App.css'
import "tailwindcss/tailwind.css"
import {BrowserRouter} from "react-router-dom";
import Home from './components/Home';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
