import profileSlice, {profileActions} from '../profile-slice';

describe('profile slice', () => {
	describe('reducers', () =>{
		it('should handle setting the selected profile', () => {
			const initialState = {
				profileList: [],
				selectedProfile: null,
			}
			const newState = profileSlice.reducer(initialState, profileActions.setSelectedProfileReducer({index: 1, name: 'Movie', icon: 'icon0.svg'}))
			expect(newState.selectedProfile).toEqual({index:1, name: 'Movie', icon: "icon0.svg"})

		});
		it('should set profile List correctly', () => {
			const initialState = {
				profileList: [],
				selectedProfile: null,
			}
			const newState = profileSlice.reducer(initialState, profileActions.setProfileListReducer([{index: 1, name: 'Movie', icon: 'icon0.svg'}]))
			expect(newState.profileList).toHaveLength(1);

		});
		it('should add a new profile correctly', () => {
			const initialState = {
				profileList: [{index: 0, name: 'Movie', icon: 'icon0.svg'}],
				selectedProfile: {index: 0, name: 'Movie', icon: 'icon0.svg'},
			}
			const newState = profileSlice.reducer(initialState, profileActions.addNewProfileReducer())
			expect(newState.profileList).toHaveLength(2);

		});
		it('should edit profile name correctly', () => {
			const initialState = {
				profileList: [{index: 0, name: 'Movie', icon: 'icon0.svg'}],
				selectedProfile: {index: 0, name: 'Movie', icon: 'icon0.svg'},
			}
			const newState = profileSlice.reducer(initialState, profileActions.editProfileNameReducer({index: 0, newName: 'New Profile'}))
			expect(newState.profileList[0].name).toEqual('New Profile');

		});

	})
})