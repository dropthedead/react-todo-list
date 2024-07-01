import { v4 as uuidv4 } from 'uuid';
export interface Task {
	id: string;
	text: string;
	done: boolean;
	initialIndex: number;
}
export const initialTasks: Task[] = [
	{ id: uuidv4(), text: 'Buy Milk', done: false, initialIndex: 1 },
	{ id: uuidv4(), text: 'Visit Dentist', done: false, initialIndex: 2 },
	{ id: uuidv4(), text: 'Watch Movie', done: false, initialIndex: 3 },
];
