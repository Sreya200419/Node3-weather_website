const request = require('request')
const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1bd2090411cb430e8c18dcac0b020e0e&query=' +latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike +" degrees out")
        }
    })
}
module.exports = forecast