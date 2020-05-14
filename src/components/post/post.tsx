import React from 'react';
import '../post/post.scss';
import PostModel from '../../models/PostModel';
import UserModel from '../../models/UserModel';
import UserTicket from '../user-ticket/user-ticket';
import { Link } from 'react-router-dom';

//custom interface for props
export interface IPostProps{
     post: PostModel;
     isComsBtnDisabled: boolean;
}

//custom interface for state
export interface IPostState{
     user: UserModel;
     isLoaded: boolean;
}

export default function Post(props: IPostProps){

     if(props.post === null){
          return <p>Loading...</p>;
     }
     else{

          let post = props.post;

          let content = (
               <div id={"post-" + post.id} className="post">
                    <div className="post-author">
                    </div>
                    <div className="post-title">
                         { post.title.toUpperCase() }
                    </div>
                    <div className="post-body">
                         { post.body }
                    </div>
                    {(() => {
                         if(props.isComsBtnDisabled !== true){
                              return (
                                   <Link to={`/post/${post.id}`}>
                                        <button className="button-go-comments">Commentaires</button>
                                   </Link>
                              );
                         }
                    })()}
                    
                    <div>
                         
                    </div>
               </div>
          );
          
          return content;
     }

}

/*
export default class Post extends React.Component<IPostProps, IPostState>{

     constructor(props: IPostProps){
          super(props);
          this.state = {
               isLoaded: false,
               user: {}
          };
     }
     
     componentDidMount(){
          /*
          fetch(`https://jsonplaceholder.typicode.com/users/${this.props.post.userId}`)
          .then(response => response.json())
          .then(result => {
               this.setState({
                    user: result as UserModel,
                    isLoaded: true
               })
          })
          .catch(error => {console.log(error)});
     }

     render(){
          let post = this.props.post;
          
          //{ this.renderUserTicket() }
          
     }

     //Renders the user ticket component once this component has been loaded.
     renderUserTicket(){
          if(this.state.isLoaded === true){
               return <UserTicket user={this.state.user}></UserTicket>
          }
          else{
               return <span>...</span>
          }
     }
}*/