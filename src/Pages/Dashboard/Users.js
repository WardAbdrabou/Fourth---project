import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";

import { Table } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Users() {
  //States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [NoUsers, setNoUsers] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  // console.log(currentUser);

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  //Get  all users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleteUser]);

  //Filter Current User
  // const userFilter = users.filter((user) => user.id !== currentUser.id);
  // console.log(userFilter);

  //mapping on user
  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name === currentUser.name ? user.name + ("(You) " ) : user.name}</td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "admin"
          : user.role === "2001"
          ? "user"
          : "writer"}
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          {currentUser.name !== user.name &&
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            fontSize={"19px"}
            color="red"
            cursor={"pointer"}
            icon={faTrash}
          />
        }
        </div>
      </td>
    </tr>
  ));

  //function handleDelete
  async function handleDelete(id) {
    if(currentUser.id !== id){
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }
  }
  return (
    <div className="bg-white w-100 p-2">
    <div className="d-flex align-items-center justify-content-between">
    <h1>Users Page</h1>
    <Link className="btn btn-primary" to="/dashboard/user/add"> Add user</Link>
    </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center">
                Loading......
              </td>
            </tr>
          ) : users.length === 0 && NoUsers ? (
            <tr>
              <td colSpan={12} className="text-center">
                No Users Found
              </td>
            </tr>
          ) : (
            usersShow
          )}
        </tbody>
      </Table>
    </div>
  );
}
