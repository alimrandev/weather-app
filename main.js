// initialization
const ui = new Ui();
const weather = new Weather();

// add event listener
document.querySelector('form').addEventListener('submit', (e) => {
  const city = document.getElementById('cityInput').value;
  const country = document.getElementById('countryInput').value;
  if (city === '' || country === '') {
    const ui = new Ui();
    ui.showAlert('Please Insert a value', 'danger');
  } else {
    Storage.setData(city, country);
    const weather = new Weather(city, country);
    weather.getWeather().then((data) => ui.displayData(data));
    ui.clearFields();
  }
  e.preventDefault();
});

function displayWeather() {
  const { city, country } = Storage.getData();
  const weather = new Weather(city, country);
  const ui = new Ui();
  weather
    .getWeather()
    .then((data) => ui.displayData(data))
    .catch(() => {
      ui.showAlert(
        'Something wants wrong / not found. please check properly',
        'danger'
      );
    });
}

displayWeather();
