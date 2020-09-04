import React, { useContext } from 'react'
import styled from 'styled-components'
import { MdRestore } from 'react-icons/md'
import AppContext from '../context/index'
import MultiRange from './multirange'
import CONSTANTS from '../constants'

const Heading = styled.p`
  color: ${CONSTANTS.COLORS.SECONDARY};
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 5px;
  text-transform: uppercase;
`

const FieldGroup = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Reset = styled.button`
  cursor: pointer;
  text-align: right;
  width: auto;
  &:hover {
    background: rgba(255,255,255,.25);
  }
`

export default () => {
  const { state, dispatch, controls } = useContext(AppContext)

  return (
    <>
      <Reset onClick={() => dispatch({ type: 'RESET' })} type="button">
        <MdRestore size="14px" />
        {' '}
        Reset
      </Reset>
      <Heading>SEARCH</Heading>
      <input 
        onChange={e => dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })} 
        value={state.search}
        placeholder="Keyword search" 
        type="search"
        style={{ marginBottom: 15 }}
      />
      {Object.entries(controls).map(entry => {
        const [key, val] = entry
        let Control
        switch(key) {
          case 'blade_width_expanded':
            // TODO: memoize min max
            const min = Math.min(...controls.blade_width_expanded)
            const max = Math.max(...controls.blade_width_expanded)
            Control = (
              <div style={{paddingLeft: 12, paddingRight: 12}}>
                <MultiRange 
                  min={min}
                  max={max}
                  handleFinalRangeChange={values => dispatch({ 
                    type: 'BLADE_WIDTH_CHANGE', 
                    payload: {
                      name: key,
                      values,
                    } 
                  })}           
                />
              </div>
            )
            break
          default:
            Control = Object.values(val).map(v => (val !== '' ? (
              <label key={v}>
                <input
                  name={key}
                  value={v}
                  onChange={e => dispatch({ type: 'TOGGLE_FILTER', payload: e.target })}
                  type="checkbox"
                /> {v}
              </label>
            ) : null))
        }

        return val !== '' ? (
          <FieldGroup key={key}>
            <Heading>{key}</Heading>
            {Control}
          </FieldGroup>
        ) : null
      })}      
    </>
  )
}