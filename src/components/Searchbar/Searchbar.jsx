import { Component } from 'react';
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

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChangeInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error(
        'The search string cannot be empty. Please specify your search query.',
        notifyOptions
      );
      return;
    }
    this.props.onSubmitFom(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <ButtonSearch type="submit">
            <BsSearch />
          </ButtonSearch>

          <Input
            name="query"
            value={query}
            onChange={this.handleChangeInput}
            type="text"
            autoComplete="off"
            autoFocus={true}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmitFom: PropTypes.func.isRequired,
};
