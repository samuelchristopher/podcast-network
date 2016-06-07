import React from 'react'
import request from 'superagent'
import Header from '../home/Header'
import TextField from 'material-ui/TextField'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class AddPodcast extends React.Component {
  render () {
    const styles = {
      floatingLabelStyle: {
        color: '#df405a'
      },
      underlineStyle: {
        borderColor: '#df405a',
      }
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <div className="latest-podcasts">
            <p className="latest-podcasts__label">Add new podcast</p>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
              floatingLabelStyle={styles.floatingLabelStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
