import React, { Component } from 'react'

import { flatSharing } from '../utils/request'
import store from '../utils/store'

import Trash from '../assets/trash.svg'
import Setting from '../assets/settings.svg'
import Shop from '../assets/shop.svg'

class FlatSharingComp extends Component {
  delete (id) {
    flatSharing().delete('/flatsharing/' + this.props.id)
    .then(res => {
      if (res.data.success === true) {
        store.notif.add('Flatsharing deleted!', 'success')
        this.props.delete(this.props.id)
      } else {
        store.notif.add(res.data.error, 'error')
      }
    }).catch(err => {
      if (err.response) {
        if (Array.isArray(err.response.data.error)) {
          store.notif.add(err.response.data.error[0], 'error')
        } else {
          store.notif.add(err.response.data.error, 'error')
        }
      } else {
        console.log(err)
      }
    })
  }

  render () {
    return (
      <div className='fs' >
        <div className='fs-name'>{this.props.name}</div>
        <div className='fs-tool'>
          <img className='icon' src={Shop} alt='Shop' onClick={() => this.props.history.push(`/flatsharing/${this.props.id}/purchases`)} />
          <img className='icon' src={Setting} alt='Settings' onClick={() => this.props.history.push(`/flatsharing/${this.props.id}/settings`)} />
          <img className='icon' src={Trash} alt='Delete' onClick={this.delete.bind(this)} />
        </div>
      </div>
    )
  }
}

export default FlatSharingComp
