
const fs = require('fs').promises;
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3278;
const auth = require('./middleware.js')

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

getFilePath = (route) => {
	return `db/${route}.json`;
}

startServer = (cb) => {
	server = app.listen(PORT, () => {
		console.log('Server started on port:', PORT);
		cb();
	});
}

startRouter = () => {
	app.post('/:route', auth, async (req, res) => {
		const route = req.params.route;
		if (!route || route.length < 2) {
			res.status(400).send('Wrong route name, too short or simply wrong.');
		}
		if (!req.body) {
			res.status(400).send('No data provided for storage.');
		}

		try {
			await fs.writeFile(getFilePath(route), JSON.stringify(req.body));
			res.status(200).send('Your data is saved for now.');
		} catch {
			res.status(404).send('Could not save data');
		}
	});
	  
	app.get('/:route', async (req, res) => {
		const route = req.params.route;
		try {
			const content = await fs.readFile(getFilePath(route), 'utf8');
			res.status(200).send(JSON.parse(content));
		} catch {
			res.status(404).send('Wrong endpoint, no data yet');
		}
		
	});
}


module.exports = {

	startServer: startServer,
	startRouter: startRouter

};
