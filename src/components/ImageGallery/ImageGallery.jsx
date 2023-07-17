import Button from 'components/Button/button';
import PropTypes from 'prop-types'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { DivButton, ListGallery } from './ImageGallery.styled';

const ImageGallery = ({ pictures, onLoadMore, onClick,loadMore }) => {

    return (
      <DivButton>
    <ListGallery>
                <ImageGalleryItem picture={pictures} onClickModal={onClick } />
      </ListGallery>
            {loadMore === 0 && <Button onClick={onLoadMore} />}
            </DivButton>
  );
};

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    pictures: PropTypes.array.isRequired,
    onLoadMore: PropTypes.func.isRequired,
}
export default ImageGallery;
