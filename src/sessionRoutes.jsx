import { Suspense } from 'react';
import { lazy } from 'react';


function Loading(){
    return(
        <h1>LOAFING</h1>
    )
}

export const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

const JwtLogin = Loadable(lazy(()=>import("../src/views/sessions/login")));
const JwtRegister = Loadable(lazy(()=>import("../src/views/sessions/register")));
const Favourites = Loadable(lazy(()=>import("../src/views/favourites/Favourites")));
const Home = Loadable(lazy(()=>import("../src/views/Home")));

const sessionRoutes = [
    { path: '/session/signup', element: <JwtRegister /> },
    { path: '/session/signin', element: <JwtLogin /> },
    { path: '/favourites', element: <Favourites /> },
    { path: '/home', element: <Home /> }
];


export default sessionRoutes;