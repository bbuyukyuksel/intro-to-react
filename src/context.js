import React, {Component} from 'react';
import axios from 'axios';
const UserContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
    console.log(state.users.filter(user => action.payload !==user.id))
    switch (action.type){
        case "DELETE_USER":
            return{
                ...state,
                users:state.users.filter(user => action.payload !==user.id),
            }
        case "ADD_USER":
            //state.users.push(action.payload);
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case "UPDATE_USER":
            return{
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            }

        default:
            return state;
    }
}
export class UserProvider extends Component {
    state = {
        users: [],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }
    
    componentDidMount() {
        this.tick();
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = async () => {
        const response = await axios.get('http://localhost:3001/users')
        if(JSON.stringify(this.state.users) !== JSON.stringify(response.data)){
            this.setState({
                users:response.data,
            });
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>      
        )
    }
}

const UserConsumer = UserContext.Consumer;
export {UserContext};
export default UserConsumer;