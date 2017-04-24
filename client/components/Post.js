import React, {Component} from 'react';
import classNames from 'classnames';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.handleClickFilter = this.handleClickFilter.bind(this);
    }

    handleClickFilter(e) {
        if(e.target.className === 'tag' && this.props.status !== 'edit'){
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
            isActive,
            status
        } = this.props;
        
        let activeClass = classNames({ 
            'active-edit': isActive,
            'no-active':   !isActive,
            'is-edit':     status === 'edit',
            'is-new':     status !== 'edit'
        })

        return (
            <div className={activeClass}>
            { this.props.status !== 'edit' 
                ? <div>
                    <span onClick={this.handleEdit}>✏</span>
                    <span onClick={this.handleDelete}>×</span>
                  </div>
                : ""
            }  
                
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