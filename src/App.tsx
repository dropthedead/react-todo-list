import { MantineProvider, createTheme, Paper } from '@mantine/core';

import '@mantine/core/styles.css';
import './App.css';
import ManageTasks from './components/TaskList';
const theme = createTheme({
	fontFamily: 'Montserrat, sans-serif',
	primaryColor: 'cyan',
});
function App() {
	// async function onSignIn(googleUser) {
	// 	const profile = googleUser.getBasicProfile();
	// 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	// 	console.log('Name: ' + profile.getName());
	// 	console.log('Image URL: ' + profile.getImageUrl());
	// 	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

	// }

	return (
		<MantineProvider theme={theme}>
			<Paper shadow="md" p="xl">
				{/* <div className="g-signin2" data-onsuccess={onSignIn}></div> */}
				<div className="app_wrapper">
					<header className="header">todo list</header>
					<ManageTasks />
				</div>
			</Paper>
		</MantineProvider>
	);
}

export default App;
