import React, { useContext } from 'react'
import AppContext from '../context'
import Compare from '../views/compare'
import Search from '../views/search'

export default () => {
  const { state } = useContext(AppContext)
  return state.view === 'COMPARE' 
    ? <Compare />
    : <Search />
}