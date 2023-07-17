import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar, SearchForm, Input, ButtonSearch } from './Searchbar.styled';

const notifyOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

function Searchbar({ onSubmitFom }) {
  const [query, setQuery] = useState('');

  const handleChangeInput = e => {
    setQuery(e.currentTarget.value.toLowerCase());
    // setQuery(e.target.elements.query.value.toLowerCase());
    // e.target.reset();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.',
        notifyOptions
      );
      return;
    }
    onSubmitFom(query);
    setQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSearch type="submit">
          <BsSearch />
        </ButtonSearch>

        <Input
          name="query"
          value={query}
          onChange={handleChangeInput}
          type="text"
          autoComplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmitFom: PropTypes.func.isRequired,
};
