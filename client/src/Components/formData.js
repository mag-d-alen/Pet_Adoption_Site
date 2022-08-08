import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").max(15).required("Required"),
  type: Yup.string().required("Required"),
  adoptionStatus: Yup.string().required("Required"),
  picture: Yup.string(),
  color: Yup.string()
    .min(3, "Please enter correct color")
    .max(15)
    .required("Required"),
  bio: Yup.string().max(250),
  dietaryRestrictions: Yup.string().max(150),
  breed: Yup.string().min(3, "Please enter correct breed").required("Required"),
  weight: Yup.number()
    .positive()
    .max(20, "Are you sure that the pet weights more than 20 kg?")
    .typeError("Please enter the correct weight")
    .required("Required"),
  height: Yup.number()
    .positive()
    .max(160, "Are you sure that the pet is taller than 160cm?")
    .typeError("Please enter the correct height")
    .required("Required"),
  hypoallergenic: Yup.boolean().required(),
});
export const types = ["cat", "dog", "turtle", "piglet", "snake", "chinchilla"];
export const adoptionStatuses = ["available", "fostered", "adopted"];
