import { useEffect, useState } from "react";
import axios from "axios";

const CheckboxWithAPI = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const URL = `http://localhost:8080/admin/getGrant/${props.yearOfStudy}`;

    axios
      .get(URL, 
        {
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setIsChecked(response.data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [props]);

  const handleChange = () => {

    if(!confirm("Are you sure you want to change grant of leave?")) return; 

    setIsChecked(!isChecked);

    const URL = `http://localhost:8080/admin/grant/${props.yearOfStudy}`;

    // alert(URL);

    axios
      .post(URL, 
        {
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <label>&nbsp; Grant Leave</label>
    </div>
  );
};

export default CheckboxWithAPI;