const router = require('./autoload')

const extraRoutes = [
    {
        model:'User', 
        extras:[
            { method: 'GET', endpoint: "generatePDF", callback: 'generatePDF'},
            { method: 'GET', endpoint: ":id/pdf", callback: 'generatePDF2'},
            { method: 'GET', endpoint: ":id/par/:segundo/:tercero", callback: 'muchosParams'}
        ]
    }
]

extraRoutes.forEach(m => router.use('/', require('./Model')(m.model, m.extras)))

module.exports = router