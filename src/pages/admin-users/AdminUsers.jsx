import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, reset } from "../../redux/users/usersSlice.js";

import AdminZone from "../../guards/AdminZone";
import Loader from "../../components/loader/Loader";
import Topbar from "../../components/topbar/Topbar";
import UserEdit from "../../components/user-edit/UserEdit.jsx";

import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/trash.svg";

import "./AdminUsers.scss";

const AdminUsers = () => {
  const initialState = {
    name: "",
    email: "",
    role: "",
  };
  const [selectedUser, setSelectedUser] = useState(initialState);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();
  const { users, user, isSuccess, isLoading } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [user]);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
  }, [isSuccess]);

  const handleEdit = (userData) => {
    setSelectedUser(userData);
    setEditing(true);
  };

  const handleDelete = (userData) => {
    setSelectedUser(userData);
    setDeleting(true);
  };

  return (
    <AdminZone>
      <div className="page">
        <Loader loading={isLoading} />

        <Topbar path="/" />

        <UserEdit
          userData={selectedUser}
          editing={editing}
          setEditing={setEditing}
        />

        <section className="admin-user">
          {users.map((user) => (
            <div key={user._id} className="admin-user__card">
              <p className="admin-user__role">{user.role}</p>
              <p className="admin-user__name">{user.name}</p>

              <div className="admin-user__buttons">
                <button
                  onClick={() => handleEdit(user)}
                  className="admin-user__edit"
                >
                  <img src={editIcon} alt="edit icon" />
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="admin-user__delete"
                >
                  <img src={deleteIcon} alt="delete icon" />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminZone>
  );
};

export default AdminUsers;
