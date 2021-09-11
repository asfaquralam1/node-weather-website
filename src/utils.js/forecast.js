const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=babed03ff41c22c4878ef3f1954f9e96&query=' + latitude + ',' + longitude + ' &units=f'

    // url = 'http://api.weatherstack.com/current?access_key=babed03ff41c22c4878ef3f1954f9e96&query=37.8267,-122.4233&units=f'

    request({url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find the location.', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions + '. It is Currently ' + body.current.temperature + ' drgress out. There is ' + body.current.precip + '% chance of rain')

        }
    })
}

module.exports = forecast