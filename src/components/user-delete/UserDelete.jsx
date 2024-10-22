import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, reset } from "../../redux/users/usersSlice";
import Loader from "../loader/Loader";

import "./UserDelete.scss";

const UserDelete = ({ userData, deleting, setDeleting }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, message } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    setDeleting(false);
  }, [isSuccess]);

  const handleAccept = () => {
    dispatch(deleteUser(userData._id));
  };

  const handleCancel = () => {
    setDeleting(false);
  };

  return (
    <>
      {deleting && (
        <>
          <Loader loading={isLoading} />

          <div className="user-delete">
            <div className="user-delete__back" />
            <div className="user-delete__container">
              <p className="user-delete__title">Borrar cuenta de usuario</p>
              <p className="user-delete__error">{message}</p>

              <p className="user-delete__text">
                ¿Quieres borrar la cuenta de {userData.name}?
              </p>

              <div className="user-delete__buttons">
                <button onClick={handleAccept} className="user-delete__button">
                  Aceptar
                </button>

                <button
                  type="reset"
                  onClick={handleCancel}
                  className="user-delete__button user-delete__button--cancel"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDelete;
