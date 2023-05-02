# certificate-website

- setup AWS credentials in server/.env 
- nvm install 16.18
- nvm use 16.18
- yarn install
- yarn run dev


## install heroku
- brew tap heroku/brew && brew install heroku

# Deploying to Heroku
- heroku login -- login in the browser
- heroku git:remote -a dcert-app
- git push heroku main

- heroku run bash
- heroku logs --tail 

