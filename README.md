# agent-book-code-challenge

# About

This exercise is based on the following .

That Agent has a task management system that users can register and signin then create a card on the tasks-board and assign it to a project in progress. And also the user can move the card based on project completion

To enable this an API with five endpoints would be created:

- endpoint to create a user(register)
- endpoint for a user to signin(login).
- forgot password endpoint(for users who lost their passwords)
- endpoint to add cards to the board(create a card endpoint)
- endpoint to list all cards on the board
## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQl](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Elozzy/agent-book

# Navigate into the cloned repository
$ cd into the currently cloned directory

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the example.env file and provide the keys

# Run the app
$ npm start

# Check the port on the specified port on the env or 4000

#To migrate tables and schema
$ npm run migrate
```

## API endpoints

**Base_URL**-> http://localhost:4600
**SwaggerDocs** -> http://localhost:4600/api-docs/#/



## Author

Eloghosa Osagie

## License

ISC

---