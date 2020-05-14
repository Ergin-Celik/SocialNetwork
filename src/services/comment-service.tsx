import axios from 'axios';

const CommentService = {
     
     getComments(postId: number, callback: Function){
          axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then(result => {
               callback(result.data);
          })
          .catch(error => {
               console.log("Error on get comments : " + error);
          });
     }

}

export default CommentService;