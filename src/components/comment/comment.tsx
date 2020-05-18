import React from 'react';
import CommentModel from '../../models/CommentModel';
import '../comment/comment.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner';

export interface ICommentProps{
     comment: CommentModel;
}

function Comment(props: ICommentProps){

     if(props.comment !== undefined){
          return (
               <div className="comment">
                    <div className="comment-email">
                         {props.comment.email}
                    </div>
                    <div className="comment-name">
                         {props.comment.name}
                    </div>
                    <div className="comment-body">
                         {props.comment.body}
                    </div>
               </div>
          );
     }
     else{
          return <LoadingSpinner></LoadingSpinner>;
     }
}

export default Comment;