import Header from '@components/Header';
import './App.css';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
