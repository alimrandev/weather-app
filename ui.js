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
