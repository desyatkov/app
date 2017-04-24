import React, {Component} from 'react';
import classNames from 'classnames';

export default class Post extends Component {
    constructor(){
        super();
        this.handleClickFilter = this.handleClickFilter.bind(this);
    }

    handleClickFilter(e) {
        if(e.target.className === 'tag'){
            this.props.filterFromPost(e.target.innerText)
        }
    }

    handleDelete = () => {
        this.props.onDelete( this.props.id );
    }

    handleEdit = () => {
        this.props.onEdit( this.props.id, "edit" );
    }

    render(){
        const {
            title,
            content,
            onDelete,
            time,
            isActive
        } = this.props;
        
        let activeClass = classNames({ 'active-edit': isActive })

        return (
            <div className={activeClass}>
                <span onClick={this.handleEdit}>✏</span>
                <span onClick={this.handleDelete}>×</span>
                <div>{title}</div>
                <div
                    dangerouslySetInnerHTML={{__html: content}} 
                    onClick={this.handleClickFilter}
                />
                <div>{time}</div>
            </div>
        )
    }
}