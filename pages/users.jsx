import React from 'react'
import * as yup from "yup";
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import { useFormik} from 'formik';
import axios from 'axios';

const users = () => {

  const {values, errors, handleBlur, handleChange,handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: (values)=>{
      const {data} = axios.post('/api/manage',{values: values})
      console.log(data);
    },
  })

  return (
    <Layout>
        <div className="flex">
          <SidebarDashboard/>
          <form onSubmit={handleSubmit} className="p-8 w-full">
            <div className=" md:flex justify-between w-full p-4">
              <label htmlFor="firstName" className="text-red-primary">First Name</label>
              <input
                type="text"
                autoComplete="off"
                name="firstName"
                id="firstname"
                placeholder='First Name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-md border-r-2"
              />
              <p className="text-red-400">{errors.firstName}</p>
            </div>
            <div className=" md:flex justify-between w-full p-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                autoComplete="off"
                name="lastName"
                id="lastname"
                placeholder='Last Name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-md border-r-2"
              />
              <p className="text-red-400">{errors.lastName}</p>
            </div>
            <div className=" md:flex justify-between w-full p-4">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                autoComplete="off"
                name="contact"
                id="Contact Number"
                placeholder='Contact Number'
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-md border-r-2"
              />
              <p className="text-red-400">{errors.contact}</p>
            </div>
            <div className=" md:flex justify-between w-full p-4">
              <label htmlFor="address1">Address 1</label>
              <input
                type="text"
                autoComplete="off"
                name="address1"
                id="Address 1"
                placeholder='Address Line 1'
                value={values.address1}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-md border-r-2"
              />
              <p className="text-red-400">{errors.address1}</p>
            </div>
            <div className=" md:flex justify-between w-full p-4">
              <label htmlFor="address2">Address 2</label>
              <input
                type="text"
                autoComplete="off"
                name="address2"
                id="Address 2"
                placeholder='Address Line 2'
                value={values.address2}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-md border-r-2"
              />
              <p className="text-red-400">{errors.address2}</p>
            </div>
            <div className="pt-4">
              <button type='submit' className='primary-button'>Register</button>
            </div>
          </form>
        </div>
    </Layout>
  )
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};
export default users