import React from 'react';
import { Link } from 'react-router-dom';

//Menu component responsible for bind the menu (ToDo : Get menu from db )
const Menus=()=> {
    return (       
           <div className="py-2">
               <Link tag="a" to={{ pathname : '/', state : 'home' }} className="list-group-item">
                   Home
               </Link>              
               <Link tag="a" to={{ pathname : '/Home', state : 'signin' }} className="list-group-item">
                   Sign in
               </Link>               
           </div>
    );
}
export default Menus;
