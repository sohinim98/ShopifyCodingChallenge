import logo from './logo.svg';
import './App.scss';
import Search from './components/Search/Search'

export const App = () => {
  return (
      <section className="main">
        <h1 className="main--header">The Shoppies</h1>
        <Search />
      </section>
  );
}

export default App;
