import ClipLoader from "react-spinners/ClipLoader";
import "./Loader.scss";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader__back" />
          <div className="loader__icon">
            <ClipLoader
              color="#e30613"
              speedMultiplier={0.8}
              size={80}
              aria-label="Cargando"
            />
            <p>Cargando</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
