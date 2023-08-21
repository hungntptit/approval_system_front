import PanelList from "./PanelList.jsx";
import {Card, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";
import PropTypes from "prop-types";
import {Image} from 'mui-image';


function HomePanel(props) {
  const icon = props.icon;
  const title = props.title;
  const subtitle = props.subtitle;
  return (
    <Grid item container xs={4} sx={{mt: 10}}>
      <Card sx={{py: 1}} variant="outlined">
        <Grid item container>
          <Grid item container xs={3} alignItems="center" justifyContent="center">
            <Image width={36} height={36} src={icon} sx={{ml: 1}}/>
          </Grid>
          <Grid item align={"left"} sx={{m: 2}}>
            <Typography variant="h6" color={grey[900]}
                        sx={{fontWeight: 'bold'}}>
              {title}
            </Typography>
            <Typography variant="body1" color={grey[700]}>
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
        <PanelList title={title}/>
      </Card>
    </Grid>
  );
}

HomePanel.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default HomePanel;