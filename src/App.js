import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import { hot } from "react-hot-loader/root";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const useStyles = makeStyles((theme) => ({
  loginbutton: {
    float: "right",
    marginTop: "5px",
    marginRight: "20px",
    backgroundColor: "#c8e1ff",
    color: "rgba(0, 0, 0, 0.26)",
    boxShadow: "none",
  },
  sideBar: {
    position: "absolute",
    width: "15%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
  span: {
    color: "rgba(0, 0, 0, 0.54);",
    fontSize: "14px",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <header
        style={{
          position: "absolute",
          height: "8%",
          width: "100%",
          zIndex: "100",
          backgroundColor: "#c8e1ff",
        }}
      >
        <IconButton style={{ marginRight: "20px" }}>
          <MenuRoundedIcon />
        </IconButton>

        <Button
          className={classes.loginbutton}
          variant="contained"
          startIcon={<AccountCircleRoundedIcon />}
        >
          로그인
        </Button>
      </header>
      <div className={classes.sideBar}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <MenuBookRoundedIcon fontSize="big" />
            </ListItemIcon>
            <span className={classes.span}>
              A very long text that overflows
            </span>
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <HomeRoundedIcon fontSize="big" />
            </ListItemIcon>
            <span className={classes.span}>Main</span>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AssignmentRoundedIcon fontSize="big" />
            </ListItemIcon>
            <span className={classes.span}>자유게시판</span>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SupervisorAccountRoundedIcon fontSize="big" />
            </ListItemIcon>
            <span className={classes.span}>일상 피드</span>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MenuBookRoundedIcon fontSize="big" />
            </ListItemIcon>
            <span className={classes.span}>공부할래요</span>
          </MenuItem>
        </MenuList>
      </div>
    </>
  );
};
export default hot(App);
