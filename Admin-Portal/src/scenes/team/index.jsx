import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID",flex: 1},
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "noOfCourses",
      headerName: "Courses",
      type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "noOfMentors",
      headerName: "Mentors",
      type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "noOfJobs",
      headerName: "Jobs/Internships",
      type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "noOfScholarships",
      headerName: "Scholarships",
      type: "number",
      // headerAlign: "left",
      // align: "left",
    },
  ];
  const [rowData, getRowData] = useState([]);
  const navigateTo = useNavigate();
// console.log(navigateTo);
  useEffect(() => {
    const URL = `https://bap-production.up.railway.app/admin/users`;
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
          // console.log(response.data.content);
          getRowData(response.data.content);
        } else {
          console.log("Some error occurred.");
          navigateTo('/login',{replace:true});
          return;
        }
      })
      .catch((err) => {
        navigateTo('/login',{replace:true});
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of all Users" />
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
        <DataGrid checkboxSelection 
          rows={rowData} 
         columns={columns} 
         getRowId={(row) => row._id}
         components={{ Toolbar: GridToolbar }}
         />
      </Box>
    </Box>
  );
};

export default Team;