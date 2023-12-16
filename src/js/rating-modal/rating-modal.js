const modalConfig = {
  exersiseId: '64f389465ae26083f39b17a2', //id for test
  ratingText: 'Rating',
  iconStar: '/images/icons-sprite.svg#icon-star',
  ratingMax: 5,
  closeKeyBoardBtn: 'Escape',
  beforeOpen: null,
  afterOpen: null,
  beforeClose: null,
  afterClose: null,
};

const feedbackForm = document.querySelector('form.modal-form');
const rootRatingModal = document.querySelector('.rating-modal-window');
const closeBtn = document.querySelector('.rating-close');

const createRatingMarkup = () => {
  const starsArray = [];

  for (let count = 0; count < modalConfig.ratingMax; count++) {
    let starIndex = modalConfig.ratingMax - count;
    starsArray.push(`
        <input type="radio" class="visually-hidden" id="star${starIndex}" name="rating" value="${starIndex}">
        <label class="rating-star" for="star${starIndex}">
            <svg class="rating-star-icon">
                <use href=${modalConfig.iconStar} />
            </svg>
        </label>
        `);
  }
  return `
    <div class="rating-wrapper">
        <p class="rating-text">${modalConfig.ratingText}</p>
        <div class="rating-stars">
            ${starsArray.join('')}
            <p class="rating-count">0.0</p>
        </div>
    </div>
    `;
};

const handleClose = event => {
  if (event.key === modalConfig.closeKeyBoardBtn) {
    closeRatingModal();
  }
};

const handleRatingChange = event => {
  ratingInputs.forEach(input => {
    delete input.dataset.dataChecked;
  });
  event.target.dataset.dataChecked = 'checked';
  ratingCount.innerHTML = event.target.value;
};

feedbackForm.insertAdjacentHTML('afterbegin', createRatingMarkup());
const ratingInputs = document.querySelectorAll('.rating-stars input');
const ratingCount = document.querySelector('.rating-count');

const closeRatingModal = () => {
  if (modalConfig.beforeClose) {
    modalConfig.beforeClose();
  }
  ratingInputs.forEach(input => {
    input.removeEventListener('change', handleRatingChange);
  });

  rootRatingModal.classList.remove('open');
  document.body.style.overflow = 'visible';
  document.removeEventListener('keydown', handleClose);
  if (modalConfig.afterClose) {
    modalConfig.afterClose();
  }
};

const openRatingModal = () => {
  rootRatingModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleClose);
  ratingInputs.forEach(input => {
    input.addEventListener('change', handleRatingChange);
  });
};

closeBtn.addEventListener('click', closeRatingModal);

rootRatingModal.addEventListener('click', e => {
  if (e.target === rootRatingModal) {
    closeRatingModal();
  }
});

export const ratingWindow = {
  modalConfig,
  openRatingModal,
  closeRatingModal,
};
