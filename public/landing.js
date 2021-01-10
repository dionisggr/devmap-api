let stop;

function login() {
  window.localStorage.setItem('authToken', 'my-secret-key');
  let reset = setInterval(() => {
  window.localStorage.setItem('authToken', 'my-secret-key');
  }, 600000);
  stop = setTimeout(() => {
    clearInterval(reset);
    window.localStorage.removeItem('authToken');
  }, 550000);
  document.addEventListener('mousemove keydown', function () {
    clearTimeout(stop);
    stop = setTimeout(() => {
      clearTimeout(reset)
    }, 550000);
  });
};

function logout() {
  clearTimeout(reset);
  window.localStorage.removeItem('authToken');
};