import {
  showFavoriteCards,
  showInitialCards,
  showWorkoutCards,
  cleanerCardWrapper,
} from '../templates/exercise-cards';
import {
  getData,
  checkExerciseParams,
  checkWorkoutParams,
} from './cards-service';
import { addWorkoutClass, deleteWorkoutClass } from './class-changer';
import ApiService from '../api-service';
import { cleanerPages, showPages } from '../templates/pages';
import { checkCard, checkWorkoutCard, checkPage } from './checker';
import { favoritesDB } from '../favoritesDB';
import { openModalExercise } from '../modal/exercise-modal';

window.addEventListener('resize', cardsHandler);

//Default parameteres for search
let params = {
  filter: 'Muscles',
  bodypart: '',
  keyword: '',
  muscles: '',
  equipment: '',
};

const pageFilter = {
  currentPage: 1,
  endPoint: 3,
};

const listen = {
  cardsLinks: null,
  pageLinks: null,
  workoutLinks: null,
};

//There are 3 endpoints: 1 - favorites, 2 - exercises (target of search), 3 - filter

async function cardsHandler() {
  const element = document.querySelector('.exercise-cards__section');
  element.offsetHeight;
  const fetch = new ApiService();
  let data;
  let connection;
  try {
    switch (pageFilter.endPoint) {
      // If the endpoint has /favorites do the next
      case 1:
        //Тут повинна бути логіка отримання даних з позначкою фейворітс

        showFavoriteCards(data);
        break;
      // If the endpoint has /exercise do the next
      case 2:
        addWorkoutClass();
        connection = checkWorkoutParams(
          pageFilter.currentPage,
          pageFilter.endPoint,
          fetch,
          params,
          connection
        );
        data = await getData(connection);

        cleanerCardWrapper();
        cleanerPages();
        showWorkoutCards(data);
        showPages(pageFilter.currentPage, fetch.maxPages);

        listenPages(pageFilter.endPoint);
        listenWorkoutCards();
        break;
      // If the endpoint has /filter do the next
      case 3:
        deleteWorkoutClass();
        connection = checkExerciseParams(
          pageFilter.currentPage,
          pageFilter.endPoint,
          fetch,
          params,
          connection
        );
        data = await getData(connection);
        cleanerCardWrapper();
        cleanerPages();

        showInitialCards(data);
        showPages(pageFilter.currentPage, fetch.maxPages);

        listenCards();
        listenPages(pageFilter.endPoint);
        break;
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

function listenCards() {
  listen.cardsLinks = document.querySelector('.js-cards');
  if (listen.cardsLinks) {
    listen.cardsLinks.addEventListener('click', targetHandler);
  } else {
    console.error("Element with class 'js-cards' not found.");
  }
}

function targetHandler(evt) {
  const result = checkCard(evt);
  if (result != null || undefined || NaN)
    if (params.filter === 'Muscles') {
      pageFilter.endPoint = 2;
      params.muscles = result;
    } else if (params.filter === 'Body%20parts') {
      pageFilter.endPoint = 2;
      params.bodypart = result;
    } else if (params.filter === 'Equipment') {
      pageFilter.endPoint = 2;
      params.equipment = result;
    }
  listen.cardsLinks.removeEventListener('click', targetHandler);
  pageFilter.currentPage = 1;
  cardsHandler();
}

function listenPages() {
  listen.pageLinks = document.querySelector('.js-pages');
  if (listen.pageLinks) {
    listen.pageLinks.addEventListener('click', pagesHandler);
  } else {
    console.error("Element with class 'js-pages' not found.");
  }
}

function pagesHandler(evt) {
  const clickedPage = checkPage(evt);
  if (
    (pageFilter.currentPage != clickedPage && clickedPage != null) ||
    undefined ||
    NaN
  ) {
    pageFilter.currentPage = +clickedPage;
    cardsHandler();
  }
}

function listenWorkoutCards() {
  listen.workoutLinks = document.querySelector('.js-cards');
  if (listen.workoutLinks) {
    listen.workoutLinks.addEventListener('click', workoutHandler);
  } else {
    console.error("Element with class 'js-cards' not found for workout.");
  }
}

async function workoutHandler(evt) {
  const exerciseId = checkWorkoutCard(evt);
  if (!exerciseId) {
    return;
  }

  const apiService = new ApiService();

  try {
    apiService.id = exerciseId;
    const exercise = await apiService.fetchExerciseById();

    if (!exercise) {
      throw new Error('Exercise not found!');
    }

    exercise.isFavorite = favoritesDB.getObjectById(exerciseId);
    openModalExercise(exercise);
  } catch (error) {
    console.error(error);
  }
}

cardsHandler();

export { params, pageFilter, cardsHandler };