import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import FeedPage from './pages/feed-page/feed-page';
import PostPage from './pages/post-page/post-page';

function App() {
  let content = (
   <Router>
     <Switch>

       {/**FEED PAGE*/}
       <Route path="/" exact component={App}>
          <FeedPage></FeedPage>
       </Route>

       {/**POST PAGE*/}
       <Route path="/post/:id">
          <PostPage></PostPage>
       </Route>

     </Switch>
   </Router>
      //<FeedPage></FeedPage>
  );

  return content;
}

export default App;
