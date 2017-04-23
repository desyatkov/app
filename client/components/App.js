import React, {Component} from 'react';
import Field from './Field'
import Posts from './Posts'
import Tagmng from './Tagmng'
import parseAllTags from './parseTags'
import '../style/app.scss'
import _ from 'lodash';

let ALL_LIST=[];

export default class App extends Component {
    constructor(props){
        super(props);
            this.state = {
                allPosts: [
                    {id:1, title: "first", text: "main <span class='tag'>@a</span>"},
                    {id:2, title: "second", text: "mainSecond <span class='tag'>@b</span>"},
                ],
                tags: this.props.tags,
                parseTags: parseAllTags(this.props.tags)
            }   

            ALL_LIST = this.state.allPosts;
    }

    handlePostAdd = (newPost, newTags) => {
        let postExist = _.find(ALL_LIST, o => o.id == newPost.id );
        
        if(!!postExist){
            let currTags = this.state.tags;
            let index = _.indexOf(currTags, _.find(currTags, o => o.ids[0] === newTags.ids[0]))
            currTags.splice(index, 1, newTags);

            ALL_LIST.forEach( o => {
                if (o.id === newPost.id){
                    o.text = newPost.text
                }
            })
            
            this.setState({
                allPosts:  ALL_LIST,
                editText:  "",
                text:      "",
                tags:      currTags,
                parseTags: parseAllTags( currTags ),
                status:    newPost.statusNewPost,
                activeId: null
            })
        } else {
            this.setState({
                allPosts:  [newPost, ...ALL_LIST],
                tags:      [newTags, ...this.state.tags],
                parseTags: parseAllTags( [newTags, ...this.state.tags] ),
                editText: "",
                text: "",
                status: newPost.statusNewPost,
                activeId: null
            }, () => ALL_LIST = this.state.allPosts );
        }
    }

    handleCancel = stat => {
        this.setState({
            activeId: stat,
            status: 'new'
            // editText:  ""
        })
    }
    
    handlePostDelete = postId => {
        let filterd = this.state.tags.filter(item => {
            return item.ids[0] !== postId
        })

        this.setState({
            allPosts: this.state.allPosts.filter(post => post.id !== postId),
            tags: filterd,
            parseTags: parseAllTags(filterd),
            activeId: null
        }, () => {
            ALL_LIST = this.state.allPosts
        } );
    }

    handlePostEdit = (postId, status) => {
        let comment = _.find( this.state.allPosts, (o) => o.id === postId);
        
        this.setState({
            editText: comment.text,
            editId:   comment.id,
            text:     comment.text,
            status:   "edit", 
            activeId: comment.id
        });
    }

    filterByTags = (ids) => {
        const newList = ids.map( ids => {
                return _.find( ALL_LIST, (o) =>  o.id == ids  )
            }
        ); 
        this.setState({
            allPosts: newList
        });
    }

    showAll = () => {
        this.setState({
            allPosts: ALL_LIST
        });
    }

    render(){        
        return (
            <div>
                <div>
                    <Field onPostAdd = {this.handlePostAdd}
                           editText  = {this.state.editText}
                           editId    = {this.state.editId}
                           status    = {this.state.status}
                           cancelActiveClass  = {this.handleCancel}
                        />
                </div>
                <div>
                    <Posts allpost      = {this.state.allPosts}
                           onNoteDelete = {this.handlePostDelete}
                           onNoteEdit   = {this.handlePostEdit}
                           activeClass  = {this.state.activeId}
                    />
                </div>
                <div>
                    <Tagmng ptags={this.state.parseTags}
                            onValueChange={this.filterByTags}
                            showAllhandler={this.showAll}
                    />
                </div>
            </div>
        )
    }
}

App.defaultProps = {
    tags: [
        {id:12413245235, tags: ["@a"], ids: [1]},
        {id:12345235345, tags: ["@b"], ids: [2] },
    ]
};