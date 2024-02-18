const attendance = require('./attendanceModel');
studentList = [ 'Balaji', 'Kaleeswaran' ];
//to find absentees
const Absentees = require('./absentInform');

//getting all the data
const putAttendance = async (req, res) => {
	//put attendance
	const Attendance = new attendance({
		present: true,
		studentList: studentList,
		date: Date.now()
	});
	try {
		const savedAttendance = await Attendance.save();

		console.log('it works' + ' ' + savedAttendance);
	} catch (err) {
		console.log(err);
		console.log('not work');
	}
	//to getting all information of attendance
	const dateSession = await attendance.find({});
	console.log(dateSession);
	//after putting attendance then we have to findout the list of absentees array
	Absentees(dateSession[dateSession.length - 1].studentList, dateSession[dateSession.length - 1].date);
	console.log(dateSession[dateSession.length - 1].studentList + dateSession[dateSession.length - 1].date);
};

module.exports = putAttendance;
