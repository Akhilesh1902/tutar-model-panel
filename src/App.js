import { BrowserRouter } from 'react-router-dom';
import Pages from './Pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <div className='App flex justify-center w-screen h-screen bg-lightGray relative'>
        <Pages />
        <button
          onClick={() => {
            window.localStorage.removeItem('tutar-panel-login-details');
          }}
          className='absolute bottom-0'>
          remove local user
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;
