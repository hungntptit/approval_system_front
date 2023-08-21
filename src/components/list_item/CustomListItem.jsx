import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";

function CustomListItem(props) {
  const sx = props.sx;
  const text = props.text;
  const href = props.href;
  const onClick = props.onClick;
  const icon = props.children;

  return (
    <ListItem disablePadding>
      <ListItemButton href={href} onClick={onClick} sx={sx}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItemButton>
    </ListItem>
  );
}

CustomListItem.propTypes = {
  sx: PropTypes.any,
  text: PropTypes.any.isRequired,
  icon: PropTypes.any,
  onClick: PropTypes.any,
  href: PropTypes.any
};

export default CustomListItem;