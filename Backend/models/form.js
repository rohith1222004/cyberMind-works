import mongoose from 'mongoose'

const formDetailsSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  salaryStart: {
    type: String,
    required: true,
    trim: true,
  },
  salaryEnd: {
    type: String,
    required: true,
    trim: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true,
});

const FormDetails = mongoose.model('FormDetails', formDetailsSchema);

export default FormDetails;
