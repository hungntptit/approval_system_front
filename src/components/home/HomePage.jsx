import HomePanel from "./HomePanel.jsx";
import {Grid} from "@mui/material";

function HomePage() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/");
  }
  return (
    <Grid container spacing={2}>
      <HomePanel title={"Nhân sự"} subtitle={"Quản lý nhân sự"} icon={"/talk.png"}/>
      <HomePanel title={"Hành chính"} subtitle={"Quản lý hành chính"} icon={"/employee.png"}/>
      <HomePanel title={"Tài chính kế toán"} subtitle={"Quản lý tài chính"} icon={"/budget.png"}/>
    </Grid>
  );
}

export default HomePage;