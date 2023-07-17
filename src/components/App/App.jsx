import { useState } from 'react';
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

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmitForm = query => {
    if (query === searchQuery) {
      toast.error(
        `You are currently viewing this "${query}" query`,
        notifyOptions
      );
      return;
    }
    setSearchQuery(query);
  };

  return (
    <ContainerApp>
      <Searchbar onSubmitFom={handleSubmitForm} />
      <ImageGallery query={searchQuery} />
      <GlobalStyle />
      <ToastContainer />
    </ContainerApp>
  );
}

export default App;
