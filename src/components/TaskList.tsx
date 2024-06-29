import { useEffect, useState } from 'react';
import { initialTasks } from '../initialTasks/InitialTasks';
import TaskItem from './TaskItem';
import { Input, Button, Text } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../initialTasks/InitialTasks';

export default function ManageTasks() {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : initialTasks;
	});
	const [editableTask, setEditableTask] = useState<null | string>(null);
	const [addValueInput, setValueInput] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
		if (storedTasks.length === 0) {
			localStorage.setItem('tasks', JSON.stringify(initialTasks));
			setTasks(initialTasks);
		} else {
			setTasks(storedTasks);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	function editTask(id: string) {
		setEditableTask(id);
	}
	function deleteTask(
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault;
		setTasks((prevState: Task[]) => prevState.filter((x) => x.id !== id));
	}

	function addTask() {
		if (!addValueInput.trim()) {
			setError('Task cannot be empty');
			return;
		}

		setTasks((prevState: Task[]) => [
			...prevState,
			{ id: uuidv4(), text: addValueInput, done: false },
		]);
		setValueInput('');
		setError('');
	}
	function saveEditTask(id: string, text: string, placeholder: string) {
		if (!text.trim()) {
			text = placeholder;
		}

		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, text } : task
		);

		setTasks(updatedTasks);
		setEditableTask(null);
	}

	function submitOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			addTask();
		}
	}
	function handleCheckboxChange(id: string, done: boolean) {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, done } : task
		);
		setTasks(updatedTasks);
		setEditableTask(null);
	}
	return (
		<>
			<h1>Tasks</h1>
			<div className="add_task">
				<Input
					variant="filled"
					size="md"
					radius="md"
					placeholder="Add your task"
					value={addValueInput}
					onChange={(e) => {
						setValueInput(e.target.value);
						if (e.target.value.trim()) {
							setError('');
						} else {
							setError('Task cannot be empty');
						}
					}}
					onKeyDown={submitOnEnter}
					error={!!error}
				/>
				{error && <Text className="error">{error}</Text>}
				<Button variant="filled" color="rgba(15, 2, 2, 1)" onClick={addTask}>
					Add
				</Button>
			</div>
			<ul className="tasks">
				{tasks
					.filter((task) => !task.done)
					.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							handleEdit={editTask}
							editableTask={editableTask}
							deleteTask={deleteTask}
							saveEditTask={saveEditTask}
							handleCheckboxChange={handleCheckboxChange}
						/>
					))
					.reverse()}
			</ul>

			{tasks.some((task) => task.done) && (
				<div className="divider">Done Tasks</div>
			)}

			<ul className="tasks_done">
				{tasks
					.filter((task) => task.done)
					.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							handleEdit={editTask}
							editableTask={editableTask}
							deleteTask={deleteTask}
							saveEditTask={saveEditTask}
							handleCheckboxChange={handleCheckboxChange}
						/>
					))
					.reverse()}
			</ul>
		</>
	);
}
