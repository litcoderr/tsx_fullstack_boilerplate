import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserDialog from './UserDialog';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {mapStatetoProps, mapDispatchtoProps} from "../redux/functionMap";
import queryString from "query-string";

const styles = theme => ({
  root: {
    position: 'relative'
  },
  editButton: {

  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%,0%)'
  },
  userButton: {
    marginLeft: 'auto'
  },
  appBar: {
    background: '#142348'
  },
  appBarSpacer: theme.mixins.toolbar
});

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen : false,
      dialogValue : "GUEST"
    };

    this.handleClickOpen = () => {
      this.setState({dialogOpen : true})
    };
    this.handleClose = value => {
      this.setState({dialogOpen : false, dialogValue : value});
    };

    // Configure edit view
    if(this.props.is_edit_view){
      this.editbtn_text = "SAVE";
      this.editBtn_onclick = () => {
        // Save results
      };
    }else{
      this.editbtn_text = "EDIT";
      this.editBtn_onclick = () => {
        if(this.props.loginState.isLogged){  // Only allow edit view when logged in
          let query = queryString.parse(this.props.location.search);
          let session_id = query.session_id;
          let url = "/edit?session_id=" + session_id;
          this.props.history.push(url);
        }else{
          alert('Please Login');
        }
      };
    }
  };

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="fixed">
            <Toolbar>
              <Button disabled={this.props.isWelcome} variant="outlined" color="inherit" className={classes.editButton} onClick={this.editBtn_onclick}><b>{this.editbtn_text}</b></Button>
              <Typography variant="h6" className={classes.title}>
                <Link to='' style={{textDecoration: 'none', color: 'white'}}>
                  <b>B A B Y A K</b>
                </Link>
              </Typography>
              <Button disabled={this.props.isWelcome} color="inherit" className={classes.userButton} onClick={this.handleClickOpen}><b>{this.state.dialogValue}</b></Button>
              <UserDialog selectedValue={this.state.dialogValue}
                             isOpen={this.state.dialogOpen}
                             onClose={this.handleClose}
              />
            </Toolbar>
          </AppBar>
          <div className={classes.appBarSpacer} />
        </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withStyles(styles)(withRouter(ButtonAppBar)));

let TestButtonAppBar = withStyles(styles)(ButtonAppBar);
export {TestButtonAppBar};
