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
