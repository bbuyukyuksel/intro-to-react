import React, { Component } from 'react'

export default class TestChild extends Component {
    render() {
        return (
            <div>
                {this.props.name}
                <h1>{this.props.children}</h1>
            </div>
        )
    }
}
