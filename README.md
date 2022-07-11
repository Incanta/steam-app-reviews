# Steam Reviews Exporter

This simple script will export all of the reviews for a Steam app.

## Prerequisites

1. [NodeJS v16+](https://nodejs.org/en/). If you don't know which version to get, get "LTS", not "Current"
1. [yarn](https://yarnpkg.com/). You get this by running `npm install --global yarn` after you've installed NodeJS

## Instructions

1. Clone this repo
1. In the repo directory, install dependencies by running `yarn`
1. Run `yarn start YourSteamAppId`
  - For example: `yarn start 1744770`
1. See the output file `reviews.json` with all of your reviews
