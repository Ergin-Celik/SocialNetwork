import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import postService from '../../services/post-service';
import PostModel from '../../models/PostModel';
import Post from '../../components/post/post';
import './feed-page.scss';
import {AppContextConsumer} from '../../AppContext';

//Props Interface.
export interface IFeedPageProps { }

export interface IFeedPageState {
     posts: PostModel[],
     page: number,
     lastScrollPos: number
}

//Feed Page Component.
export default function FeedPage(props: IFeedPageProps) {

     const feedPageRef = useRef<HTMLDivElement>(null);
     const [isLoaded, setIsLoaded] = useState<boolean>(true);
     const [isPageReload, setIsPageReload] = useState<boolean>(true);
     const [posts, setPosts] = useState<PostModel[]>([]);
     const [page, setPage] = useState<number>(0);
     const [lastScrollPos, setLastScrollPos] = useState<number>(0);
     const [currentScrollPos, setCurrentScrollPos] = useState<number>(0);

     useEffect(() => {
          if(isPageReload){
               feedPageRef.current?.scrollTo(0, currentScrollPos);
               setIsPageReload(false);
          }
     }, [posts]);

     //Loads the posts if we scrolled down.
     function loadPosts(event?: any) {

          let content = event?.target;

          if (content !== undefined) {
               setCurrentScrollPos(() => {
                    localStorage.setItem("feedPageCurrentScollPos", currentScrollPos.toString());
                    return content.scrollTop
               });
               setLastScrollPos(content.scrollTop > lastScrollPos ? content.scrollTop : lastScrollPos);
          }
          
          if (
               (isLoaded === true && posts.length === 0) ||
               (isLoaded === true && lastScrollPos >= content.scrollHeight - (content.offsetHeight * 2) && posts.length / 10 >= page)) {
               
               setIsLoaded(false);
               
               if(!restoreState()){
                    
                    //Get posts
                    postService.getPosts(page, (data: PostModel[]) => {
                         
                         let newPosts = posts.concat(data);
                         setPosts(newPosts);
                         setPage(page => page + 1);
                         setIsLoaded(true);
                         localStorage.setItem("feedPageState", JSON.stringify({
                              page: page,
                              lastScrollPos: lastScrollPos,
                              posts: posts
                         } as IFeedPageState));
                    });
               }
          }
     }

     //Restores the state from local storage.
     function restoreState(){
          
          if(page === 0){
               let state = localStorage.getItem("feedPageState");
               let currentScrollPos = localStorage.getItem("feedPageCurrentScollPos");
               
               if(state !== null && currentScrollPos){
                    let s: IFeedPageState = JSON.parse(state);
                    setPosts(s.posts);
                    setPage(s.page);
                    setLastScrollPos(s.lastScrollPos);
                    setIsLoaded(true);
                    setCurrentScrollPos(JSON.parse(currentScrollPos) as number);
                    return true;
               }
          }

          return false;
     }

     /*----CONTENT----*/
     if (posts.length === 0) {
          loadPosts();
          return <LoadingSpinner></LoadingSpinner>;
     }
     else {
          return (
               <AppContextConsumer>
                    { context => 
                         <div id="feed-page" ref={feedPageRef} onScroll={loadPosts}>
                              {
                                   posts.map(function (value, index) {
                                        return <Post key={value.id} post={value} isComsBtnDisabled={false}></Post>;
                                   })
                              }
                         </div>
                    }
               </AppContextConsumer>
          );
     }
     /*----------------*/
}