import React, { useState, useRef, useEffect } from 'react';
import postService from '../../services/post-service';
import PostModel from '../../models/PostModel';
import Post from '../../components/post/post';
import './feed-page.scss';

//Props Interface.
export interface IFeedPageProps { }

//Feed Page Component.
function FeedPage2(props: IFeedPageProps) {

     //const feedPageRef = useRef<HTMLDivElement>(null);
     const [isLoaded, setIsLoaded] = useState<boolean>(true);
     const [posts, setPosts] = useState<PostModel[]>([]);
     const [page, setPage] = useState<number>(0);
     const [lastScrollPos, setLastScrollPos] = useState<number>(0);

     //Loads the posts if we scrolled down.
     function loadPosts(event?: any) {

          let content = event?.target;
          
          if(content !== undefined) 
          {
               setLastScrollPos(content.scrollTop > lastScrollPos ? content.scrollTop : lastScrollPos);
          }

          if (
               (isLoaded === true && posts.length === 0) ||
               (isLoaded === true && lastScrollPos >= content.scrollHeight - (content.offsetHeight * 2) && posts.length / 10 >= page)) {
               setIsLoaded(false);
               postService.getPosts(page, (data: PostModel[]) => {

                    let newPosts = posts.concat(data);
                    setPosts(newPosts);
                    setPage(page => page + 1);
                    setIsLoaded(true);
               });
          }

     }

     /*----CONTENT----*/
     if (posts.length === 0) {
          loadPosts();
          return <p>Loading...</p>;
     }
     else {
          let content = (
               <div id="feed-page" onScroll={loadPosts}>
                    {
                         posts.map(function (value, index) {
                              return <Post key={value.id} post={value} isComsBtnDisabled={false}></Post>;
                         })
                    }
               </div>
          );

          return content;
     }
     /*----------------*/
}

export default FeedPage2;