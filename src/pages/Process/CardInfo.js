import React, { useEffect, useState } from 'react'
import {
    Calendar,
    CheckSquare,
    List,
    Tag,
    Trash,
    X,
} from "react-feather";
import Modal from "./Modal/Modal";
import "./CardInfo.css";
import TextField from '@mui/material/TextField';

const CardInfo = (props) => {

    const colors = [
			"#a8193d",
			"#4fcc25",
			"#1ebffa",
			"#8da377",
			"#9975bd",
			"#cf61a1",
			"#240959",
    ];

    const [selectedColor, setSelectedColor] = useState();

    const [values, setValues] = useState({
        ...props.card,
    });
    
    const updateTitle = (value) => {
        setValues({ ...values, title: value });
    };
    
    const updateDesc = (value) => {
        setValues({ ...values, desc: value });
    };
    
    const addLabel = (label) => {
        const index = values.labels.findIndex((item) => item.text === label.text);
        if (index > -1) return;
    
        setSelectedColor("");
        setValues({
          	...values,
          	labels: [...values.labels, label],
        });
    };
    
    const removeLabel = (label) => {
        const tempLabels = values.labels.filter((item) => item.text !== label.text);
    
        setValues({
          	...values,
          	labels: tempLabels,
        });
    };
    
    const addTask = (value) => {
        const task = {
			id: Date.now() + Math.random() * 2,
			completed: false,
			text: value,
        };
        setValues({
          	...values,
          	tasks: [...values.tasks, task],
        });
    };
    
    const removeTask = (id) => {
        const tasks = [...values.tasks];
    
        const tempTasks = tasks.filter((item) => item.id !== id);
        setValues({
			...values,
			tasks: tempTasks,
        });
    };
    
    const updateTask = (id, value) => {
        const tasks = [...values.tasks];
    
        const index = tasks.findIndex((item) => item.id === id);
        if (index < 0) return;
    
        tasks[index].completed = value;
    
        setValues({
			...values,
			tasks,
        });
    };
    
	const calculatePercent = () => {
		if (!values.tasks?.length) return 0;
		const completed = values.tasks?.filter((item) => item.completed)?.length;
		return (completed / values.tasks?.length) * 100;
    };
    
    const updateDate = (date) => {
        if (!date) return;
    
        setValues({
			...values,
			date,
        });
    };

	//const getvalue = "!"
	//console.log(values)

    useEffect(() => {
        if (props.updateCard) props.updateCard(props.boardId, values.id, values);
		console.log(props)
    }, [values, props]);

    return (
        <Modal onClose={props.onClose}>
			<div className="cardinfo">
				<div className="cardinfo_box">
					<div className="cardinfo_box_title">
						<p>{props.item.content}</p>
					</div>
					<div className="cardinfo_box_title">
					
						<List />
						<p>Etape</p>
					</div>
				</div>

				<div className="cardinfo_box">
				<div className="cardinfo_box_title">
					<Calendar />
					<p>Date</p>
				</div>
				<input
					type="date"
					defaultValue={props.item.date}
					min={new Date().toISOString().substr(0, 10)}
					onChange={(event) => updateDate(event.target.value)}
				/>
				</div>
				<div className="cardinfo_box">
					<div className="cardinfo_box_title">
						<p>Debrief</p>
					</div>
					<TextField
						id="Debrief"
						label="Debrief"
						multiline
						//maxRows={4}
						//value={props.item.debrief}
						focused
						//onChange={handleChange}
					/>
				</div>
				<div className="cardinfo_box">
				<div className="cardinfo_box_title">
					<Tag />
					<p>Client</p>
				</div>
				<div className="cardinfo_box_labels">
					{values.labels?.map((item, index) => (
					<label
						key={index}
						style={{ backgroundColor: item.color, color: "#fff" }}
					>
						{item.text}
						<X onClick={() => removeLabel(item)} />
					</label>
					))}
				</div>
				
				
				</div>

			</div>
    	</Modal>
    )
}

export default CardInfo
