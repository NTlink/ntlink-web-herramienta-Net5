import React, { Component } from 'react';
import FileUpload from './FileUpload';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <FileUpload />

        </div>
    );
  }
}
