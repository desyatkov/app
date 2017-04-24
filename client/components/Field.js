import React, {Component} from 'react';
import Tabs from './Tabs';
import Pane from './Pane';
import tagParsed from './tagParsed';
import Remarkable from 'remarkable';
import Moment from 'moment';
import toMarkdown from 'to-markdown';
import Tag from './Tag';

export default class Field extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            text:  "",
            markdown: "",
            timestamp: "",
            tags: [],
            editId: "",
            id: "",
            status: "new"
        }    
    }
    
    mdParse = str => toMarkdown( str.replace(/<\/?span.*?>/gi, "") )

    componentWillReceiveProps(nextProps, nextState) {

        if( nextProps.status === 'edit' ){
            
            const tagParse = tagParsed(nextProps.editText);
            this.setState({
                    text:   this.mdParse(nextProps.editText),
                    id:     nextProps.editId,
                    markdown: this.remarkable.render(tagParse),
                    status: nextProps.status,
                }, function(){ this.getTags() })
            }
    }

    componentDidMount() {
        this.remarkable = new Remarkable('full', {
                                            html: true,
                                            linkify: true,
                                            typographer: true,
                                        });
    }

    handlerTitle = e => {
        this.setState({
            title: e.target.value
        })
    }

    handlerText = e => {
        const tagParse = tagParsed(e.target.value);
        this.setState({
            text: e.target.value,
            markdown: this.remarkable.render(tagParse)
        }, function(){ this.getTags() });
    }

    cancelHandler =() => {
        this.setState({
            status: "new",
            id: 0,
            text:  ""
        })
        
        this.props.cancelActiveClass(false, "new");
    }

    onAddHandler = () => {        
        const newPost = {
            id:     this.state.id || Date.now(),
            title:  this.state.title,
            text:   this.state.markdown,
            timestamp: Moment().format('MMMM Do YYYY, HH:mm')
        }

        const newTags = {
            id: Date.now(),
            tags: this.state.tags,
            ids: [newPost.id]
        }
        this.setState({
            status: "new"
        })
        this.props.onPostAdd(newPost, newTags);
        this.resetState();
    }

    getTags(){
        this.setState({
            tags: this.state.text.match( /@.+?\b/gi )
        })
    }

    resetState = () => {
        this.setState({
            status: "new",
            title: "",
            text:  "",
            markdown: "",
            timestamp: "",
            tags: [],
            editId: "",
            id: ""
        })
    }
    
    add = (text) => {
            this.setState({
                text:  text,
            })
        }
        
    render(){
        let { editText, editId, text, status } = this.props;

        return (
            <div className="editor">
                <Tabs selected={0}>
                    <Pane label="Tab 1">
                        <div>
                            <input type="text" 
                                placeholder="title"
                                value={this.state.title}
                                onChange={this.handlerTitle}
                            />
                            
                            <textarea rows="4" 
                                      cols="50"
                                      value={ this.state.text }
                                      onChange={this.handlerText}
                                      
                            />
                        </div>
                    </Pane>
                    <Pane label="Tab 2">
                        <div className="content"
                             dangerouslySetInnerHTML={{__html: this.state.markdown}} />
                    </Pane>
                </Tabs>
                <button onClick={this.onAddHandler}>{ this.state.status === 'new' ? "Add Post" : "Edit ✏" }</button>
                { this.state.status !== 'new' ? <button onClick={this.cancelHandler}>Cancel</button> : null } 
        </div>            
        )
    }
}
