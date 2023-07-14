import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from '../GlobalStyles.styled';
import { ContainerApp } from './App.styled';

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

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmitForm = query => {
    if (query === this.state.searchQuery) {
      toast.error(
        `You are currently viewing this "${query}" query`,
        notifyOptions
      );
      return;
    }
    this.setState({ searchQuery: query });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <ContainerApp>
        <Searchbar onSubmitFom={this.handleSubmitForm} />
        <ImageGallery query={searchQuery} />
        <GlobalStyle />
        <ToastContainer />
      </ContainerApp>
    );
  }
}

export default App;
