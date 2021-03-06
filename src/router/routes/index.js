import { lazy } from 'react';

// ** Default Route
const DefaultRoute = '/featured-movies';

// ** Merge Routes
const Routes = [
  {
    path: '/featured-movies',
    component: lazy(() => import('../../views/featuredMovies/FeaturedMovies').then(({ default: FeaturedMovies }) => ({ default: FeaturedMovies }))),
  },
  {
    path: '/popular-movies',
    component: lazy(() => import('../../views/popularMovies/PopularMovies').then(({ default: PopularMovies }) => ({ default: PopularMovies }))),
  },
  {
    path: '/search-movies',
    component: lazy(() => import('../../views/searchMovies/SearchMovies').then(({ default: SearchMovies }) => ({ default: SearchMovies }))),
  },
  {
    path: '/favourites',
    component:lazy(() => import('../../views/favouriteMovies/FavouriteMovies').then(({ default: FavouriteMovies }) => ({ default: FavouriteMovies }))),
  },
  {
    path: '/movieDetails/:id',
    component: lazy(() => import('../../views/movieDetails/MovieDetails').then(({ default: MovieDetails }) => ({ default: MovieDetails }))),
  },
  {
    path: '/personDetails/:id',
    component: lazy(() => import('../../views/PersonDetails/PersonDetails').then(({ default: PersonDetails }) => ({ default: PersonDetails }))),
  },
  {
    path: '/analytics',
    component: lazy(() => import('../../views/analytics/Analytics').then(({ default: Analytics }) => ({ default: Analytics }))),
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/authentication/Register').then(({ default: Register }) => ({ default: Register }))),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/Login').then(({ default: Login }) => ({ default: Login }))),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/ForgotPassword').then(({ default: ForgotPassword }) => ({ default: ForgotPassword }))),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/reset-password',
    component: lazy(() => import('../../views/authentication/ResetPassword').then(({ default: ResetPassword }) => ({ default: ResetPassword }))),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/error/Error').then(({ default: Error }) => ({ default: Error }))),
    layout: 'BlankLayout',
  },
];

export { DefaultRoute, Routes };
