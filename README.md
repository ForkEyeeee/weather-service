# Weather Service

## Overview

Node.js/Express.js HTTP server that provides current weather conditions (such as snow, rain, etc.), temperature status (hot, cold, or moderate), and any ongoing weather alerts in the requested area using OpenWeather API.

## Getting Started

### Prerequisites

- Node.js: Download from [here](https://nodejs.org/en/download/).
- OpenWeather One Call API 3.0 Key: Subscribe to get one [here](https://openweathermap.org/api).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JBrown58/weather-service
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-service
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Set up your OpenWeather API key:
   - Create a `.env` file in the project root.
   - Add your API key as follows: `API_KEY=your_api_key_here`.

### Running the Server

Execute the following command to start the server:
```bash
npm run devstart
```
The server will start running on `http://localhost:3000`.

## How to Use

To query the weather information, send a GET request to the root path `/` with the latitude (`lat`) and longitude (`lon`) parameters:
```plaintext
http://localhost:3000/?lat=<latitude>&lon=<longitude>
```
Replace `<latitude>` and `<longitude>` with the actual coordinates you wish to check.

### Response Format

The server responds with a JSON object detailing the current weather conditions, temperature, and any active weather alerts:

```json
{
    "conditions": {
        "main": "Rain",
        "description": "Pouring rain"
    },
    "temperature": "Cold",
    "alerts": "There is a flood warning in your area until 6:00 PM."
}
```

### Running Tests

To run the Jest test suite, run the following command using the terminal:
```bash
npm run test
```