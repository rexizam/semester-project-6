// ** React Imports
import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

// ** Redux Imports
import { Provider } from 'react-redux';
import { store } from './redux/storeConfig/store';

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from './utility/context/ThemeColors';

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner';

// ** Ripple Button
import './@core/components/ripple-button';

// ** PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx.min';

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss';

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css';
import './@core/scss/core.scss';
import './assets/scss/style.scss';

// ** Realm-Web
import * as Realm from 'realm-web';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorker from './serviceWorker';

new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });

const queryClient = new QueryClient();

// ** Lazy load app
const LazyApp = lazy(() => import('./App').then(({ default: LazyApp }) => ({ default: LazyApp })));

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <LazyApp />
          <ToastContainer newestOnTop />
        </ThemeContext>
      </Suspense>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();