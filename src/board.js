import React from 'react';
import axios from "axios";
import './board.css'
import PostObject from './newsPost.js'

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 200;

const customStyles = theme => ({
    root: {
        width : `calc(100% - ${drawerWidth}px)`,
        marginLeft : drawerWidth,
    },

    drawer: {
        width: drawerWidth,
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '1em',
    },

    playPauseButton: {
        fontSize: '5em',
    },

});

class Board extends React.Component {

    state = {
        newsPost: [],
        currentSection: 'Home',
    }

    getAllNews() {
        axios.get("http://127.0.0.1:8000/api/").then((res)=>{
            console.log(res)
            this.setState({newsPost: res.data})
        }).catch(function(err){
            console.log(err)
        })
    }

    handleDrawerItemClick = (text, index, e) => {
        e.preventDefault();
        this.setState({
            currentSection: text
        });
    }

    componentDidMount() {
        this.getAllNews()
    }

    render() {
        const {classes} = this.props;
        const drawer = (
            <div className={classes.drawer}>
                <List>
                    <ListItem button className={classes.homeButton} onClick={e=>this.handleDrawerItemClick('Home', -1, e)}>
                        <ListItemText>Home</ListItemText>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                    </ListItem>
                    <Divider />
                    { ['정치', '경제', '사회', '문화', '세계', 'IT'].map((text, index) => (
                        <ListItem button key={index} onClick={e=>this.handleDrawerItemClick(text, index, e)} >
                            <ListItemText primary={text}/>
                        </ListItem>
                    )) }
                </List>
            </div>
        );

        let startIndex, endIndex;
        let subSet = [];
        switch(this.state.currentSection){
            case('정치'): {
                startIndex = 0;
                endIndex = 10;
                break;
            }
            case('경제'): {
                startIndex = 10; 
                endIndex = 20;
                break;
            }
            case('사회'): {
                startIndex = 20; 
                endIndex = 30;
                break;
            }
            case('문화'): {
                startIndex = 30; 
                endIndex = 40;
                break;
            }
            case('세계'): {
                startIndex = 40; 
                endIndex = 50;
                break;
            }
            case('IT'): {
                startIndex = 50; 
                endIndex = 60;
                break;
            }
            default: {
                startIndex=0;
                endIndex=0;
                break;
            }
        }
        subSet = this.state.newsPost.slice(startIndex, endIndex);
        let postGrid = subSet.map( (post) => <PostObject key={post.pk} title={post.fields.title} content={post.fields.content} /> )

        const mainGrid = (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h2" gutterBottom>
                                Summareader
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <LinearProgress variant="determinate" color="secondary" />
                            <PlayCircleOutlineRoundedIcon className={classes.playPauseButton} color="secondary" />
                            <PauseCircleOutlineRoundedIcon className={classes.playPauseButton} color="primary" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>{this.state.currentSection}</Paper>
                    </Grid>
                    {postGrid}
                </Grid>
            </div>
        );

        return (
            <div>
                <CssBaseline />
                <Hidden xsDown implementation="css">
                    <Drawer variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
                <div className={classes.root}>
                    {mainGrid}
                </div>
            </div>
        );
    }
}

export default withStyles(customStyles)(Board);