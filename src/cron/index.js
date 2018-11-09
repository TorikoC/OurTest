const CronJob = require('cron').CronJob;
const User = require('user');

const job = new CronJob('0 0 1 * * *', function() {
	const d = new Date();
	console.log('Every day at 1:00am,', d);
});



