import React, { Component } from 'react';
import styled from "styled-components";

export const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    margin: 25px 0 0 0;
  
  .profile-container{
    width: 400px;
    min-height: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    &.loading{
      background-image: url('https://stylishthemes.github.io/GitHub-Dark/images/octocat-spinner-smil.min.svg');
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: center;
    }
    
    h1{
    text-align: center;
      &.loading{
        align-self: center;
      }
    }
    
    img{
      width: 100%;
    }
    
`;


class MyProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    this.fetchGithubUser();
  }

  render() {
    const {loading, user, error} = this.state;

    return (
      <ProfileWrapper>
        <div className={"profile-container " + (loading ? "loading" : "")}>
          {loading ? (
            <h1 className="loading">Loading....</h1>
          ) : (
            <React.Fragment>
              <h1>User name: {user.name} </h1>
              <figure>
                <img src={user.avatar_url} alt="User Images"/>
              </figure>
            </React.Fragment>
          )}
        </div>
      </ProfileWrapper>
    );
  }

  fetchGithubUser(user = "MaxBaranowski") {
    fetch(`https://api.github.com/users/${user}`)
    // .then(res => (res.ok ? res.json() : throw new Error ("oops smth went wrong with response")))
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("oops smth went wrong with response");
        }
      })
      .then(res => this.setState({user: res, loading: false}))
      .catch(error => this.setState({error, loading: false}));
  }
}

export default MyProfile;
