import React, {Component} from 'react';
export default class Tagmng extends Component{

       handlerShowByTag(e){
            this.props.onValueChange(e)
       }

       render(){           
           return (
               <div>
                    <ul>
                        <li onClick={this.props.showAllhandler }> show all</li>
                        {   
                            this.props.ptags.map( item => (
                                <li key={item.id} onClick={() => this.handlerShowByTag(item.ids) }>
                                    {`${item.key} - ${item.count}`}
                                </li>
                                )
                            )
                            
                        }
                    </ul>
               </div>
           )
       } 
    }