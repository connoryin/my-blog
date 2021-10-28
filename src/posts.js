import React from "react";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            name: '',
            content: '',
            posts: [],
            show: false,
            info: 'Make a post'
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.show = this.show.bind(this);
    }

    componentDidMount() {
        fetch(
            "https://worker.connoryin.workers.dev/api/posts"
        )
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    posts: data
                })
            })
    }


    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        fetch(`https://worker.connoryin.workers.dev/api/posts`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    name: this.state.name,
                    content: this.state.content,
                })
            })
            .then(async resp => {
                const data = await resp.text()
                alert(data)
                if (data === "success") {
                    this.setState(prev => {
                        return {
                            posts: [...prev.posts, {
                                title: prev.title,
                                name: prev.name,
                                content: prev.content,
                            }],
                            show: false,
                            title: '',
                            name: '',
                            content: '',
                            info: 'Make a post'
                        }
                    })
                }
            })
        event.preventDefault();
    }

    show() {
        this.setState(prev => {
            return {show: !prev.show, info: prev.show ? 'Make a post' : 'Cancel'}
        })
    }

    render() {
        const {show} = this.state
        return (
            <div className="container">
                <div className="p-2"/>
                <h2 className="text-center">Posts</h2>
                <div className="p-2"/>

                <button onClick={this.show} className="btn btn-primary">
                    {this.state.info}
                </button>
                {show ? <div className="text-center">
                    <form onSubmit={this.handleSubmit}>
                        <label className="form-label">Title:</label>
                        <div>
                            <input className="form-control" value={this.state.title}
                                   onChange={this.handleChangeTitle}/>
                        </div>
                        <label className="form-label">Name:</label>
                        <div>
                            <input className="form-control" value={this.state.name}
                                   onChange={this.handleChangeName}/>
                        </div>
                        <label className="form-label">Content:</label>
                        <div>
                            <textarea className="form-control" value={this.state.content}
                                      onChange={this.handleChangeContent}/>
                        </div>
                        <div className="p-2"/>

                        <input type="submit" className="btn btn-primary" value="Submit"/>
                    </form>
                </div> : <div/>}

                <div className="p-2"/>

                {
                    this.state.posts.map((post) => (
                        <div>
                            <div className="card" key={post.id}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {post.title}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {post.name}
                                    </h6>
                                    <p className="card-text">
                                        {post.content}
                                    </p>
                                </div>
                            </div>
                            <div className="p-2"/>
                        </div>
                    ))
                }
            </div>
        )
    };
}

export default Posts;
