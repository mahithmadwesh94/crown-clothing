import './categories.styles.scss'
import Home from '../src/routes/home/home.component';
import { Route, Routes } from 'react-router';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './components/authentication/authentication.component';
import Shop from './routes/shop/shop.component';

const App = () => {





  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
      <Route index element={<Home/>} />
      <Route path='shop' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
