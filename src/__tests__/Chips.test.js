// React
import { act } from 'react-dom/test-utils';

// Own
import Chips from '../components/chips/Chips';
import { mount, setupTestConfiguration, shallow } from '../utility/testing/TestConfiguration';

// Test suite configuration
setupTestConfiguration();

describe('Chips', () => {
  // Suite setup
  let wrapper;
  let setSearchGenres;
  const genres = [
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ].map(genre => genre.name);

  beforeEach(() => {
    /**
     * Mock function of the setSearchGenres state hook setter.
     * @param newSearchGenres New search genres to be set.
     */
    setSearchGenres = (newSearchGenres) => {
      wrapper.props().genres = newSearchGenres;
    };
  });
  it('should be rendered.', async () => {
    // Arrange & Act
    wrapper = shallow(<Chips />);
    // Assert
    expect(wrapper).toBeDefined();
  });

  it('should be rendered with genres.', async () => {
    // Arrange & Act
    wrapper = mount(<Chips genres={genres} />);
    // Assert
    expect(wrapper.props().genres).toEqual(genres);
    expect(wrapper.props().genres.length).toEqual(genres.length);
    wrapper.props().genres.forEach((genre, index) => {
      expect(genre).toEqual(genres[index]);
    });
  });

  it('should be rendered with setSearchGenres.', async () => {
    // Arrange
    const searchGenres = [
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
    ];
    wrapper = mount(<Chips genres={genres} setSearchGenres={setSearchGenres} />);
    // Act
    setSearchGenres(searchGenres);
    // Assert
    expect(wrapper.props().genres).toEqual(searchGenres);
  });

  it('should have clickable chips', async () => {
    // Arrange
    wrapper = mount(<Chips genres={genres} setSearchGenres={setSearchGenres} />);
    const chip = (wrapper.find('#chip-0').at(0));
    // Act
    act(() => {
      chip.props().onClick();
      chip.props().variant === 'outlined' ? chip.props().variant = 'filled' : chip.props().variant = 'outlined';
    });
    // Assert
    expect(chip.props().variant).toBe('filled');
  });
});