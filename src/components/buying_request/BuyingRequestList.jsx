import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import BuyingRequestRow from "./BuyingRequestRow.jsx";
import PropTypes from "prop-types";

function BuyingRequestList(props) {

  if (!localStorage.getItem("token")) {
    return "Not logged in.";
  } else {
    const buyingRequests = props.buyingRequests;
    const departments = props.departments;
    const user = props.user;
    const role = user.role;

    return (
      <TableContainer sx={{mt: 10}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Phê duyệt trước ngày</TableCell>
              <TableCell>Trạng thái</TableCell>
              {["hr", "manager", "tech"].includes(role) ?
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </> : <></>}
            </TableRow>
          </TableHead>
          <TableBody>
            {buyingRequests.map((buyingRequest) => (
              <BuyingRequestRow key={buyingRequest.id} buyingRequest={buyingRequest} departments={departments}
                                user={user}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

BuyingRequestList.propTypes = {
  buyingRequests: PropTypes.any.isRequired,
  departments: PropTypes.any.isRequired,
  user: PropTypes.any
};

export default BuyingRequestList;