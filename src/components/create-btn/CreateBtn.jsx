import plusIcon from "../../assets/icons/plus-small.svg";

import "./CreateBtn.scss";

const CreateBtn = ({ setShow }) => {
  return (
    <button onClick={() => setShow(true)} className="create-btn">
      <img src={plusIcon} alt="add icon" />
    </button>
  );
};

export default CreateBtn;
