# TO-DO App

Status: **IN PROGRESS** (develop branch)

CRUD Full stack TODO app built with MERN stack.

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - used to create API
- [Node.js](https://nodejs.org/en/) - used to create API
- [MongoDB](https://www.mongodb.com/cloud/atlas) - database
- [Jest](https://jestjs.io/) - Jest testing library
- [react-testing-library](https://github.com/testing-library/react-testing-library) - Testing Library (React)
- [Storybook](https://storybook.js.org/) - storybook for react components

## Getting Started

### Prerequisites

- (unless you have already installed) - Install [Node.js](https://nodejs.org/en/) **LTS** version (has not been tested with current node version but it should work too).
-

### Installing

In order to run this App locally you need to:

1. Clone this repository

```
git clone https://github.com/mdziadkowiec95/mern-todo-app.git
```

2. install both **SERVER and CLIENT dependencies:**

- via npm scripts (from root repository directory)

```
npm install
```

3. Create [MongoDB database](https://www.mongodb.com/cloud/atlas)
4. Create `config/default.js` file inside root directory and set up MongoDB config data in the file as below:

```javascript
module.exports = {
  mongoURI: YOUR_MONGODB_URI_HERE
};
```

## Development

- clone the repository from **DEVELOP** branch
- run SERVER and CLIENT (in the future but it does NOT matter now).

```
npm run dev
```

## Testing

- `npm run test` (it runs JEST testing library)
- All server side tests are in root directory inside \***\*TESTS\*\*** directory

## Deployment

--- **IN PROGRESS** ---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
