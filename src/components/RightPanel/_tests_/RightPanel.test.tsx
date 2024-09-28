
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore  from 'redux-mock-store';
import { RightPanel } from '../RightPanel';

const mockStore = configureStore([]);
describe('Rightpanel Component', () =>{
	let store: ReturnType<typeof mockStore>;
	beforeEach(()=>{
		const mockStore =  configureStore();
		store = mockStore({
			profile:{
				selectedProfile: {name: "Game", icon: 'icon.svg'}
			}
		})
	})
	it('render selected Profile name', () => {
		render(
			<Provider store={store}>
				<RightPanel/>
			</Provider>
		)

		expect(screen.getByText('Game')).toBeInTheDocument();
	})
})