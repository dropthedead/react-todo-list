import React, { ReactElement, useState } from 'react';
import { Button, Checkbox, Input } from '@mantine/core';
type PropsType = {
	task: {
		text: string;
		id: string;
		done: boolean;
	};
	handleEdit(id: string): void;
	editableTask: string | null;
	deleteTask(
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void;
	saveEditTask(id: string, text: string, placeholder: string): void;
	handleCheckboxChange: (id: string, done: boolean) => void;
};

export default function TaskItem({
	task,
	handleEdit,
	editableTask,
	deleteTask,
	saveEditTask,
	handleCheckboxChange,
}: PropsType): ReactElement {
	const [addValueInput, setValueInput] = useState('');
	return (
		<>
			<li className="item_list">
				<div className="item_wrapper">
					<Checkbox
						className="checkbox"
						defaultChecked={task.done}
						onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
					/>

					{editableTask == task.id ? (
						<Input
							className="input_edit"
							value={addValueInput}
							placeholder={task.text}
							onChange={(e) => setValueInput(e.target.value)}
						/>
					) : (
						<div className="task_text">{task.text}</div>
					)}
				</div>
				<div className="button_wrapper">
					{editableTask == task.id ? (
						<Button
							variant="filled"
							color="rgba(15, 2, 2, 1)"
							onClick={() => saveEditTask(task.id, addValueInput, task.text)}
						>
							Save
						</Button>
					) : (
						<Button
							variant="filled"
							color="rgba(15, 2, 2, 1)"
							onClick={() => handleEdit(task.id)}
						>
							Edit
						</Button>
					)}

					<Button
						variant="filled"
						color="rgba(15, 2, 2, 1)"
						onClick={(e) => deleteTask(task.id, e)}
					>
						Delete
					</Button>
				</div>
			</li>
		</>
	);
}
