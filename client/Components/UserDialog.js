import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class UserDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isNewUserOpen : false,
            nicknameError : "",
            passwordError : "",
            users: [
                {
                    name: "Sunghwan",
                    id: "00001"
                },
                {
                    name: "James",
                    id: "00002"
                }
            ]
        };

        this.handler = {
            mainClose : () => {
                props.onClose(this.props.selectedValue);
            },
            mainListItemClick : value => {
                props.onClose(value);
            },
            newUserOpen : () => {
                this.setState({isNewUserOpen : true});
            },
            newUserClose : () => {
                this.setState({isNewUserOpen : false});
                props.onClose(this.props.selectedValue);
            }
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog onClose={this.handler.mainClose} aria-labelledby="simple-dialog-title" open={this.props.isOpen}>
                <DialogTitle id="simple-dialog-title">Set your account</DialogTitle>
                <List>
                    {this.state.users.map(user => (
                        <ListItem button onClick={() => this.handler.mainListItemClick(user.name)} key={user.id}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name}/>
                        </ListItem>
                    ))}

                    <ListItem autoFocus button className="add-account-btn" onClick={this.handler.newUserOpen}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account"/>
                    </ListItem>
                </List>

                <Dialog open={this.state.isNewUserOpen} onClose={this.handler.newUserClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Type your Information
                        </DialogContentText>
                        <TextField
                            autoFocus
                            error={!!this.state.nicknameError}
                            margin="dense"
                            id="name"
                            label="Nickname"
                            helperText={this.state.nicknameError}
                            fullWidth
                        /><br/>
                        <TextField
                            error={!!this.state.passwordError}
                            margin="dense"
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            helperText={this.state.passwordError}
                            autoComplete="current-password"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button className="cancel-btn" onClick={this.handler.newUserClose} color="primary">
                            Cancel
                        </Button>
                        <Button className="sign-up-btn" onClick={this.handler.newUserClose} color="primary">
                            Sign Up
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        );
    }
}

export default withStyles(styles)(UserDialog);