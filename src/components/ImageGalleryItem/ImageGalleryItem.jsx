import React from 'react';
import { ImageItem, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ picture, onClickModal }) => {
   return picture.map((picture, index) => {
      return (
         <Item className="gallery-item" key={index} onClick={() => {
            onClickModal(picture.largeImageURL);
          }}>
            <ImageItem src={picture.webformatURL} alt={picture.tags} load="lazy" />
         </Item>
      )
   });
};

export default ImageGalleryItem;
