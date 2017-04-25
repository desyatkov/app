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
                tempPosts: "",
                allPosts: [
                    {id:1, text: "<h3>Shut up and get to the point!</h3><p>I guess because my parents keep telling me to be more ladylike. As though! Goodbye, cruel world. Goodbye, cruel lamp.</p><br/> <span class='tag'>@a</span>", timestamp: 'April 26th 2017, 00:00'},
                    {id:2, text: "<h3>Who are you, my warranty?!</h3><p>No! The cat shelter's on to me. Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all. Why am I sticky and naked? Did I miss something fun?<br><span class='tag'>@a</span></p>", timestamp: 'April 26th 2017, 00:00'}
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
                tempPosts: ALL_LIST,
                allPosts:  ALL_LIST,
                editText:  '',
                text:      '',
                tags:      currTags,
                parseTags: parseAllTags( currTags ),
                status:    newPost.statusNewPost,
                activeId: null
            })
        } else {
            this.setState({
                tempPosts: [newPost, ...ALL_LIST],
                allPosts:  [newPost, ...ALL_LIST],
                tags:      [newTags, ...this.state.tags],
                parseTags: parseAllTags( [newTags, ...this.state.tags] ),
                editText: '',
                text: '',
                status: newPost.statusNewPost,
                activeId: null
            }, () => { ALL_LIST = this.state.allPosts} );
        }
    }

    handleCancel = stat => {
        this.setState({
            activeId: stat,
            status: 'new'
        })
    }
    
    handlePostDelete = postId => {
        let filterd = this.state.tags.filter(item => {
            return item.ids[0] !== postId
        })

        this.setState({
            tempPosts: this.state.allPosts.filter(post => post.id !== postId),
            allPosts:  this.state.allPosts.filter(post => post.id !== postId),
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
            status:   'edit', 
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

    filterByTagName = str => {
        return this.state.parseTags.filter( o => o.key === str )
    }

    handlerPostsFlt = str => {
        const idsRelevant = this.filterByTagName(str)[0].ids;
        this.filterByTags(idsRelevant);
    }

    showAll = () => {
        this.setState({
            allPosts: ALL_LIST
        });
    }

    findPost = (e) => {
        let filtredPosts = ALL_LIST.filter( item => item.text.toLowerCase().includes(e.target.value.toLowerCase()) )
        if(e.target.value){
            this.setState({
                allPosts: filtredPosts
            })
        } else {
           this.setState({
                allPosts: ALL_LIST
            }) 
        }
    }

    componentDidMount() {
        const savedPosts = JSON.parse(localStorage.getItem('posts'));
        const savedTags = JSON.parse(localStorage.getItem('tags'));

        if (savedTags) {
            this.setState({ 
                tags: savedTags,
                parseTags: parseAllTags(savedTags)
            });
        }

        if (savedPosts) {
            this.setState({ allPosts: savedPosts, tempPosts: savedPosts });
            ALL_LIST = savedPosts;
        }
    }
    

    componentDidUpdate() {
        const posts = JSON.stringify(this.state.tempPosts);
        localStorage.setItem('posts', posts);

        const tags = JSON.stringify(this.state.tags);
        localStorage.setItem('tags', tags);
    }

    render(){            
                    
        return (
            <div className= 'app-area' >
                <div className='header'><div>post</div></div>
                <div className='profile-area'>your profile</div>
                <div className='find-area'>
                    <input type='text'
                           placeholder='find post'
                           onChange={this.findPost}
                           />
                </div>
                <div className = 'text-area'>
                    <Field onPostAdd         = {this.handlePostAdd}
                           editText          = {this.state.editText}
                           editId            = {this.state.editId}
                           status            = {this.state.status}
                           cancelActiveClass = {this.handleCancel}
                        />
                </div>
                <div className = 'post-area'>
                    { this.state.allPosts.length 
                        ? <Posts allpost       = {this.state.allPosts}
                                 onNoteDelete  = {this.handlePostDelete}
                                 onNoteEdit    = {this.handlePostEdit}
                                 activeClass   = {this.state.activeId}
                                 onClickFilter = {this.handlerPostsFlt}
                                 status        = {this.state.status}
                           />  
                         : <div className='empty-posts'>nothing to show</div>  
                    }
                </div>
                <div className = 'tags-area'>
                    <Tagmng ptags            = {this.state.parseTags}
                            onValueChange    = {this.filterByTags}
                            showAllhandler   = {this.showAll}
                    />
                </div>
                <div className='footer-area'>footer</div>
            </div>
        )
    }
}

App.defaultProps = {
    tags: [
        { id:12413245235, tags: ['@a'], ids: [1] },
        { id:12345235345, tags: ['@b'], ids: [2] },
    ]
};