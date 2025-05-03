## Furia Chatbot Project ##

This is a project made for the CS Team Furia screening process and it has a prototype chatbot that also uses userdata and allows the team to potencially research the data futher for more improvements and for statistics.

### Features ###

- Chatbot with integrated AI API

- Next games and team roaster

- Statistics to analyse data

- Intuitive graphs to help the team

### How to setup ###

- Download or clone this github repository

- Run setup.py to install required dependencies (must run with permissions to install the said dependencies else it might not work)

- Run run.py and you are good to go!

## Full Documentation ##

This a chatbot project for the CS Team Furia, and the bot is made using react in the frontend and using python on the backend, the language choice is based on the languages used in Furia and the chatbot is developed in a way that it could be scaled to a full chatbot as well.

This chatbot uses openAI API to call the claude API and returns a string, an answer based on the user's input while also using data that is hard-enconded into the chatbot for absolute fact-checking and to avoid that the chatbot speaks confidential information. The chatbot also keeps track of the users topics of interest to use that for futher analytics, and it stores it in a txt file, althrough in an actual implementation it would be recommended to use PostGreSQL to match it with user-id and other user data. The chatbot also contains a screen to analyse the statstics of the users and help the team to find futher insights into what is the trend and are the users mostly researching about, this uses a js library to create intuitive graphs for easier visualization.


#### Chat ####

![スクリーンショット 2025-05-03 184706](https://github.com/user-attachments/assets/e27cf97d-2721-4fe1-a1bd-2a4fdaf34987)

The chat contains the main chatbot part, it is powered by the backend chatbot.py and it calls claude with the OpenAI API key, then it compares the user input and based on the database inside chatbot.py (or the data set), it replies with the accurate knolwedge about the quesiton. This chat can be improved with a paid AI API and it can improve if the knowledge is loadede dynamically from a database, for example, however this is a prototype and for simplicity it is all being handled inside the chatbot.py.

The chat can reply most basic questions althrough it struggles from time to time with complex or very long questions (free API token limit), so this is one thing to keep in mind.

![スクリーンショット 2025-05-03 185126](https://github.com/user-attachments/assets/b2d0dbb0-8545-46df-b325-9df292c2235f)

Under the chat we have small screen that its purpose it is to show the active roaster and the next game, in this screenshot and for testing purposes the next game is simulated and not actually real, so keep in mind that it would need to be updated dynamically as well.


#### Chat ####
