# broker-listings
Each broker has many listings. Each listing has time stamps associated with it, as well as numerical values related to the listing’s business activities, such as revenues. There are interesting trends across time to track using this info.

# Clone the project to your root foler
- git clone git@github.com:lokesh75way/broker-listings.git

# Go to project directory
- cd broker-listings/

# Create environment file named `.env` at root folder
- touch .env

# Add below content to the .env file with your database config
```
DB_HOST=""
DB_USERNAME=""
DB_PASSWORD=""
DB_PORT=5432
DB_NAME=""
DB_TLS=true
PORT=3001
```

# Install NPM dependencies
- npm install

# Start project
- npm start

# Notes for Assumptions
- We are using `listing_date` from deals table as a date to filter the listings.
- We are using `revenue` from deals table as a revenue.
- By default we are showing results from `startDate='2020-11-01'` to `endDate='2021-11-30'`, which are mentioned in the routes > index.js file on top. So to try with different dates you can simply change these variables.
