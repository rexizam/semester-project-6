// Own
import Movies from '../../components/movie-page/Movies';
import { FAVOURITES } from '../../@core/assets/Strings';

const FavouriteMovies = () => <Movies requestType={FAVOURITES}/>;

export default FavouriteMovies;