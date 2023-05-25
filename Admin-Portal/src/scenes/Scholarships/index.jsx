import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CheckboxWithAPI from "./Checkbox";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Scholarships = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mobile",
      headerName: "Contact",
      // type: "number",
      flex: 1,
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "yearOfStudy",
      headerName: "Year Of Study",
      // type: "number",
      flex: 1,
      // headerAlign: "left",
      // align: "left",
    },
    {
        field: "prn",
        headerName: "PRN",
        // type: "number",
        flex: 1,
        // headerAlign: "left",
        // align: "left",
      },
      {
        field: "lastLoggedIn",
        headerName: "Last Logged In Time",
        // type: "number",
        flex: 1,
        // headerAlign: "left",
        // align: "left",
      },
   
  ];

  const [rowData, getRowData] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    const URL = `https://suraksha.onrender.com/admin/${props.yearOfStudy}`;

    // alert(URL);

    axios
      .get(URL, 
        {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // console.log(response);
          getRowData(response.data);
        } else {
          alert("Some error occurred.");
          navigateTo('/login',{replace:true});

          return;
        }
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
        navigateTo('/login',{replace:true});
        // window.location = "/login";
        return;
      });
  }, [props]);


  return (
    <Box m="20px">
      <Header
        title="USERS"
        subtitle="List of all users registered with Suraksha"
      />
      <CheckboxWithAPI yearOfStudy={props.yearOfStudy}/>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rowData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Scholarships;