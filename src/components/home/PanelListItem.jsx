import PropTypes from "prop-types";
import {ButtonBase, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

function PanelListItem(props) {
  const number = props.number;
  const title = props.title;
  const subtitle = props.subtitle;
  const url = props.url;

  const navigate = useNavigate();

  let bg = grey[50];
  if (number % 2 === 0) bg = grey[10];

  return (
    <ButtonBase
      component={Link}
      onClick={() => {
        navigate(url);
      }}
      sx={{py: 2, width: 1, background: bg}}
    >
      <Grid item container spacing={2}>
        <Grid item xs={2} align={"right"}>
          <Typography variant="h6" sx={{mx: 0}}>
            {number}
          </Typography>
        </Grid>
        <Grid item container xs={8} align={"left"} sx={{mx: 2}}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{fontWeight: 'bold'}} fontSize={15}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" fontSize={13}>
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

PanelListItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  url: PropTypes.string
};

export default PanelListItem;