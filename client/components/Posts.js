import React, {Component} from 'react';
import Post from './Post';

export default class Posts extends Component {

    render(){
        const {
            allpost,
            notes,
            onNoteDelete,
            onNoteEdit,
            activeClass
        } = this.props;

        return(
            <div>
                {
                    allpost.map( item => (
                        <Post 
                            isActive       = {this.props.activeClass === item.id} 
                            title          = {item.title} 
                            content        = {item.text} 
                            key            = {item.id}
                            onDelete       = {onNoteDelete}
                            onEdit         = {onNoteEdit}
                            id             = {item.id}
                            time           = {item.timestamp}
                            filterFromPost = {this.props.onClickFilter}
                        />
                    )
                )}
            </div>
        )
    }
}
