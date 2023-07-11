# Simple Weather App

Simple Weather is a weather application that provides current weather information based on the user's location. It utilizes the WeatherAPI.com API to retrieve weather data. This repository contains the source code for the Simple Weather app. You are welcome to explore, modify, and contribute to the development of the application.

## Prerequisites

Before running the Simple Weather app, ensure that you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org) (version 12 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)

## Features

- Get the current weather information based on the user's location
- Search for weather information by location name
- Display temperature, weather condition, wind speed, and humidity
- View hourly weather forecast for the next 24 hours
- View weather forecast for the next days

## Installation

To install and run the Simple Weather app, follow these steps:

1. Clone this repository:

```bash
git clone https://github.com/your-username/simple-weather-app
```

2. Navigate to the project directory:

```bash
cd simple-weather-app
```

3. Install the dependencies:

```bash
npm install
```

4. Rename the `.env.example` file to `.env` and provide your WeatherAPI.com API key in the `REACT_APP_WEATHER_API_KEY` variable.

5. Start the development server:

```bash
npm start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

6. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the app.

## Usage

The `src` directory contains the main code for the Simple Weather application. You can modify and extend the app by editing the files in this directory.

The entry point for the application is `src/index.js`, where the root component is rendered.

The `public` directory contains the public assets for the application, such as HTML and favicon files. You can customize the `public/index.html` file to include any additional scripts or stylesheets.

## API Configuration

The Simple Weather app uses the WeatherAPI.com API to fetch weather data. To configure the API settings, create the `.env.local` file in the project root directory and add the `REACT_APP_API_KEY` variable with your WeatherAPI.com API key.

## Building for Production

To build the app for production, use the following command:

```bash
npm run build
```

This will create an optimized and minified version of the app in the `build` directory.

You can then deploy the contents of the `build` directory to your web server or any static hosting platform.

## Contributing

Contributions to the Simple Weather app are welcome! If you have any ideas, bug fixes, or improvements, please follow these steps:

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b my-feature
```

3. Make your modifications and commit changes:

```bash
git commit -am 'Add my feature'
```

4. Push the branch:

```bash
git push origin my-feature
```

5. Create a pull request.

Please ensure that your code follows the project's coding style and conventions.

## License

The Simple Weather app is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project for personal and commercial purposes.

## Contact

If you have any questions, suggestions, or feedback, feel free to contact the project owner:

- Name: Hubert Paprocki
- Email: hubertpaprocki.dev@gmail.com

We hope you enjoy using the Simple Weather app! Stay updated with the latest weather conditions!
