#Startup Launchpad - Chatbot Hackathon

This is a chatbot that simulates a model car salesman.

To run:
```bash
#open a new terminal
mongod

#open a second terminal

#open the project directory
cd inventory-chatbot

#install dependencies
npm install

#start the server
npm start
```

It responds to messages like:
* hello!
* what do you sell?
* how many 1939 cadillac limousines do you have?
* tell me about the 1995 Honda Civic.
* how much does the 1998 Chrysler Plymouth Prowler cost?
* I will buy a 1948 Porsche 356-A Roadster.

The model car data is pulled from a Mongo database of model cars. If you buy something, then the stock will decrease by 1.