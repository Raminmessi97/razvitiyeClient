import { Suspense } from 'react';
import { lazy } from 'react';
import {Loadable} from "./sessionRoutes";


const Profile = Loadable(lazy(()=>import("../src/views/Profile")));

const otherRoutes = [
    { path: '/profile', element: <Profile /> },
];


export default otherRoutes;