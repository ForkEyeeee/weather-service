# Weather Service

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Starting the Server](#starting-the-server)
- [How to Send Requests to the Server](#how-to-send-requests-to-the-server)
- [API JSON Response Format](#api-json-response-format)
- [API Error Messages](#api-error-messages)
  - [Missing `lat` and/or `lon` Query Parameters](#missing-lat-andor-lon-query-parameters)
  - [Longitude Out of Range](#longitude-out-of-range)
  - [Latitude Out of Range](#latitude-out-of-range)
- [Running Tests](#running-tests)

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

### Starting the Server

Execute the following command to start the server:
```bash
npm run start
```
The server will start running on `http://localhost:3000`.

## How to Send Requests to the Server

To retrieve weather information, send a GET request with latitude (`lat`) and longitude (`lon`) parameters to the root path `/` using [Postman](https://www.postman.com/) or directly through your web browser.

```plaintext
http://localhost:3000/?lat=<latitude>&lon=<longitude>
```
Replace `<latitude>` and `<longitude>` with the actual coordinates you wish to check.

### API JSON Response Format

The server responds with a JSON object detailing the current weather conditions, temperature, and any active weather alerts:

```json
{
    "conditions": {
        "main": "Rain",
        "description": "Pouring rain"
    },
    "temperature": "Cold",
    "alerts": [
        {
            "sender_name": "Local Weather Service",
            "event": "Flood Warning",
            "start": 1711843200,
            "end": 1711962000,
            "description": "There is a flood warning in your area until 6:00 PM.",
            "tags": [
                "Flood"
            ]
        }
    ]
}
```

## API Error Messages

### Missing `lat` and/or `lon` Query Parameters
- **Message:** "Query params lat and lon must both be defined."
- **Cause:** Latitude (`lat`) and/or Longitude (`lon`) query parameters are missing in the request URL.

### Longitude Out of Range
- **Message:** "Error: Please enter valid coordinates, wrong longitude."
- **Cause:** The provided longitude is outside the valid range (-180 to 180).

### Latitude Out of Range
- **Message:** "Error: Please enter valid coordinates, wrong latitude."
- **Cause:** The provided latitude is outside the valid range (-90 to 90).

## Running Tests

To run the Jest testing suite, run the following command using the terminal:
```bash
npm run test
```