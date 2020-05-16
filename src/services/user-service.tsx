import axios from 'axios';

const UserService = {

     getUser(id: number, callback: Function){
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(result => {
               console.log(result.data);
               callback(result.data);
          })
          .catch(error => {
               console.log(error);
          });
     }

};

export default UserService;