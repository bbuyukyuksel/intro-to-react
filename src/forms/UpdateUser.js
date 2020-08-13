import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer, { UserProvider } from '../context';
import axios from 'axios';


const Animation = posed.div({
    visible:{
        opacity:1, 
        applyAtStart:{
            display: 'block'
        }
    },
    hidden:{
        opacity:0,
        applyAtEnd: {
            display:'none',
        }
    }

});

class UpdateUser extends Component {
    state = {
        visible:true,
        id: "",
        name: "",
        salary: "",
        department:"",

    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible,
        })
    }

    onChangeEvent = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });

    }
    async componentDidMount(){
        const response = await axios.get(`http://localhost:3001/users/${this.props.match.params.id}`)
        console.log(response);
        const {name, salary, department} = response.data;
        this.setState({
            name,
            salary,
            department,
        });
    }

    onSubmitEvent = async (dispatch, e) => {
        // Formun yenilenmesini engeller.
        e.preventDefault();
        const {name, salary, department} = this.state;
        const newUser = {
            //jsonserver otomatik oluşturcaz. id:uniqid(),
            name,
            salary,
            department,
        };
        const response = await axios.put(`http://localhost:3001/users/${this.props.match.params.id}`, newUser)
        dispatch({type:"UPDATE_USER", payload:response.data});
    }



    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const {visible, name, salary, department} = this.state;
                        const {dispatch} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{ visible ? "Hide Form" : "Show Form" }</button>
                                <Animation pose={visible ? "visible" : 'hidden'}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Add User Form</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form action="" onSubmit = {this.onSubmitEvent.bind(this, dispatch)}>
                                        <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input onChange={this.onChangeEvent} type="text" className="form-control" name="name" id="name" value={name} placeholder="Enter name"/>
                                            </div>
                                            <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input onChange={this.onChangeEvent} type="text" className="form-control" name="salary" id="salary" value={salary} placeholder="Enter salary"/>
                                            </div>
                                            <div className="form-group">
                                                    <label htmlFor="department">Department</label>
                                                    <input onChange={this.onChangeEvent} type="text" className="form-control" name="department" id="department" value={department} placeholder="Enter department"/>
                                            </div>
                                                
                                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                        </form>
                                    </div>
                                </Animation>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default UpdateUser;