import FormDetails from "../models/form.js";

const postFormDetails = async (req, res) => {
  try {
    const formDetails = new FormDetails(req.body);
    await formDetails.save();
    console.log(formDetails);
    return res.status(200).json(formDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error saving form details" });
  }
};

export default postFormDetails
