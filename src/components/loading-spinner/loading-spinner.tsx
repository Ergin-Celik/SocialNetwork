import React from 'react';
import spinner from '../../content/images/loading-spinner.gif';

export default function LoadingSpinner(props: any){

     return (
          <div>
               <img src={spinner} alt='Loading...'/>
          </div>
     );

}