import React from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './router';
import { BrowserRouter as Router,useRoutes} from 'react-router-dom';
import { AuthProvider } from './jwtAuthContext';
import { Provider } from 'react-redux';
import {store} from "./store"

function App() {
  const content = useRoutes(routes)
  // console.log(content);
  
  // return (
  //   <Router>
  //      <AuthProvider>{content}</AuthProvider>
  //   </Router>
  // );
  return content;
}


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
          <AuthProvider>
                <App />
          </AuthProvider>
      </Router>
    </Provider>
  );
};

export default AppWrapper;
// export default App;
