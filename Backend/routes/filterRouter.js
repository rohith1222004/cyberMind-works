import {Router} from 'express';
import FormDetails from '../models/form.js';

const filterRouter = Router();

filterRouter.get('/', async (req, res) => {
  try {
    const { location, jobType, minSalary, maxSalary, searchQuery } = req.query;

    const filter = {};

    if (location) {
      filter.location = location;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      filter.salaryStart = {};
      if (minSalary) filter.salaryStart.$gte = parseInt(minSalary);
      if (maxSalary) filter.salaryStart.$lte = parseInt(maxSalary);
    }

    if (searchQuery) {
      filter.$or = [
        { jobTitle: { $regex: searchQuery, $options: 'i' } },
        { role: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    // console.log("fileter",filter);
    
    const jobs = await FormDetails.find(filter);
    //jobs
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default filterRouter;
