import { createSlice } from "@reduxjs/toolkit";
import defaultIcon from "../assets/images/icon_profiles_default.svg"
import gameIcon from "../assets/images/icon_profiles_game.svg"
import movieIcon from "../assets/images/icon_profiles_movie.svg"
import musicIcon from "../assets/images/icon_profiles_music.svg"
import customIcon from "../assets/images/icon_profiles_custom.svg"
import {Profile} from "../types/profile.type"
import {v4 as uuidv4} from 'uuid';


//Default values
const defaultProfileList = [
	{
		index: 0,
		name: "Default",
		icon: defaultIcon
	},
	{
		index: 1,
		name: "Game",
		icon: gameIcon
	},
	{
		index: 2,
		name: "Movie",
		icon: movieIcon
	},
	{
		index: 3,
		name: "Music",
		icon: musicIcon
	},
]

 //load profileList from local storage, if no data default profiles should be used
const storedProfileList = localStorage?.getItem("profileList") ? JSON.parse(localStorage.getItem("profileList") ?? "") : null
const storedSelectedProfile = localStorage?.getItem("selectedProfile") ? JSON.parse(localStorage.getItem("selectedProfile") ?? "") : null
if((storedProfileList === null || storedProfileList === " " || storedProfileList === undefined) || (storedSelectedProfile === undefined || storedSelectedProfile === null)){
	
	localStorage.setItem("profileList", JSON.stringify(defaultProfileList))
	localStorage.setItem("selectedProfile", JSON.stringify(defaultProfileList[0]))
}


// initial state
const initialState = {
  profileList: storedProfileList ? storedProfileList : defaultProfileList as Profile[],
  selectedProfile : storedSelectedProfile ? storedSelectedProfile : defaultProfileList[0]
}

//Declaring profile slice
const profileSlice = createSlice({
	name: "profileSlice",
	initialState,
	reducers:{
		//reducer to set the profile list
		setProfileListReducer(state, action){
			state.profileList = action.payload;
			localStorage.setItem("profileList", JSON.stringify(action.payload))
		},
		//reducer to set/update the selected profile
		setSelectedProfileReducer(state, action){
			if(action.payload)
			localStorage.setItem("selectedProfile",JSON.stringify(action.payload) )
			return {...state, selectedProfile: action.payload}
			
		},
		//reducer to add new profile
		addNewProfileReducer(state){
			//default new profile
			const newProfile ={
				index: uuidv4(),
				name: "New Profile",
				icon: customIcon,
			}
			const updatedProfileList = [...state.profileList, newProfile];
			localStorage.setItem("profileList", JSON.stringify(updatedProfileList));
			return{
				...state,
				profileList: updatedProfileList,
				//new profile should be the selected profile
				selectedProfile: newProfile,
			}
		},
		//reducer to edit profile name
		editProfileNameReducer(state, action){
			const {index, newName} = action.payload;
			const updatedProfileList = state.profileList.map((profile:Profile) => {
				if(profile.index === index){
					return {...profile, name: newName};
				}
				return profile;
			});
			localStorage.setItem("profileList", JSON.stringify(updatedProfileList))
			return {
				...state,
				profileList: updatedProfileList,
				selectedProfile: {...state.selectedProfile, name:newName}
			}
		 
		}
	}
})

export const profileActions = {
	...profileSlice.actions,
	autoSaveProfileList: () => {
		return(dispatch: any, getState: any) => {
			if(getState().profile.autoSaveTimeout){
				clearTimeout(getState().profile.autoSaveTimeout)
			}
		//set new timeout for auto-saving after 3 seconds
		setTimeout(() => {
			const profileList = getState().profile.profileList;
			//Simulated Api call
			saveProfileListToAPI(profileList)
			.then((response: any) => {
				console.log("Profile list saved successfully", response);
			})
			.catch((error: any) => {
				console.error("Error saving profile list", error)
			})
		}, 3000)
	  }
	}
}

//simulated Api call
const saveProfileListToAPI = (profileList: Profile[]) => {
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			const success = Math.random() >= 0.5;
			if(success){
				resolve("Success");
			}else{
				reject("Failed to save profile list")
			}
		},1000)
	})
}
export default profileSlice