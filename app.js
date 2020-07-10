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

const weather = new Weather('chittagong', 'bd');

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
    console.log(url);
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
}

const ui = new Ui();
weather.getWeather().then((data) => ui.displayData(data));
