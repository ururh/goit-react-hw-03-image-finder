
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import getImages from "components/services/api";
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
  }

  getInputValue = value => {
    this.setState({ inputValue: value, page: 1, pictures: [],status: 'loading' })
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

    fetchImages = (inputValue, page) => {
        this.setState({ isLoading: true })
        
    getImages(inputValue, page)
      .then((data) => {
        const { hits } = data;
        if (hits.length === 0) {
          this.setState({ status: 'idle' });
          return;
        }
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...hits],
          status: 'idle',
        }));
      })
      .catch((error) => {
        console.error(error);
          this.setState({ status: 'error' });
      }).finally(() => {
          this.setState({isLoading:false})
      })
        ;
    };
    
    handleLoadMore = () => {
    const { inputValue, page } = this.state;
    const nextPage = page + 1;
    this.setState({ page: nextPage, status: 'loading' });
    this.fetchImages(inputValue, nextPage);
    };
    
  componentDidUpdate(_, prevState) {
    const { page, inputValue } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.inputValue !== this.state.inputValue
    ) {
      this.setState({ status: 'loading' });

      getImages(inputValue, page)
        .then(e =>
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...e.hits],
            status: 'idle',
            loadMore: 12 - e.hits.length,
          }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <AppDiv>
            <Searchbar onSubmit={this.getInputValue} />
             {this.state.status === 'loading' && <Loader />}
            {this.state.status === 'error' && <p>Error occurred.</p>}
            {this.state.showModal && <Modal imgUrl={this.state.selectedImageUrl} onClose={this.toggleModal} />}
            <ImageGallery pictures={this.state.pictures} onLoadMore={this.handleLoadMore} onClick={this.getLargeImgUrl}/>
             
      </AppDiv>
    );
  }
}

export default App;
