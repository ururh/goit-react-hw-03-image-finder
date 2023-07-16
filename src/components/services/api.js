import axios from 'axios';

export default async function getImages(inputValue, page) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '31248055-e075bd58b7f60ee40b8d7aef1';

  try {
    const response = await axios.get(url, {
      params: {
        q: inputValue,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
