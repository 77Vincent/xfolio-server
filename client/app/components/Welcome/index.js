import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Welcome extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return (
      <div className='Welcome'>
        Welcome to the website
      </div>
    );
  }
}