import Button from 'components/Button/button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { DivButton, ListGallery } from './ImageGallery.styled';

const ImageGallery = ({ pictures, onLoadMore,onClick }) => {
    return (
      <DivButton>
    <ListGallery>
                <ImageGalleryItem picture={pictures} onClickModal={onClick } />
      </ListGallery>
            {pictures.length > 0 && <Button onClick={onLoadMore} />}
            </DivButton>
  );
};

export default ImageGallery;
