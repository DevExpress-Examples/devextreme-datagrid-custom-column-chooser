import 'devextreme/dist/css/dx.light.css';

import React, { useCallback, useState, useReducer } from 'react';

import DataGrid, { Column as DataGridColumn, type DataGridTypes } from 'devextreme-react/data-grid';
import { customers, initialState, type Column } from './data.js';
import CustomColumnChooser from './components/CustomColumnChooser';

function reducer(state: Column[], changes: Column[]): Column[] {
  if (changes.length === 0) return state;

  const changesMap = new Map(changes.map((change) => [change.dataField, change]));

  return state.map((column) => {
    const change = changesMap.get(column.dataField);
    return change ? { ...column, ...change } : column;
  });
}

export default function App(): JSX.Element {
  const [columns, setColumnsState] = useReducer(reducer, initialState);

  const [visible, setVisible] = useState(false);

  const onToolbarPreparing = useCallback((e: DataGridTypes.ToolbarPreparingEvent) => {
    e.toolbarOptions.items?.push({
      widget: 'dxButton',
      location: 'after',
      options: {
        icon: 'columnchooser',
        elementAttr: {
          id: 'myColumnChooser',
        },
        onClick: () => setVisible(true),
      },
    });
  }, [setVisible]);

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback((changes: Column[]) => {
    setColumnsState(changes);
    setVisible(false);
  }, [setColumnsState, setVisible]);

  return (
    <React.Fragment>
      <DataGrid
        id="grid"
        dataSource={customers}
        showBorders={true}
        onToolbarPreparing={onToolbarPreparing}
      >
        {columns.map((column) => (
          <DataGridColumn
            key={column.dataField}
            dataField={column.dataField}
            visible={column.visible}
          />
        ))}
      </DataGrid>

      <CustomColumnChooser
        container="#grid"
        button="#myColumnChooser"
        visible={visible}
        onHiding={onHiding}
        columns={columns}
        onApply={onApply}
      />
    </React.Fragment>
  );
}
