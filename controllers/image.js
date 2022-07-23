const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '30f517b353a54ee091b269cb1bd3660e'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('API call unsuccessful'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries);
		})
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}