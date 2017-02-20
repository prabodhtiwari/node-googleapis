# node-googleapis

Javascirpt library for getting accessToken from authToken or refreshToken and getting userInfo for scope

- npm (Node.js package manager)

```bash
npm install node-googleapis --save
```

### Usage

Modular include:

```javascript
const api = require('node-googleapis');
...

const file = '/home/ubuntu/client_secret.json'
var auth_token = '****************************'
const scope = 'https://www.google.com/m8/feeds/contacts/default/thin/?alt=json&max-results=10000'

api.init(file) // initialize api with client_id and client_secret

api.getTokens(auth_token)
.then(tokens =>  console.log(tokens)) // refresh_token, access_token
.catch(err => console.log(err))

api.refreshToken(file,tokens.refresh_token)
.then(tokens => console.log(tokens)) // new access_token
.catch(err => console.log(err))

api.scopeData(scope, tokens.accessToken)
.then(data => console.log(data))
.catch(err => console.log(err))

```