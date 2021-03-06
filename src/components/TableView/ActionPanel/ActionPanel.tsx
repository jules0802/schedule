import React, { ReactText } from "react";
import { Button , message , Popconfirm } from "antd";
import { DeleteOutlined , EditOutlined } from "@ant-design/icons";
import axios from 'axios';
import { EventDataTable } from '../../types';

import { urlApi } from "../../../data/const";
import {RootStateType , TableData} from "../../types";

import './ActionPanel.scss';
import { Link } from "react-router-dom";

interface Props {
    currentEvent: {
        _id: number,
        key: number
    }
    setTableData: React.Dispatch<EventDataTable[] | undefined>,
    tableData: EventDataTable[] | undefined;
}

export const ActionPanel: React.FC<Props> = ({currentEvent, setTableData, tableData}) => {
    const removeRow = (removeKey: number) => {
        if (tableData) {
            setTableData(tableData.filter((elem: { key: number }) =>
            elem.key !== removeKey));
        }
    }

    const confirmDeletion = async (e: any) => {
        message.success('Event removed');
        await axios.delete(`${urlApi}/remove_event/${currentEvent._id}`).catch(e => console.error(e));
        removeRow(currentEvent._id);
    }

    const cancelDeletion = (e: any) => {
        message.error('Abort remove');
    }

    return (
        <div className='action_panel'>
            <Link to={`/task-editor/${currentEvent._id}`}>
                <Button
                    className="task-btn"
                    type="dashed"
                    shape="circle"
                    icon={<EditOutlined />} />
            </Link>
            <Popconfirm
            title="Are you sure remove this event?"
            onConfirm={confirmDeletion}
            onCancel={cancelDeletion}
            okText="Yes"
            cancelText="No"
            >
            <Button className="task-btn" type="dashed" shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
        </div>
    )
}
