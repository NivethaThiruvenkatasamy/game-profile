import { SetStateAction } from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore  from 'redux-mock-store';
import {ActionButtons} from '../ActionButtons';
import { Rootstate } from '../../../store';

const mockStore = configureStore([]);

describe('ActionButtons component', () => {
	let store: ReturnType<typeof mockStore>;
	let initialState: Rootstate;

	beforeEach(() => {
		initialState = {
			profile:{
			selectedProfile:	{
				index: 2,
				name: "Music",
			},
			profileList: [
				{index : 0, name : "Game"},
				{index : 1, name : "Movie"},
				{index : 2, name : "Music"}
			]
		 }
		}
		store = mockStore(initialState)
	})

	test("renders default action buttons", () =>{
		render(
			<Provider store={store}>
				 <ActionButtons setIsEditable={setIsEditable} profileList={initialState.profile.profileList} selectedProfile={initialState.profile.selectedProfile}/>
			</Provider>
		);

		//check if the initial buttons are rendered
		expect(screen.getByAltText('move-up-icon')).toBeInTheDocument();
		expect(screen.getByAltText('move-down-icon')).toBeInTheDocument();
		expect(screen.getByAltText('add-icon')).toBeInTheDocument();
	})
	test("delete and edit buttons are not rendered", () =>{
		render(
			<Provider store={store}>
				 <ActionButtons setIsEditable={setIsEditable} profileList={initialState.profile.profileList} selectedProfile={initialState.profile.selectedProfile}/>
			</Provider>
		);

		expect(screen.queryByAltText('delete-icon')).not.toBeInTheDocument();
		expect(screen.queryByAltText('edit-icon')).not.toBeInTheDocument();
	})

	test('clicking move up button dispatches action to move profile up (swap)', async () => {
		render (
			<Provider store={store}>
				 <ActionButtons setIsEditable={setIsEditable} profileList={initialState.profile.profileList} selectedProfile={initialState.profile.selectedProfile}/>
			</Provider>
		)
		const moveupButton = screen.getByTestId("move-up-div");
		fireEvent.click(moveupButton)

	await waitFor(() => {
		const actions = store.getActions();
		expect(actions.length).toBeGreaterThan(0);
		//test whether the correct action is dispatched
	if(actions.length > 0 ){
		// eslint-disable-next-line jest/no-conditional-expect
		expect(store.getActions()).toContainEqual({
			type: 'profileSlice/setProfileListReducer',
			payload: [
				{index : 0, name : "Game"},
				{index : 2, name : "Music"},
				{index : 1, name : "Movie"}
			]
		})
	   }
	})
	
	})
})

function setIsEditable(value: SetStateAction<boolean>): void {
	console.log("test function")
}
