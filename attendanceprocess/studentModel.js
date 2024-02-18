const mongoose = require('mongoose');

//create schema

const studentSchema = new mongoose.Schema(
	{
		studentName: {
			type: String,
			required: true,
			min: 3,
			max: 256
		},
		studentEmail: {
			type: String,
			required: true,
			min: 6,
			max: 256
		},
		studentRollNo: {
			type: String,
			required: true
		},
		department: {
			type: String,
			required: true,
			min: 3,
			max: 256
		},
		currentYear: {
			type: Number,
			required: true
		},
		classSec: {
			type: String,
			required: true
		},
		classYear: {
			type: Number,
			required: true
		},
		parentId: {
			type: String,
			required: true
		},
		mentorId: {
			type: Array,
			required: true
		}
	},
	{ collection: 'student attendance details' }
);

module.exports = mongoose.model('student', studentSchema);
