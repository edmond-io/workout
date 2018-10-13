# README #
`heroku-configured` `Angular 4` `Node.js`

This is a Angular 4 website with Node.js v7 as backend server.


## Repo Install Steps
1. Build client side
    ```
    cd angular-src
    npm install
    ```
2. Build server side
    ```
    cd ../
    npm install
    ```
3. Configure server side dot env

    Create and configure `.env` from `.env.sample` 

## Development
##### Only front-end server at <localhost:4200>
```
cd angular-src
ng serve
```

##### By console
Save new code and auto-refreshed at <localhost:8282>
- Console 1
    ``` 
    npm run watch_client
    ```
- Console 2
    ```
    nodemon server.js NODE_ENV=DEV
    ```

##### By IntelliJ
- Install Node.js plugin
- Javascript Files: server.js
- Environment variables: NODE_ENV=DEV

## Deployment
#### Local Heroku
```
npm run build_client (Just to build /client)
heroku local
```
#### Remote Heroku
```
git push heroku master
```
