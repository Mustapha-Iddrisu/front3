import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


function CreateUser() {
    var [name,setName] = useState("")
    var [email,setEmai] = useState("")
    var [city, setCity] = useState("")
    var navigate = useNavigate()

    const data = {
        name,
        email,
        city,
    }

 const addUserHandler = ((e)=>{
    e.preventDefault()
     axios.post("https://mernbackend-tcbk.onrender.com/api/add-user",data)
     .then((result)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User has been created successfully",
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      });
         console.log(result)
         navigate("/")
     })
     .catch((error)=>{
         console.log(error)
     })
 })


  return (
    <div className="d-flex bg-success justify-content-center align-items-center p-4 vh-100 row" id="mainbody">
      <div className="bg-white b-1 rounded p-3 col-auto col-lg-6 row">
        <form className="">
          <h3>Fill in the form below</h3>

          <div className="row">
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                // onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                // onChange={(e) => setEmai(e.target.value)}
                className="form-control"
                placeholder="Enter email"
                onChange={(e)=>setEmai(e.target.value)}
              />
            </div>

            <div className="form-group col-auto col-lg-auto mb-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                // onChange={(e) => setCity(e.target.value)}
                className="form-control" placeholder="Enter city"
                onChange={(e)=>setCity(e.target.value)}
              />
            </div>
          </div>
          <input
            type="button"
            value="submit"
            onClick={addUserHandler}
            className="btn bg-primary col-auto col-lg-auto m-2"
          ></input>
          <Link to={'/'} className="btn bg-danger col-auto col-lg-auto m-2" >Cancel</Link>
        </form>
      </div>
    </div>
  )
}

export default CreateUser