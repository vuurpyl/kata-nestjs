1. run: docker compose up
2. run dans un autre console: npm install
3. run: npm run start
4. go to: localhost:3001/api/events/docs you will see swagger

Exercices
1. Complete the code to create and save in the database an event. All fields of events entity are mandatory
2. Complete the code to get one event by ID
3. Protect the api by accepting only http requests that have a header "Authorization: Basic bG9naW46cGFzcw==" ottherwise throw 401 exception
4. Add event moderators entity. one event have many moderators. A moderator is defined by firstname, lastname, email, phone.
We want create and associate a moderator to an event via POST http://localhost:3001/api/events/{eventId}/moderators
