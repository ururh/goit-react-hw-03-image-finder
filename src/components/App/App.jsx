
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import getImages from "services/api"
import React, { Component } from "react";
import { AppDiv } from "./App.styled";

export class App extends Component {
  state = {
    inputValue: '',
    page: 1,
    pictures: [],
    status: 'idle',
    isLoading: null,
    showModal: false,
    selectedImageUrl: "",
    loadMore: null,
  }

  getInputValue = value => {
    this.setState({ inputValue: value, page: 1, pictures: []})
    }
    
    getLargeImgUrl = imgUrl => {
    this.setState({ selectedImageUrl: imgUrl });
    this.toggleModal();
  };    
    
toggleModal = () => {
  this.setState((state) => ({
    showModal: !state.showModal,
  }));
};

fetchImages = () => {
  const { inputValue, page } = this.state;

  this.setState({ isLoading: true });

  getImages(inputValue, page)
    .then((data) => {
      const { hits } = data;
      if (hits.length === 0) {
        this.setState({ status: 'idle', isLoading: false });
      } else {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          status: 'idle',
          loadMore: 12 - hits.length,
          isLoading: false
        }));
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({ status: 'error', isLoading: false });
    });
};

    
    handleLoadMore = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
    status: 'loading',
  }));
};
    
  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.inputValue !== this.state.inputValue
    ) this.fetchImages();
  }

  render() {
    return (
      <AppDiv>
            <Searchbar onSubmit={this.getInputValue} />
             {this.state.status === 'loading' && <Loader />}
            {this.state.status === 'error' && <p>Error occurred.</p>}
            {this.state.showModal && <Modal imgUrl={this.state.selectedImageUrl} onClose={this.toggleModal} />}
            <ImageGallery pictures={this.state.pictures} onLoadMore={this.handleLoadMore} onClick={this.getLargeImgUrl} loadMore={ this.state.loadMore} />
             
      </AppDiv>
    );
  }
}

export default App;
