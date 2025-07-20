import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import React, { useCallback, useState, useReducer } from "react";

import DataGrid, { Column } from "devextreme-react/data-grid";
import { customers } from "./data.js";
import CustomColumnChooser from "./CustomColumnChooser";

const initialState = [
  {
    dataField: "CompanyName",
    visible: true
  },
  {
    dataField: "City",
    visible: true
  },
  {
    dataField: "State",
    visible: true
  },
  {
    dataField: "Phone",
    visible: true
  },
  {
    dataField: "Fax",
    visible: true
  }
];

function reducer(state, changes) {
  if (Object.keys(changes).length === 0) return state;

  var newState = [...state];
  changes.forEach((change) => {
    var column = newState.find((c) => c.dataField === change.dataField);
    Object.keys(change).forEach((key) => {
      column[key] = change[key];
    });
  });
  return newState;
}

export default function App() {
  const [columns, setColumnsState] = useReducer(reducer, initialState);

  const [visible, setVisible] = useState(false);

  const onToolbarPreparing = useCallback((e) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "columnchooser",
        elementAttr: {
          id: "myColumnChooser"
        },
        onClick: () => setVisible(true)
      }
    });
  }, [setVisible]);

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback((changes) => {
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
        {columns.map((column) => {
          return (
            <Column
              key={column.dataField}
              dataField={column.dataField}
              visible={column.visible}
            />
          );
        })}
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