import { BrowserRouter } from 'react-router-dom';
import Pages from './Pages';

function App() {
  return (
    <BrowserRouter>
      <div className='App flex justify-center w-screen h-screen bg-lightGray relative'>
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
