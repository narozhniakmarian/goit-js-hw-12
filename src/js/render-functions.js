
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image"/>
          
          <div class="info">
            <p><span>Likes</span> ${likes}</p>
            <p><span>Views</span> ${views}</p>
            <p><span>Comments</span> ${comments}</p>
            <p><span>Downloads</span> ${downloads}</p>
          </div>
          </a>
        </li>`;
        })
        .join('');

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    loader.classList.add('is-visible');
}

export function hideLoader() {
    loader.classList.remove('is-visible');
}