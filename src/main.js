import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    handleBackToTop,
    hiddenBackToTop
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.getElementById('load-more-btn');
let currentQuery = '';
let currentPage = 1;

let shouldShowScrollEndToast = false;
let hasShownScrollEndToast = false;

form.addEventListener('submit', async function (event) {
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

    hiddenBackToTop();

    showLoader();
    clearGallery();
    hideLoadMoreButton();


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

        handleBackToTop();
        if (data.totalHits > 15) {
            showLoadMoreButton();
        }

        if (currentPage * 15 >= data.totalHits) {
            hideLoadMoreButton();
            // iziToast.info({
            //     title: 'Info',
            //     message: "We're sorry, but you've reached the end of search results.",
            //     position: 'topRight',
            // });
            shouldShowScrollEndToast = true;
            hasShownScrollEndToast = false;
            hiddenBackToTop();
        }
    } catch (error) {
        hideLoader();
        hiddenBackToTop();

        iziToast.error({
            title: 'Error',
            message: 'Something went wrong.',
            position: 'topRight',
        });
    }


});

loadMoreBtn.addEventListener('click', async function (event) {

    currentPage += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();
        createGallery(data.hits);
        smoothScroll();

        if (currentPage * 15 >= data.totalHits) {

            hideLoadMoreButton();
            // iziToast.info({
            //     title: 'Info',
            //     message: "We're sorry, but you've reached the end of search results.",
            //     position: 'topRight',
            // });
            shouldShowScrollEndToast = true;
            hasShownScrollEndToast = false;
        } else {
            showLoadMoreButton();

        }
    } catch (error) {
        hideLoader();
        iziToast.error({
            title: 'Error',
            message: 'Could not load more images.',
            position: 'topRight',
        });
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



window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (
        shouldShowScrollEndToast &&
        !hasShownScrollEndToast &&
        scrollTop + windowHeight >= documentHeight
    ) {
        iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
        });
        hasShownScrollEndToast = true;
    }
});