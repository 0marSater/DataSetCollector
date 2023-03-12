import './App.css';

import Introduction from './Components/Sections/Introduction';
import MovmentChoice from './Components/Sections/MovmentChoice';

function App() {
  const style = {
    background: `linear-gradient(rgba(91, 143, 185, 0.5), rgba(182, 234, 218, 0.5)) , url(${process.env.PUBLIC_URL}/Bimg.jpg) `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  }
  return (
    <div className="App" style={style}>
      <div className="mx-1 py-3">
      <Introduction/>
      <MovmentChoice/>
      </div>
    </div>
  );
}

export default App;
