
const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geoCode')
const express = require('express')
const hbs = require('hbs')
const app = express()
//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 
// setup handle bars and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve

app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Sreya S'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'SREYA S'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        message: "we are here to help",
        name: 'Sreya'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecasr: forecastData,
                location,
                adddress: req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'its raining',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
res.send({

    products: []
})
})
app.get('/help/*',(req,res)=>{
res.render('404',{
title: '404',
name: 'Sreya',
errorMessage: 'Help article not found'
})
})
app.get('*',(req,res)=>{
   res.render('404',{
    title: '404',
    name: 'Sreya',
    errorMessage: 'Page not found'
   })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})