import React, {useState} from 'react';
import UserModel from '../../models/UserModel';
import userService from '../../services/user-service';
import '../user-ticket/user-ticket.scss';

//custom interface for props
export interface IUserTicketProps{
     userId: number;
}

export default function UserTicket(props: IUserTicketProps){

     const [user, setUser] = useState<UserModel|undefined>(undefined);

     if(user === undefined){
          userService.getUser(props.userId, (data: UserModel) => {
               setUser(data);
          });
          return <p>Loading...</p>
     }
     else{
          return (
               <div id={"user-" + user.id} className="user-ticket">
                    <div className="user-image">
                         <img src="https://cdn.shopify.com/s/files/1/0150/0643/3380/products/Viacom_Spongebob_SubTotePRTGENSOG16_00013_RO_160x.jpg?v=1581618420" alt="Profile Image"/>
                    </div>
                    <div className="user-username">
                         {user.name}
                    </div>
                    <div className="post-date">
                         
                    </div>
               </div>
          );
     }
}