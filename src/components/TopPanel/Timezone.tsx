import React from 'react';
import { Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../types";
import { changeTimezoneActCreator } from "../../redux/actions";

const { Option } = Select;

export const Timezone = () => {
    const dispatch = useDispatch();
    const zonesData = useSelector<RootStateType, any>(state => state.timezone);
    const zoneItem = zonesData.zones.map((zone: string, index: number) => {
      return <Option value= { zone } key = { index } > { zone }  </Option>
      })

      return (
          <div style = {{ display: 'inline-block'}}>
            <Select 
             value= { zonesData.activeZone || zonesData.defaultZone }
             style={{ width: 250 }} 
             onChange={(e) => dispatch(changeTimezoneActCreator(e))}>
                { zoneItem }
            </Select>
          </div>
      )
}
