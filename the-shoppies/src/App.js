import './App.scss';
import Application from './components/Application/Application'
import UserProvider from './providers/UserProvider';

export const App = () => {
  return (
      <UserProvider>
          <Application />
      </UserProvider>
  );
}

export default App;
