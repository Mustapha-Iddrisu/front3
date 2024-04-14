import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const data = {
    name,
    email,
    city,
  };

  useEffect(() => {
      axios
        .get("https://mernbackend-tcbk.onrender.com/api/get-user/" + id)
        .then((result) => {
          let { name, email, city } = result.data;
          setName(name);
          setEmail(email);
          setCity(city);

          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
  
  }, []);

  const submit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put("https://mernbackend-tcbk.onrender.com/api/update-user/" + id, data)
          .then((result) => {
            console.log(result);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "User has been updated successfully",
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div
      className="d-flex bg-success justify-content-center align-items-center p-4 vh-100 row"
      id="mainbody"
    >
      <div className="bg-white b-1 rounded p-3 col-lg-7 col-md-8 row">
        <form className="" onSubmit={submit}>
          <h3>Update form</h3>

          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => alert("email cannot be updated")}
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <input
            className="btn btn-outline-primary m-2"
            type="submit"
            value="Submit"
          ></input>
          <Link to={"/"} className="btn btn-outline-danger">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
