import R        from 'ramda'
import React    from 'react'
import { Link } from 'react-router-dom'

import IconMenu   from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import './header.scss'

const Header = ({show_header_color, onClickShowNav}) => {
  const header_bg_color = show_header_color ? ' bg-color' : ''

  return (
    <header>
      <div
        className={
          R.join(' ', [
            'navbar navbar-trans',
            'fixed-top justify-content-between flex-row',
            header_bg_color
          ])
        }
        >
        <button
          className='buybuy-btn'
          onTouchTap={onClickShowNav}
        >
          <i className='fa fa-bars fa-lg'></i>
        </button>
        <Link to='/' style={{fontSize: '20px'}}>Buy Buy</Link>
        <div style={{color: '#0275d8'}}>
          <i className='fa fa-user-o fa-lg' />
        </div>
      </div>
    </header>
  )
}

export default Header