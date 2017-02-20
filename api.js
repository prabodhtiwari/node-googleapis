
'use strict';

const request = require('request')
const rp = require('request-promise');
const fs = require('fs');
const fsp = require('fs-promise');
const url = 'https://www.googleapis.com/oauth2/v4/token'
let client_id = ''
let client_secret = ''
const GRANT_TYPE_AUTH = 'authorization_code'
const GRANT_TYPE_REFRESH = 'refresh_token'

module.exports = {

    init(file) {
        var fileData = JSON.parse(fs.readFileSync(file, 'utf8'));
        client_id = fileData.web.client_id
        client_secret = fileData.web.client_secret
    },

    getTokens(code) {
        if (!!client_id && !!client_secret) {
            const formData = getTokenFromData(code, GRANT_TYPE_AUTH)
            return sendRequest(formData)
        } else {
            console.log("Client_id or secret not provided")
        }

    },

    refreshToken(refreshToken) {
        if (!!client_id && !!client_secret) {
            const formData = getRefreshTokenFromData(refreshToken, GRANT_TYPE_REFRESH)
            return sendRequest(formData)
        } else {
            console.log("Client_id or secret not provided")
        }
    },

    scopeData(scope, accessToken) {
        const options = {
            url: scope,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        return rp(options)
    }

}

const getTokenFromData = (code, grantType) => {
    return {
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: '',
        grant_type: grantType,
    }
}

const getRefreshTokenFromData = (refreshToken, grantType) => {
    return {
        refresh_token: refreshToken,
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grantType,
    }
}

const sendRequest = (formData) => {
    var options = {
        method: 'post',
        form: formData,
        json: true,
        url: url,
    }
    return rp(options)
}