const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()

app.use(express.urlencoded())

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(express.static('public'))
app.use('/js',express.static('js'))
app.use('/css',express.static('css'))
app.use('/images',express.static('images'))
app.use('/fonts',express.static('fonts'))

var pgp = require('pg-promise')()
var connectionString = 'postgres://ckzcxula:v1kHXRai39AhI9eZQJE6h_EgdNDAA-00@salt.db.elephantsql.com:5432/ckzcxula'
var db = pgp(connectionString)



app.get('/',(req,res) => {
    db.any('SELECT callstatus, recordid, calldatetime, callpriority, locationdistrict, locationbeat, incidentdescription, respondingunit FROM incidents')
    .then((incidents) => {
        res.render('index',{incidents: incidents})
    })
})

app.get('/add-incident',(req,res) => {
    res.render('add-incident')
})

app.get('/update-incident/:recordid',(req,res) => {
    let recordid = parseInt(req.params.recordid)

    db.one('SELECT * FROM incidents WHERE recordid = $1', [recordid])
    .then((incident) => {
        res.render('update-incident',incident)
    })
})

app.post('/add-incident',(req,res) => {
    let callstatus = req.body.callstatus
    let callpriority = req.body.callpriority
    let locationdistrict = req.body.locationdistrict
    let locationbeat = req.body.locationbeat
    let incidentdescription = req.body.incidentdescription
    let locationaddress = req.body.locationaddress
    let locationcity = req.body.locationcity
    let locationzipcode = req.body.locationzipcode
    let locationneighborhood = req.body.locationneighborhood
    let respondingunit = req.body.respondingunit
    let incidentnotes = req.body.incidentnotes

    db.none('INSERT INTO incidents(callstatus, callpriority, locationdistrict, locationbeat, incidentdescription, locationaddress, locationcity, locationzipcode, locationneighborhood,respondingUnit, incidentnotes) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[callstatus,callpriority,locationdistrict,locationbeat,incidentdescription,locationaddress,locationcity,locationzipcode,locationneighborhood,respondingunit,incidentnotes])
    .then(() => {
        res.redirect('/')
    })
})

app.post('/update-incident',(req,res) => {
    let callstatus = req.body.callstatus
    let calldatetime = req.body.calldatetime
    let callpriority = req.body.callpriority
    let locationdistrict = req.body.locationdistrict
    let locationbeat = req.body.locationbeat
    let incidentdescription = req.body.incidentdescription
    let locationaddress = req.body.locationaddress
    let locationcity = req.body.locationcity
    let locationzipcode = req.body.locationzipcode
    let locationneighborhood = req.body.locationneighborhood
    let respondingunit = req.body.respondingunit
    let incidentnotes = req.body.incidentnotes
    let recordid = req.body.recordid


    db.any('UPDATE incidents SET callstatus = ($2), callpriority = ($4), locationdistrict = ($5), locationbeat = ($6), incidentdescription = ($7), locationaddress = ($8), locationcity = ($9), locationzipcode = ($10),locationneighborhood = ($11), respondingunit = ($12), incidentnotes = ($13) WHERE recordid = ($1)',[recordid,callstatus,calldatetime,callpriority,locationdistrict,locationbeat,incidentdescription,locationaddress,locationcity,locationzipcode,locationneighborhood,respondingunit,incidentnotes])
    .then(() => {
        res.redirect('/')
    })
})

app.get('/incident/:recordid',(req,res) => {
    let recordid = req.params.recordid

    db.one('SELECT * FROM incidents WHERE recordID = $1', [recordid])
    .then((incident) => {
        res.render('incident',incident)
    })
})

app.get('/view-map',(req,res) => {
    let address = req.query.address
    let city = req.query.city
    
    res.render('view-map',{address: address, city: city})
})

app.listen(3000,() => {
    console.log('Server running')
})