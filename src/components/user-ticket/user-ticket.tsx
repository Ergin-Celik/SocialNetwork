import React from 'react';
import Usermodel from '../../models/UserModel';

//custom interface for props
export interface IUserTicketProps{
     user: Usermodel;
}

//custom interface for state
export interface IUserTicketState{
     
}

export default class UserTicket extends React.Component<IUserTicketProps, IUserTicketState>{

     render(){

          let content = (
               <div id={"user-" + this.props.user.id}>
                    <div className="user-image">
                         <img src="" alt="Profile Image"/>
                    </div>
                    <div className="user-username">
                         {this.props.user.username}
                    </div>
                    <div className="post-date">
                         
                    </div>
               </div>
          );

          return content;
     }

}