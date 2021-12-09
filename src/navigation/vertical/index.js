import { Film, TrendingUp, Search, Star } from 'react-feather';

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
    id: 'search',
    title: 'Search',
    icon: <Search size={20} />,
    navLink: '/search-movies'
  }
]
