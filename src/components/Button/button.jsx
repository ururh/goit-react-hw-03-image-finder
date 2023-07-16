import React from 'react';
import { ButtonLoad } from './Button.styled';
const Button = ({ onClick}) => {

  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load more
    </ButtonLoad>
  );
};

export default Button;
