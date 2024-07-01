import React, { ReactElement, useRef, useState } from 'react';
import { Button, Checkbox, Input } from '@mantine/core';

type PropsType = {
	task: {
		text: string;
		id: string;
		done: boolean;
		initialIndex: number;
	};
	handleEdit(id: string): void;
	editableTask: string | null;
	deleteTask(
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void;
	saveEditTask(id: string, text: string, placeholder: string): void;
	handleCheckboxChange: (id: string, done: boolean) => void;
	index: number;
};

export default function TaskItem({
	task,
	handleEdit,
	editableTask,
	deleteTask,
	saveEditTask,
	handleCheckboxChange,
	index,
}: PropsType): ReactElement {
	const [addValueInput, setValueInput] = useState(task.text);
	const isSavingRef = useRef(false);
	const [error, setError] = useState('');

	const handleBlur = () => {
		if (isSavingRef.current) {
			isSavingRef.current = false;
			return;
		}
		if (addValueInput.trim() !== '' && addValueInput !== task.text) {
			saveEditTask(task.id, addValueInput, task.text);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
		if (!e.target.value.trim()) {
			setError('Task cannot be empty!');
			return;
		}
		setError('');
	};

	const handleSaveClick = () => {
		isSavingRef.current = true;
		saveEditTask(task.id, addValueInput, task.text);
		isSavingRef.current = false;
	};

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
							placeholder={addValueInput}
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={!!error}
							tabIndex={index}
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
							onMouseDown={() => (isSavingRef.current = true)}
							onClick={handleSaveClick}
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
