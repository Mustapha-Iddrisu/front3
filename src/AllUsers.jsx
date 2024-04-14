import React from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import "./styling/general.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




function AllUsers() {
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get("https://mernbackend-tcbk.onrender.com/api/all-users", users)
      .then((result) => {
        console.log(result);
        setUsers(result.data.users);
        setNumOfUsers(result.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUserHandler = (id,name)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete("https://mernbackend-tcbk.onrender.com/api/delete-user/"+id)
    .then((result)=>{
        Swal.fire(name +" has been successfully deleted");
        location.reload()
    })
    .catch((error)=>{
        console.log(error)
    })
    .finally(()=>{
        navigate("/")
    })
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

    
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-success vh-100 row"
      id="mainbody">
      <div className=" p-3 d-flex rounded col-auto row bg-white border-1">
        <div className="d-flex bg-dark bg-gradient d-flex p-2 justify-content-between mb-2 text-black">
          <h2 className=" text-white">All users({numOfUsers})</h2>
          <Link to={"/create-user"} className="btn- btn-primary text-white">
            Add user(<IoPersonAddSharp/>)
          </Link>
        </div>

        <div className="d-flex">
          <table className="table">
            <thead>
              <tr>
                <th>&#8470;</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => {
                return (
                  <>
                    <tr key={user._id}>
                      <td>{index+1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.city}</td>
                      <Link to={`/update-user/${user._id}`} className="btn btn-success"><FaUserEdit /></Link>
                      <button className="btn btn-outline-danger m-1"
                      onClick={()=>deleteUserHandler(user._id,user.name)}>
                        <MdDelete /></button>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
