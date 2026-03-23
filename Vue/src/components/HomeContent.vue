<script setup lang="ts">
import 'devextreme/dist/css/dx.light.compact.css';

import { ref } from 'vue';

import DxDataGrid, { DxColumn } from 'devextreme-vue/data-grid';
import CustomColumnChooser from './CustomColumnChooser.vue';

import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import type { Column } from '../data';

import { customers, initialState } from '../data';

const visible = ref(false);
const dataGridAttributes = {
  id: 'grid'
};

const columns = ref<Column[]>(initialState);

function onToolbarPreparing(e: DxDataGridTypes.ToolbarPreparingEvent): void {
  e.toolbarOptions.items?.push({
    widget: 'dxButton',
    location: 'after',
    options: {
      icon: 'columnchooser',
      elementAttr: {
        id: 'myColumnChooser',
      },
      onClick: () => {
        visible.value = true;
      },
    },
  });
}
const onHiding = () => {
  visible.value = false;
};
const onApply = (changedColumns: Column[]) => {
  changedColumns.forEach((changedColumn) => {
    const column = columns.value.find(
      (column: Column) => column.dataField === changedColumn.dataField
    );
    if(column) {
      column.visible = changedColumn.visible;
    }
  });
  visible.value = false;
};

</script>
<template>
  <div>
    <DxDataGrid
      :element-attr="dataGridAttributes"
      :data-source="customers"
      key-expr="ID"
      :columns="columns"
      :show-borders="true"
      @toolbar-preparing="onToolbarPreparing"
    >
      <DxColumn
        v-for="column in columns"
        :key="column.dataField"
        :data-field="column.dataField"
        :visible="column.visible"
      />
    </DxDataGrid>

    <CustomColumnChooser
      container="#grid"
      button="#myColumnChooser"
      :visible="visible"
      @hiding="onHiding"
      :columns="columns"
      @apply="onApply"
    />
  </div>
</template>
