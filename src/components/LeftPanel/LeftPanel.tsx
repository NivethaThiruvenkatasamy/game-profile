import React, {useState , useRef, useEffect} from 'react'
import { Rootstate } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { profileActions } from '../../store/profile-slice';
import { Profile } from '../../types/profile.type';
import { ActionButtons } from './ActionButtons';
import "./LeftPanel.css"

export const LeftPanel = () => {
  const [isEditable, setIsEditable] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const profileList = useSelector((state:Rootstate) => state.profile.profileList) || [];	
  const selectedProfile = useSelector((state:Rootstate) => state.profile.selectedProfile) || {};
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Function to set the selected profile*/
  const setSelectedProfile =(profile : Profile)=>{
	dispatch(profileActions.setSelectedProfileReducer(profile))
  }

  /* Function to handle the edit change*/
  const handleNameChange =(e : React.ChangeEvent<HTMLInputElement>)=>{
	const newName = e.target.value;
	if(newName !== ''){
		dispatch(profileActions.editProfileNameReducer({index: selectedProfile.index, newName}))
	}

  }
  useEffect(() => {
	if(isEditable && inputRef.current){
		inputRef.current.focus();
		inputRef.current.select();
	}
  },[isEditable])

  useEffect(() => {
	const container = containerRef.current;
	if(container)
	container.scrollTop = container?.scrollHeight;
  },[profileList])

  return (
	<div className='left-panel'>
		<h1 className='main-title'>PROFILE LIST</h1>
		<div className='profile-group'>
		  <div className="profile-list" ref={containerRef}>
			{profileList?.map((profile: Profile, index: number)=>
				<div data-testid={profile.name} key={index} className={profile.index === selectedProfile.index ? 'profile-item-active' : 'profile-item'} onClick={()=>setSelectedProfile(profile)} onBlur={()=>setIsEditable(false)}>
					<img alt={profile.name} src={profile.icon}/>
					{isEditable && profile.index === selectedProfile.index ? (
						<input className="input-field" ref={inputRef} placeholder='Enter Profile Name' maxLength={25} type="text" defaultValue={profile.name} onChange={(e) => handleNameChange(e)}/> 
					):(
						<span className="profile-name">{profile.name}</span>
					)
					}
				</div>
			)}
			</div>
			<ActionButtons setIsEditable = {setIsEditable} selectedProfile={selectedProfile} profileList={profileList}/>
		</div>
	</div>
  )
}
