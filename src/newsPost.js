import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';


const customStyles = theme => ({

    paper: {
      textAlign: 'center',
      margin: '1em',
      height: 100
    },

    button: {
        height: '100%',
        width: '100%',
    },

    typho: {
        color: theme.palette.text.secondary,
    },

    popover: {
        textAlign: 'center',
        width: '60rem'
    }

});

class PostObject extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    render() {
        const {classes} = this.props;
        const {title, content} = this.props;

        const open = Boolean(this.state.anchorEl);
        const id = open ? 'postObject' : undefined;

        return(
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Button className={classes.button} aria-describedby={id} variant="text" onClick={this.handleClick}>
                        <Typography className={classes.typho} variant="h5" gutterBottom>
                            {title}
                        </Typography>
                    </Button>
                </Paper>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                >
                    <Typography className={classes.popover}>{content}</Typography>
                </Popover>
            </Grid>
        );
    }
}

export default withStyles(customStyles)(PostObject);