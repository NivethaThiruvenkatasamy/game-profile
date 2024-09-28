import React from 'react'
import { Rootstate } from '../../store'
import { useSelector } from 'react-redux'
import "./RightPanel.css"


export const RightPanel = () => {
	const selectedProfile = useSelector((state: Rootstate)=> state.profile?.selectedProfile)
  return (
	<div className='right-panel'>
		<span>{selectedProfile?.name}</span>
	</div>
  )
}
