import { MantineProvider, createTheme, Paper } from '@mantine/core';

import '@mantine/core/styles.css';
import './App.css';
import ManageTasks from './components/TaskList';
const theme = createTheme({
	fontFamily: 'Montserrat, sans-serif',
	primaryColor: 'cyan',
});
function App() {
	return (
		<MantineProvider theme={theme}>
			<Paper shadow="md" p="xl">
				<div className="app_wrapper">
					<header className="header">todo list</header>
					<ManageTasks />
				</div>
			</Paper>
		</MantineProvider>
	);
}

export default App;
