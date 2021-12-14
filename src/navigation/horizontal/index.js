import { Film, TrendingUp, Search, BarChart2 } from 'react-feather';

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
    id: 'analytics',
    title: 'Analytics',
    icon: <BarChart2 size={20} />,
    navLink: '/analytics'
  },
  {
    id: 'search',
    title: 'Search',
    icon: <Search size={20} />,
    navLink: '/search-movies'
  }
]
