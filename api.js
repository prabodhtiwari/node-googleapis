
'use strict';

const request = require('request')
const rp = require('request-promise');
const fs = require('fs');
const fsp = require('fs-promise');
const url = 'https://www.googleapis.com/oauth2/v4/token'

module.exports =  {

    getTokens(file, code) {
        return fsp.readFile(file, {
            encoding: 'utf8'
        })
            .then(fileData => JSON.parse(fileData))
            .then(fileData => getTokenFromData(code, fileData))
            .then(formData => sendRequest(formData))

    },

    refreshToken(file, refreshToken) {
        return fsp.readFile(file, {
            encoding: 'utf8'
        })
            .then(fileData => JSON.parse(fileData))
            .then(fileData => getRefreshTokenFromData(refreshToken, fileData))
            .then(formData => sendRequest(formData))
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

const getTokenFromData = (code, fileData) => {
    return {
        code: code,
        client_id: fileData.web.client_id,
        client_secret: fileData.web.client_secret,
        redirect_uri: '',
        grant_type: 'authorization_code',
    }
}

const getRefreshTokenFromData = (refreshToken, fileData) => {
    return {
        refresh_token: refreshToken,
        client_id: fileData.web.client_id,
        client_secret: fileData.web.client_secret,
        grant_type: 'refresh_token',
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