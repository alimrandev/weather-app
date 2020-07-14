class Weather {
  constructor(city, country) {
    this.city = city;
    this.country = country;
  }

  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=a849992df84ed2e60441744552334f0f&units=metric`
    ).then((data) => data.json());
    return {
      main_data: response.main,
      city: response.name,
      weather: response.weather[0],
    };
  }
}

class Storage {
  static getData() {
    let city = '';
    let country = '';
    if (
      localStorage.getItem('city') === null ||
      localStorage.getItem('country') === null
    ) {
      city = 'chittagong';
      country = 'bd';
    } else {
      city = localStorage.getItem('city');
      country = localStorage.getItem('country');
    }
    return {
      city,
      country,
    };
  }

  static setData(city, country) {
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
  }
}

class Ui {
  constructor() {
    this.city = document.getElementById('w-city');
    this.icon = document.getElementById('w-icon');
    this.temp = document.getElementById('w-temp');
    this.pressure = document.getElementById('w-pressure');
    this.humidity = document.getElementById('w-humidity');
    this.feels = document.getElementById('w-feels');
  }
  displayData({
    city,
    main_data: { humidity, pressure, temp },
    weather: { icon, main },
  }) {
    const url = Ui.iconUrl(icon);
    this.city.textContent = city;
    this.icon.setAttribute('src', url);
    this.temp.textContent = `Temperature(Cel) : ${temp}`;
    this.feels.textContent = main;
    this.pressure.textContent = `Pressure(hpa) : ${pressure}`;
    this.humidity.textContent = `Humidity(%) : ${humidity}`;
  }
  static iconUrl(icon) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  clearFields() {
    const city = (document.getElementById('cityInput').value = '');
    const country = (document.getElementById('countryInput').value = '');
  }
  showAlert(msgs, className) {
    const parent = document.querySelector('.jumbotron');
    const form = document.querySelector('form');
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.textContent = msgs;
    parent.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

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
    const ui = new Ui();
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
