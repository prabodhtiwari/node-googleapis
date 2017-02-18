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
var code = '****************************'
const scope = 'https://www.google.com/m8/feeds/contacts/default/thin/?alt=json&max-results=10000'

const tokens = await api.getTokens(file,code)
                .catch(err => console.log(err))

const refreshedToken = await api.refreshToken(file,tokens.refresh_token)
                        .catch(err => console.log(err))

api.scopeData(scope, accessToken)
    .then(data => console.log(data))
    .catch(err => console.log(err))

```