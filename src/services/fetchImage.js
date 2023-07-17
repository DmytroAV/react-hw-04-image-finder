import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const REACT_APP_KEY_AUTH = process.env.REACT_APP_SECRET_KEY_API;


// const imageType = 'image_type=photo';
// const orientation = 'orientation=horizontal';
// const per_page = 12;

// export async function fetchImages(query, page) {
//   const response = await axios.get(
//     `/?q=${query}&page=${page}&key=${REACT_APP_KEY_AUTH}&${imageType}&${orientation}&per_page=${per_page}`
//   );
//   return response.data;
// }

export async function fetchImages(query, page = 1, limit = 12) {
  const params = new URLSearchParams({
    imageType: 'image_type=photo',
    orientation: 'orientation=horizontal',
    per_page: limit,
  })
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${REACT_APP_KEY_AUTH}&${params}`
  );
  return response.data;
};
