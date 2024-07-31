import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = parseInt(event.target.delay.value);
    const state = event.target.state.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then((delay) => {
        console.log(`Promise fulfilled after ${delay} ms`);
        iziToast.success({
            title: 'Success',
            message: `Promise fulfilled after ${delay} ms`,
            position: 'topRight',
        });
      })
      .catch((delay) => {
        console.log(`Promise rejected after ${delay} ms`);
        iziToast.error({
            title: 'Error',
            message: `Promise rejected after ${delay} ms`,
            position: 'topRight',
          });
      });
  });