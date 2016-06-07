import React from 'react'
import request from 'superagent'
import Header from '../home/Header'
import TextField from 'material-ui/TextField'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { verify } from 'password-hash'
import { browserHistory } from 'react-router'

export default class AddPodcast extends React.Component {
  constructor () {
    super()
    this.state = {
      message: '',
      open: false
    }
    this.timer = undefined;
  }

  componentWillUnMount() {
    clearTimeout(this.timer);
  }

  handleClick (e) {
    const { title, author, url, date, imgUrl, slug, authpassword } = this.state
    const hash = 'sha1$8cd6d17b$1$9e9af177141e91ed72628a3c593a220bc9a4bcdb';
    if (verify(authpassword, hash)) {
      const podcast = {
        title,
        author,
        url,
        date,
        imgUrl,
        slug
      }
      request.post('/api/podcast')
        .set('Content-Type', 'application/json')
        .send(podcast)
        .end((err, res) => {
          if (err) {
            this.setState({
               open: true,
             });

             return this.timer = setTimeout(() => {
               this.setState({
                 message: `An error occured: ${err}`,
               });
             }, 1500);
          }

          const newSlug = res.body.createdPodcastSlug
          return browserHistory.push(`/podcast/${newSlug}`)
        })
    } else {
      this.setState({
         open: true,
       });

       this.timer = setTimeout(() => {
         this.setState({
           message: `You are not authorized to add a new podcast`,
         });
       }, 10);

       setTimeout(() => {
         return browserHistory.push('/')
       }, 3000)
    }
  }

  handleChange (e) {
    const { name: field, value: val } = e.target
    this.setState({
      [field]: val
    })
  }

  render () {
    const styles = {
      floatingLabelStyle: {
        color: '#df405a'
      },
      underlineStyle: {
        borderColor: '#df405a',
      },
      buttonStyle: {
        margin: '25px auto',
        width: '100%'
      }
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <div className="latest-podcasts">
            <p className="latest-podcasts__label">Add new podcast</p>
            <TextField
              floatingLabelText="Title"
              value={this.state.title}
              name="title"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Author"
              value={this.state.author}
              name="author"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Url"
              value={this.state.url}
              name="url"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Date"
              value={this.state.date}
              name="date"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Image Url"
              value={this.state.imgUrl}
              name="imgUrl"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Slug"
              value={this.state.slug}
              name="slug"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              floatingLabelText="Authorization password"
              value={this.state.authpassword}
              name="authpassword"
              type="password"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange.bind(this)}
            />

            <RaisedButton
              label="Add new podcast"
              style={styles.buttonStyle}
              secondary={true}
              disabled={!(this.state.title && this.state.author && this.state.url && this.state.imgUrl && this.state.slug && this.state.date && this.state.authpassword) ? true : false}
              onClick={this.handleClick.bind(this)}
            />

            <Snackbar
              open={this.state.open}
              message={this.state.message}
              action="ok"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />


          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
