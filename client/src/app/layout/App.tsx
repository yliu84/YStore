import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './LoadingComponent';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import Catalog from '../../features/catalog/Catalog';
import NotFound from '../errors/NotFound';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import HomePage from '../../features/home/HomePage';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import ProductDetails from '../../features/catalog/ProductDetails';
import ServerError from '../errors/ServerError';
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from '../../features/basket/BasketPage';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent message='Initialising app...' />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Container sx={{ mt: 4 }}>
            <Switch>
              <Route exact path='/catalog' component={Catalog} />
              <Route path='/catalog/:id' component={ProductDetails} />
              <Route path='/about' component={AboutPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/server-error' component={ServerError} />
              <Route path='/basket' component={BasketPage} />
              {/* <PrivateRoute path='/checkout' component={CheckoutWrapper} /> */}
              {/* <PrivateRoute path='/orders' component={Orders} /> */}
              {/* <PrivateRoute
                roles={['Admin']}
                path='/inventory'
                component={Inventory}
              /> */}
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        )}
      />
    </ThemeProvider>
  );
}

export default App;
