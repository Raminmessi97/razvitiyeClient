import sessionRoutes from "./sessionRoutes";
import AuthGuard from "./AuthGuard";
import otherRoutes from "./otherRoutes";

const routes = [
    {
      element: (
        <AuthGuard/>
      ),
      children: [...otherRoutes],
    },
    ...sessionRoutes,
    // { path: '/', element: <Navigate to="dashboard/default" /> },
    // { path: '*', element: <NotFound /> },
  ];
  
  export default routes;
  