import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import {useState} from "react";


function BuyingRequestEditForm(props) {
  const user = props.user;
  const departments = props.departments;

  const [buyingRequest, setBuyingRequest] = useState({
    id: props.buyingRequest.id,
    user_id: props.buyingRequest.user_id,
    department_id: props.buyingRequest.department_id,
    title: props.buyingRequest.title,
    description: props.buyingRequest.description,
    approve_before: moment(props.buyingRequest.approve_before, "YYYY-MM-DDTHH:mm").format("DD/MM/YYYY HH:mm"),
    place: props.buyingRequest.place,
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setBuyingRequest({
      ...buyingRequest,
      [name]: value,
    });

    console.log(buyingRequest);
  };

  function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());


    formJson["user_id"] = user.id;
    formJson["department_id"] = parseInt(formJson["department_id"]);
    const approveBefore = moment(formJson["approve_before"], "DD/MM/YYYY HH:mm");
    formJson["approve_before"] = approveBefore.format("YYYY-MM-DD HH:mm");

    const today = new Date();

    if (approveBefore.toDate() < today) {
      window.alert("Ngày phê duyệt từ thời điểm hiện tại.");
      return;
    }

    console.log(formJson);

    axios.put(
      `http://${import.meta.env.VITE_API_HOSTNAME}:${import.meta.env.VITE_API_PORT}/buying_requests/` + buyingRequest.id,
      JSON.stringify(formJson),
      {
        params: {
          action: "update"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200)
          if (window.confirm("Cập nhật yêu cầu mua hàng thành công.")) {
            window.location.replace("/buying_requests");
          }
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.detail);
      });
  }


  function handleRoomChange(e, capacity) {
    console.log(capacity);
  }

  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const departments = props.departments;
    return (
      <form method={"put"} onSubmit={submitHandler} style={{}}>
        <Box component={Paper} sx={{p: 5}}>
          <TextField
            sx={{m: 1}}
            label="Tiêu đề"
            type={"text"}
            name={"title"}
            fullWidth
            size={"small"}
            required
            value={buyingRequest.title}
            onChange={handleChange}
          />
          <br/>
          <TextField
            sx={{m: 1}}
            multiline
            rows={8}
            label="Mô tả"
            type={"text"}
            name={"description"}
            fullWidth
            size={"small"}
            required
            value={buyingRequest.description}
            onChange={handleChange}
            inputProps={{maxLength: 500}}
          />
          <TextField
            sx={{m: 1}}
            label="Phê duyệt trước ngày"
            placeholder="DD/MM/YYYY hh:mm"
            type={"text"}
            name={"approve_before"}
            inputProps={{
              type: "text",
              pattern: "^([1-9]|([012][0-9])|(3[01]))\\/([0]{0,1}[1-9]|1[012])\\/\\d\\d\\d\\d\\s([0-1]?[0-9]|2?[0-3]):([0-5]\\d)$",
            }}
            fullWidth
            size={"small"}
            required
            value={buyingRequest.approve_before}
            onChange={handleChange}
          />
          <TextField
            sx={{m: 1}}
            label="Địa điểm"
            type={"text"}
            name={"place"}
            fullWidth
            size={"small"}
            required
            value={buyingRequest.place}
            onChange={handleChange}
          />
          <FormControl sx={{m: 1}} fullWidth
                       size={"small"} required
          >
            <InputLabel
              // id="demo-simple-select-label"
            >Phòng ban</InputLabel>
            <Select
              defaultValue=""
              fullWidth
              autoWidth={false}
              size={"small"}
              label="Phòng ban"
              name="department_id"
              value={buyingRequest.department_id}
              onChange={handleChange}
              // onChange={handleRoomChange}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button sx={{my: 2}} variant="contained" type={"submit"}>Cập nhật yêu cầu</Button>
      </form>
    )
      ;
  }
}

BuyingRequestEditForm.propTypes = {
  buyingRequest: PropTypes.any.isRequired,
  departments: PropTypes.any.isRequired,
  user: PropTypes.any
};

export default BuyingRequestEditForm;