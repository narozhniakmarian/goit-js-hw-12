import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }

    showLoader();
    clearGallery();

    setTimeout(() => {
        getImagesByQuery(query)
            .then(data => {
                hideLoader();

                if (data.hits.length === 0) {
                    iziToast.error({
                        title: 'Oops',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight',
                    });
                    return;
                }

                createGallery(data.hits);
            })
            .catch(error => {
                hideLoader();

                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong while fetching images.',
                    position: 'topRight',
                });
            });
    }, 2500);
});
