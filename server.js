const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/*', (req,res) => {
	res.json({ok: true})
})

app.get('/jazzCharts', (req,res) => {
	res.json({wilbe: "JazzCharts soon!"})
})

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`)
})

module.exports = {app}
