import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    handleBackToTop
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
let currentQuery = '';
let currentPage = 1;



form.addEventListener('submit', function (event) {
    event.preventDefault();
    currentQuery = input.value.trim();
    currentPage = 1;

    if (!currentQuery) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }

    showLoader();
    clearGallery();
    hideLoadMoreButton();

    setTimeout(async () => {
        try {
            const data = await getImagesByQuery(currentQuery, currentPage);
            hideLoader();

            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Oops',
                    message: 'Sorry, no images found!',
                    position: 'topRight',
                });
                return;
            }

            createGallery(data.hits);

            if (data.totalHits > 15) {
                showLoadMoreButton();
                handleBackToTop();
            }

            if (currentPage * 15 >= data.totalHits) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            }
        } catch (error) {
            hideLoader();
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong.',
                position: 'topRight',
            });
        }
    }, 1200);
});

document.addEventListener('click', async function (event) {
    if (event.target.id === 'load-more-btn') {
        currentPage += 1;
        // showLoader();

        try {
            const data = await getImagesByQuery(currentQuery, currentPage);
            hideLoader();
            createGallery(data.hits);
            smoothScroll();

            if (currentPage * 15 >= data.totalHits) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            }
        } catch (error) {
            hideLoader();
            iziToast.error({
                title: 'Error',
                message: 'Could not load more images.',
                position: 'topRight',
            });
        }
    }
});



function smoothScroll() {
    const card = document.querySelector('.gallery-item');
    if (card) {
        const { height } = card.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth',
        });
    }
}
