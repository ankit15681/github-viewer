/*global $ */
import React, { Component } from 'react';
import Profile from './Github/Profile'
import Search from './Github/Search'

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: 'ankit15681',
            userData: [],
            userRepos: [],
            perPage: 20
        }
    }

    //get user data from github
    getUserData(){
        $.ajax({
            url: 'https://api.github.com/users/' +
            this.state.userName + '?client_id=994ff214532d0d8217c3'+ '&client_secret=82cd8604c527e1046d9456d5ab5270f1e49ed9f1',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData: data});
            }.bind(this),
            error: function(xhr,status,err){
                this.setState({username: null});
                alert(err);
            }.bind(this)
        })
    }

    //get user repos from github
    getUserRepos(){
        $.ajax({
            url: 'https://api.github.com/users/' +
            this.state.userName + '/repos?per_page' + this.state.perPage + '&client_id=994ff214532d0d8217c3' 
             + '&client_secret=82cd8604c527e1046d9456d5ab5270f1e49ed9f1' + '&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos: data});
            }.bind(this),
            error: function(xhr,status,err){
                this.setState({username: null});
                alert(err);
            }.bind(this)
        })
    }

    handleFormSubmit(username){
        this.setState({userName: username}, function(){
            this.getUserData();
            this.getUserRepos();
        });
    }

    componentDidMount(){
        this.getUserData();
        this.getUserRepos();
    }


    render() {
        return (
            <div className="container">
                <Search onFormSubmit = {this.handleFormSubmit.bind(this)}/>
                <Profile {...this.state}/>
            </div>
        );
    }
}


export default Home;
