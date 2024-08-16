import { Router } from 'express'
import postFormDetails from "../controller/form.controller.js"
import FormDetails from '../models/form.js'

const formRouter = Router()

formRouter.post('/',postFormDetails)
formRouter.get('/', async (req,res) =>{
    const formDetails = await FormDetails.find();
    console.log(formDetails);
    res.json(formDetails);
})

export default formRouter