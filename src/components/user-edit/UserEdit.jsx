import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateUser } from "../../redux/users/usersSlice";

import Loader from "../loader/Loader";

import "./UserEdit.scss";

const UserEdit = ({ userData, editing, setEditing }) => {
  const [formData, setFormData] = useState(userData);
  const { isSuccess, isLoading, message } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  useEffect(() => {
    if (!isSuccess) return;
    setEditing(false);
    dispatch(reset());
  }, [isSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({ userId: userData._id, formData }));
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <>
      {editing && (
        <>
          <Loader loading={isLoading} />

          <div className="user-edit">
            <div className="user-edit__back" />
            <div className="user-edit__container">
              <p className="user-edit__title">Editar Usuario</p>
              <p className="user-edit__error">{message}</p>
              <form onSubmit={handleSubmit}>
                <div className="user-edit__input">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="user-edit__input">
                  <label htmlFor="email">Email:</label>
                  <input
                    name="email"
                    id="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="user-edit__input">
                  <label htmlFor="role">Role:</label>
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user" className="user-edit__option">
                      User
                    </option>
                    <option value="admin" className="user-edit__option">
                      Admin
                    </option>
                  </select>
                </div>

                <div className="user-edit__buttons">
                  <button type="submit" className="user-edit__button">
                    Aceptar
                  </button>

                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="user-edit__button user-edit__button--cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserEdit;
