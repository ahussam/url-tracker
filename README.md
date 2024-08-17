# URL Tracker v0.5.0

[![Build Status](https://travis-ci.org/ahussam/url-tracker.svg?branch=master)](https://travis-ci.org/ahussam/url-tracker)
[![License](https://badgen.net/badge/license/MIT/green)](https://badgen.net/badge/license/MIT/green)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ahussam/url-tracker/)
[![GitHub issues](https://img.shields.io/github/issues/ahussam/url-tracker.svg)](https://github.com/ahussam/url-tracker/issues/)

URL Tracker is a robust and scalable web application designed to monitor and track URLs, log changes, and provide detailed insights into the status and behavior of various web resources. Built on top of Sails.js, this application is perfect for tracking URLs for uptime, content changes, and performance monitoring.

## Features

- **URL Monitoring**: Keep track of various URLs and monitor their status over time with the capability of adding single or multiple URLs per submission.
- **Change Detection**: Detect and log changes to the content of tracked URLs.
- **Automated Requests**: Schedule and automate requests to URLs to periodically check their status (hourly, daily, weekly, monthly).
- **Detailed Logs**: Store and view logs of URL changes and request statuses.
- **User Login**: Use email and password to log in. 
- **Notifications**: Send notifications based on specific events like content changes on a Telegram bot.

## How It Works

URL Tracker works by sending HTTP requests to specified URLs at regular intervals. It compares the response content to previous results and logs any differences. The application can be extended with custom notifications, data processing, and more, making it versatile for various use cases.

### Default Credentials

Upon initial setup, the application comes with default admin credentials:

- **Username**: `admin@example.com`
- **Password**: `9TMhdaUSEzksEXF`

**IMPORTANT:** For security reasons, it is highly recommended that you change these default credentials immediately after logging in. You can do this via the user management interface within the application.

## How to Use 

If you want to track changes on a web page, follow these steps (You must be logged in):

1. **Add New Link**: Click the "Add New Link" button on the right side.
2. **Fill in the Description**: Enter text in the description textbox that describes the target, e.g., "Uber internal system login page."
3. **Enter the Target Link**: Write the target link in the "Link of page" textbox, e.g., `http://s3.amazonaws.com/careemcrm/`. You can add multiple links as well. 
4. **Specify Keywords**: Enter keywords that will be tracked on the page in the "Keywords" textbox. If these keywords appear, you will be notified (e.g., "404", "new feature", "not found"). **Note:** These keywords MUST NOT be present in the first request.
5. **Authenticate if Necessary**: If you want to track an authenticated page, add your cookies in the "Cookie" textbox.
6. **Select the Check Period**: Choose the period at which you want to check the page.
7. **Set Tolerance**: In the "Tolerance" textbox, set the accepted differences between the previous fetch and the next one by characters (e.g., 100). **Note:** If you want to ignore minor changes like CSRF tokens, cache tokens, or cookie tracking, set this parameter. If left blank, the server will compare two requests and store the differences in the database as `acceptedChange`.
8. **Add the Link**: Click the "Add Link" button. You should see the new target in the URLs list.

### Telegram Bot Setup for Notifications

To receive notifications via Telegram:

1. **Create a Telegram Bot**: Use the BotFather to create a new bot on Telegram.
2. **Get the Bot Token**: After creating the bot, you will receive a token from BotFather. Save this token.
3. **Get Your Chat ID**: Start a chat with your bot, and then use an API like `https://api.telegram.org/bot<YourBOTToken>/getUpdates` to retrieve your chat ID.
4. **Configure the Bot in the Application**:
   - Go to your application's settings (http://127.0.0.1:1337/settings) and enter the bot token and chat ID.
   - Enable Telegram notifications.
5. **Receive Notifications**: You will now receive alerts and notifications from the URL Tracker via Telegram.

## Setup

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- MongoDB
- [Docker](https://www.docker.com/) (in case of using it in a container)
- [Git](https://git-scm.com/)

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/ahussam/url-tracker.git
cd url-tracker
```

### Install Dependencies

After cloning the repository, install the necessary dependencies:

``` bash
npm install
```

### Running the Application

You can start the application in development mode using:

```bash
sails lift
```

This will start the Sails.js server on the port defined in your `.env` file 

### Docker Setup

For a consistent environment, you can run the URL Tracker project using Docker. 

### Change MONGO_URL in .env file 
Change the `MONGO_URL` to `mongodb://mongodb:27017/url-tracker`. 
#### Build the Docker Image

To build the Docker image, run:

```bash
docker build -t url-tracker .
```

#### Run the Docker Container

To start the application using Docker:

```bash
docker run -p 1337:1337 url-tracker
```

Or by using docker-compose

```bash
docker-compose build 
docker-compose up 
```
This command maps port 1337 of the container to port 1337 of your local machine. Access the application by navigating to `http://localhost:1337` in your browser.

## Screenshots

![ss](/img/ss1.png)
![ss](/img/ss2.png)
![ss](/img/ss3.png)
![ss](/img/ss4.jpg)

## License

The MIT License (MIT)

Copyright (c) 2024 Abdullah Hussam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue on GitHub.