import { v4 as uuidv4 } from 'uuid';
export interface Task {
	id: string;
	text: string;
	done: boolean;
}
export const initialTasks: Task[] = [
	{ id: uuidv4(), text: 'Buy Milk', done: false },
	{ id: uuidv4(), text: 'Visit Dentist', done: false },
	{ id: uuidv4(), text: 'Watch Movie', done: false },
];
