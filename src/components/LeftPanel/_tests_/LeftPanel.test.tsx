import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore  from 'redux-mock-store';
import {LeftPanel} from '../LeftPanel';
import { Rootstate } from '../../../store';


const mockStore = configureStore([]);
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn()
}));



describe('LeftPanel component', () => {
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

	it('leftpanel renders correctly', async () => {
		render(
			<Provider store={store}>
				<LeftPanel/>
			</Provider>
		)
			expect(screen.getByText('PROFILE LIST')).toBeInTheDocument();
	})
})