var React = require('react');

module.exports = React.createClass({
    getInitialState() {
        return ({
            data: null,
            gitHubID: ''
        });
    },
    componentWillMount() {
        let obj = [];
        this.setState({
            data: obj
        });
    },
    _handleClick: function () {
        let _this = this;
        let githubID = this.state.gitHubID;
        fetch('https://api.github.com/users/'+githubID+'/followers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        _this.setState({
                            data: data
                        })
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    },
    _handleChange(event) {
        this.setState({
            gitHubID: event.currentTarget.value
        })
    },
    _handleBlur(event) {
        console.log(event.currentTarget.value);
        this.setState({
            gitHubID: event.currentTarget.value
        })
    },
    render: function () {
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
                <title>GetLinks Node.js test</title>
                <link rel="stylesheet" href="/style.css"/>
            </head>
            <body>
            <div>
                <h1>Node skill test</h1>
                <hr/>
                <div className="form-inline">
                    <div className="form-group">
                        <input className="form-control" type="text" onBlur={this._handleBlur} onChange={this._handleChange} defaultValue={this.state.gitHubID}/>
                    </div>

                    <button className="btn btn-default github-submit" disabled={this.state.gitHubID == ''} onClick={this._handleClick}>Submit</button>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td width={'10%'}>#</td>
                            <td width={'20%'}>Avatar</td>
                            <td width={'30%'}>Login</td>
                            <td width={'40%'}>Url</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.length != 0 ?
                            this.state.data.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index+1}
                                        </td>
                                        <td>
                                            <img width={48} src={row.avatar_url} alt="Follower"/>
                                        </td>
                                        <td>
                                            {row.login}
                                        </td>
                                        <td>
                                            <a href={row.url}>{row.url}</a>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr><td colSpan="4">Not found followers</td></tr>
                    }
                    </tbody>
                </table>
            </div>
            <script src="bundle.js"></script>
            </body>
            </html>
        )
    }
});
