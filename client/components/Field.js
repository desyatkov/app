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
            text:      '',
            markdown:  '',
            timestamp: '',
            tags:      [],
            editId:    '',
            id:        '',
            status:    'new'
        }    
    }
    
    mdParse = str => toMarkdown( str.replace(/<\/?span.*?>/gi, '') )

    componentWillReceiveProps(nextProps, nextState) {

        if( nextProps.status === 'edit' ){
            const tagParse = tagParsed(nextProps.editText);
            this.setState({
                    text:     this.mdParse(nextProps.editText),
                    id:       nextProps.editId,
                    markdown: this.remarkable.render(tagParse),
                    status:   nextProps.status,
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

    handlerText = e => {
        const tagParse = tagParsed(e.target.value);
        this.setState({
            text: e.target.value,
            markdown: this.remarkable.render(tagParse)
        }, function(){ this.getTags() });
    }

    cancelHandler =() => {
        this.resetState();
        
        this.props.cancelActiveClass(false, 'new');
    }

    onAddHandler = () => {        
        const newPost = {
            id:     this.state.id || Date.now(),
            text:   this.state.markdown,
            timestamp: Moment().format('MMMM Do YYYY, HH:mm')
        }

        const newTags = {
            id: Date.now(),
            tags: this.state.tags,
            ids: [newPost.id]
        }

        this.setState({
            status: 'new'
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
            status: 'new',
            text:  '',
            markdown: '',
            timestamp: '',
            tags: [],
            editId: '',
            id: ''
        })
    }
        
    render(){
        let { editText, editId, text, status } = this.props;

        return (
            <div className='editor'>
                <Tabs selected={0}>
                    <Pane label='markdown'>
                        <div className='textarea_wrap'>
                            <textarea value={ this.state.text }
                                      onChange={this.handlerText}
                                      
                            />
                        </div>
                    </Pane>
                    <Pane label='md preview'>
                        {this.state.markdown 
                          ? <div className='content'
                                 dangerouslySetInnerHTML={{__html: this.state.markdown}}/>
                          : <div className='content-empty'>Nothing to show</div>       
                        }
                    </Pane>
                </Tabs>
                <button onClick={this.onAddHandler}
                        disabled={!this.state.text}
                >
                    { this.state.status === 'new' ? 'Add Post' : 'Edit ✏' }
                </button>
                { this.state.status !== 'new' ? <button onClick={this.cancelHandler}>Cancel</button> : null }
                <span className='comment'>use @ for add tag to post</span> 
        </div>            
        )
    }
}
