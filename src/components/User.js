import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

class User extends Component {
    state = {
        isVisible : false,
    }
    static defaultProps = {
        name : "Bilgi yok.",
        department: 'Bilgi yok.',
        salary: 'Bilgi yok.',
    }

    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeleteEvent = async (dispatch, e) => {
        const {id} = this.props;
        await axios.delete(`http://localhost:3001/users/${id}`);
        dispatch({type:"DELETE_USER", payload:id});
    }

    
    render() {
        // Destructing
        const {id, name, department, salary} = this.props;
        const {isVisible} = this.state; 
        
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card" style={isVisible ? {backgroundColor:"#83247f", color:'white'} : null}>
                                    <h5 className="card-header d-flex justify-content-between" onClick={this.onClickEvent} >
                                        {name} 
                                        <i  
                                            onClick={this.onDeleteEvent.bind(this, dispatch)}
                                            className="far fa-trash-alt" style={{cursor:"pointer"}}>
                                        </i>
                                        
                                    </h5>
                                    { isVisible ? 
                                        <div className="card-body" style={isVisible ? {backgroundColor:"#58246f", color:'white'}: null}>
                                            <p className="card-text">Maaş: {salary}</p>
                                            <p className="card-text">Departman: {department}</p>
                                            <Link to={`/update-user/${id}`} className='btn btn-primary btn-block'>
                                                Update  
                                            </Link>
                                        </div>
                                        : null    
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
        
    }
}
User.propTypes = {
    name : PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
}

export default User;
