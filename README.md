Bowling Challenge
=================

![Screenshot of my app](https://www.dropbox.com/s/a8cm198sa47inau/bowling-screenshot.png?dl=0)

Task
-----

My task was to build a JavaScript programme to count and score a one player game of bowling.

I decided to bite off more than I could chew and do the whole on a react/node.js technology stack, which included Redux for the state management (a concept I totally understand fully (...)) and Jest for the tests - love Jest, Jest is awesome. I'm still loving Semantic UI, so I used that too which has a full react version.

Please forgive me my transgressions. As the redux loop of view, actions, reducers and store were new to me I played with it for a while (read: didn't write tests)... So my test coverage sucks, sorry about that. The tests for src/stores/frameStore is good though, so look at them.

Installation and set-up
-----

1. Clone the repo:
```
git clone https://github.com/benfurber/bowling-challenge
```
2. Open the directory:
```
cd bowling-challenge
```
3. Install Yarn (though I think it all works with NPM as well):
This will also install Node.js if already installed.
```
brew install yarn
```
4. Install all the packages required for the project:
```
yarn install
```
5. Run the tests (if you have to):
```
yarn test
```
6. Then run the server...:
```
yarn start
```
