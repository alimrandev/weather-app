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
