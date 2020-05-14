import React, { useState, useEffect } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import Post from '../../components/post/post';
import Comment from '../../components/comment/comment';
import PostModel from '../../models/PostModel';
import CommentModel from '../../models/CommentModel';
import postService from '../../services/post-service';
import commentService from '../../services/comment-service';
import '../post-page/post-page.scss';

export interface IPostPageProps{}

function PostPage(props: IPostPageProps){

     const {id} = useParams();
     const [post, setPost] = useState<PostModel | undefined>(undefined);
     const [comments, setComments] = useState<CommentModel[]>([]);
     
     //Load comments once the post has been loaded (just to demonstrate the use of this hook).
     useEffect(() => {
          if(post !== undefined){
               commentService.getComments(post.id, (data: CommentModel[]) => {
                    setComments(data);
               });
          }
     }, [post]);

     //Content rendering----------------------------------------

     if(post === undefined){
          postService.getPost(id, (post: PostModel) => {
               setPost(post);
          });
          
          return <p>Loading</p>;
     }
     else {
          return(
               <div>
                    <Post post={post} isComsBtnDisabled={true}></Post>
                    <div id="comments">
                         {(()=> {
                              if(comments.length > 0){
                                   return (
                                        comments.map(function(value, index){
                                             return <Comment key={value.id} comment={value}></Comment>
                                        })
                                   );
                              }
                         })()}
                    </div>
               </div>
          );
     }

     //----------------------------------------------------------
}

export default PostPage;