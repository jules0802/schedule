import React, { useState } from "react";
import { Button, Select, Modal } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch , useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSVLink } from 'react-csv'

import './TopPanel.scss';

import UserColorSettings from '../UserColorSettings/UserColorSettings'
import { getEventTypes } from './helpers/getEventTypes'
import { EventData, RootStateType } from "../types";
import { changeMode } from "../../redux/actions";
import { getEventsDataCsv } from "./helpers/getEventsDataCsv";

import Timezone from "./Timezone/Timezone";


const TopPanel: React.FC = () => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const mode = useSelector<RootStateType, string>(state => state.app.mode);
    const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
    const eventsData = allEventsData.length ? getEventTypes(allEventsData) : [];
    const dataForCsv = allEventsData.length ? allEventsData.map(getEventsDataCsv) : [];

    const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
    const defaultZone = useSelector<RootStateType, string>(state => state.timezone.defaultZone);
    const language = useSelector<RootStateType, string>(state => state.app.language);
    const modeOptionStudent = (language === 'eng') ? 'Student' : 'Студент';
    const modeOptionMentor = (language === 'eng') ? 'Mentor' : 'Ментор';
    const createNewTask = (language === 'eng') ? 'Create new task +' : 'Создать новое задание +';
    const saveSheduleAs = (language === 'eng') ? 'Save shedule as:' : 'Сохранить расписание как:';
    const colorSettingsBtn = (language === 'eng') ? 'Settings' : 'Настройки';
    const closeColorSettingsBtn = (language === 'eng') ? 'Close' : 'Закрыть';


    const [isShowModal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    };

    const handleCancel = () => {
        setModal(false);
    };

  return (
    <div className="top-panel">
        <div className="left-bar">
            <Select
                className="select-mode"
                defaultValue={mode}
                onChange={(value) => dispatch(changeMode(value))}>
                <Option value="student">{modeOptionStudent}</Option>
                <Option value="mentor">{modeOptionMentor}</Option>
            </Select>
            {
                mode === 'mentor' ?
                    <NavLink to="/task-creator">
                        <Button className="create-task-btn">{createNewTask}</Button>
                    </NavLink> : null
            }
        </div>
      <div className="right-bar">
        <div className="save-container">
          <p>{saveSheduleAs}
              <CSVLink data={dataForCsv} filename={'schedule.csv'}> csv</CSVLink>
              <DownloadOutlined />
          </p>
        </div>
          <Button className="settings-btn" onClick={() => showModal()}>Settings <SettingOutlined /> </Button>
          <Modal
              className={accessability ? 'accessability-on' : ''}
              style={{top: 20}}
              title={colorSettingsBtn}
              visible={isShowModal}
              onCancel={handleCancel}
              footer={[
                  <Button key="submit" type="primary" onClick={handleCancel}>
                      {closeColorSettingsBtn}
                  </Button>,
              ]}
          >
              <UserColorSettings eventsData={eventsData}/>
          </Modal>
        <Timezone/>
      </div>
    </div>
  )
}

export default TopPanel;
