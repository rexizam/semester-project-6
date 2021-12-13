import { Film, TrendingUp, Search, Users } from 'react-feather';

export default [
  {
    id: 'featured',
    title: 'Featured',
    icon: <Film size={20} />,
    navLink: '/featured-movies'
  },
  {
    id: 'popular',
    title: 'Popular',
    icon: <TrendingUp size={20} />,
    navLink: '/popular-movies'
  },
  {
    id: 'search-movies',
    title: 'Movies',
    icon: <Search size={20} />,
    navLink: '/search-movies'
  },
  {
    id: 'search-actors',
    title: 'Actors',
    icon: <Users size={20} />,
    navLink: '/search-actors'
  }
]
