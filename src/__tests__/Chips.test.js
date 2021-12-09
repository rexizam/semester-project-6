// React
import { act } from 'react-dom/test-utils';

// Own
import Chips from '../components/chips/Chips';
import {
  mount,
  shallow,
  setupTestConfiguration,
} from '../utility/testing/TestConfiguration';
import { genres, searchGenres } from '../utility/testing/MockData';

// Test suite configuration
setupTestConfiguration();

describe('Chips', () => {
  // Suite setup
  let wrapper;
  let setSearchGenres;
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
    wrapper = mount(<Chips genres={genres} setSearchGenres={setSearchGenres} />);
    // Act
    setSearchGenres(searchGenres);
    // Assert
    expect(wrapper.props().genres).toEqual(searchGenres);
  });

  it('should have clickable chips', async () => {
    // Arrange
    const setSearchString = (newSearchString) => {
      wrapper.props().searchString = newSearchString;
    };
    wrapper = mount(<Chips genres={genres} setSearchGenres={setSearchGenres} setSearchString={setSearchString} />);
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