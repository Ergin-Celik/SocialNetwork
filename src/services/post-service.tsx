import axios from 'axios';

const PostService = {

     getPosts: function (page: number, callback: Function)
     {
          axios.get("https://jsonplaceholder.typicode.com/posts")
          .then(result => {
     
               let posts = result.data;
               posts = posts.slice(page*10, (page*10)+10);
               callback(posts);
          }).catch(error => {
               console.log("Error on get posts : " + error);
          });
     },

     getPost: function(id: number, callback: Function){
          axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then(result => {
               callback(result.data);
          })
          .catch(error => {
               console.log("Error on get post : " + error)
          })
     }
}

export default PostService;