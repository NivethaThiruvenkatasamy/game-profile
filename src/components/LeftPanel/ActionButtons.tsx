import  { Dispatch, SetStateAction, useState } from 'react'
import { Profile } from '../../types/profile.type';
import _ from "lodash";
import {useDispatch} from "react-redux";
import { profileActions } from '../../store/profile-slice';
import moveDownIcon from "../../assets/images/icon_arrow_down.svg"
import moveUpIcon from "../../assets/images/icon_arrow_up.svg"
import deleteIcon from "../../assets/images/icon_delete.svg"
import editIcon from "../../assets/images/icon_edit.svg"
import addIcon from "../../assets/images/icon_plus.svg"
import "./LeftPanel.css"
import Modal from 'react-modal'


interface actionButtonProps{
	setIsEditable: Dispatch<SetStateAction<boolean>>;
	selectedProfile: Profile;
	profileList: Profile[];
}

export const ActionButtons = (props : actionButtonProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const selectedIndex = props.selectedProfile.index;
  const index = props.profileList.findIndex(profile => profile.index === selectedIndex)
  const dispatch = useDispatch();

//function to handle click on move up icon
const handleMoveUp = () =>{
	if(index >0){
		const newProfileList = _.cloneDeep(props.profileList);
		//swap positions of the profiles
		[newProfileList[index-1],newProfileList[index]] = [newProfileList[index],newProfileList[index-1]]
		dispatch(profileActions.setProfileListReducer(newProfileList))
	}
  }

// function to handle click on move down button
const handleMoveDown = () => {
	if(index < props.profileList.length -1 ){
		const newProfileList = _.cloneDeep(props.profileList);
		//swap positions of the profiles
		[newProfileList[index],newProfileList[index + 1]] = [newProfileList[index+1],newProfileList[index]]
		dispatch(profileActions.setProfileListReducer(newProfileList))
	}
}

//function to handle add new profile button click
const editSelectedProfile = () => {
    props.setIsEditable(true)

}
//function to handle delete selected profile
const deleteSelectedProfile = () => {
	setShowConfirmation(false);
    if(selectedIndex !== -1){
		const updatedProfileList = [...props.profileList];
		updatedProfileList.splice(index, 1);
		dispatch(profileActions.setProfileListReducer(updatedProfileList))

		//update selected profile to the profile before the deleted index
		const newSelectedIndex = Math.max(0, index -1);
		const newSelectedProfile = updatedProfileList[newSelectedIndex];
		dispatch(profileActions.setSelectedProfileReducer(newSelectedProfile))
	}

}

//function to handle add profile
const hanleAddProfile = () => {
	dispatch(profileActions.addNewProfileReducer())
}
  
return (
	<div data-testid="button-group" className='button-group'>
		<div  className='button-left-group' >
		    <div data-testid="move-up-div" onClick= {() =>handleMoveUp()}>
				<img className={index === 0 ? 'disabled-icon' : ''} alt="move-up-icon" src={moveUpIcon}/>
			</div>
			<div onClick= {() =>handleMoveDown()}>
				<img className={index=== props.profileList.length-1 ? 'disabled-icon' : ''} alt="move-down-icon" src={moveDownIcon}/>
			</div>
		</div>
		<div className='button-right-group'>
		    {selectedIndex?.toString().includes('-')  && <div onClick= {() =>setShowConfirmation(true)}>
				<img alt="delete-icon" src={deleteIcon}/>
			</div>}
			
			<Modal isOpen={showConfirmation} 
				   onRequestClose={() => setShowConfirmation(false)}
			 	   shouldCloseOnOverlayClick={true} 
			       shouldCloseOnEsc={true} 
				   className="delete-confirmation-dialog"
				   style={{
					overlay:{
						backgroundColor: 'transparent'
					},
					content:{
						position: 'absolute',
						top : '40%',
						left: '10%',
						padding: '20px',
						width: '260px',
						border: '1px solid #c8323c'
					}
				   }}>
          		<span className="title">delete eq</span>
          		<span className="body-text" id="delName">{props.selectedProfile.name}</span>
          		<button className="delete-btn" id="cfmDelete" onClick={() => deleteSelectedProfile()}>DELETE</button>
        	</Modal>

			{selectedIndex?.toString().includes('-')  && <div onClick= {() =>editSelectedProfile()}>
				<img alt="edit-icon" src={editIcon}/>
			</div>}
			<div onClick= {() =>hanleAddProfile()}>
				<img alt="add-icon" src={addIcon}/>
			</div>
		</div>
	</div>
  )
}
