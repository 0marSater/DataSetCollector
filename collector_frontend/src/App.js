import './App.css';
import NavBar from './Components/Sections/NavBar/NavBar';
import Introduction from './Components/Sections/Introduction';
import MovmentChoice from './Components/Sections/MovmentChoice/MovmentChoice'
import Footer from './Components/Sections/Footer/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Introduction />
      <MovmentChoice />
      <Footer />
    </div>
  );
}

export default App;
