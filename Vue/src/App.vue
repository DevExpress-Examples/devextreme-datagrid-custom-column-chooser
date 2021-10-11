<template>
  <div>
    <DxDataGrid
      :element-attr="dataGridAttributes"
      :data-source="dataSource"
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

<script>
import DxDataGrid, { DxColumn } from "devextreme-vue/data-grid";
import CustomColumnChooser from "./components/CustomColumnChooser.vue";
import { customers } from "./data.js";

export default {
  name: 'App',
  components: {
    DxDataGrid,
    DxColumn,
    CustomColumnChooser,
  },

  data() {
    return {
      dataSource: customers,
      columns: [
        {
          dataField: "CompanyName",
          visible: true,
        },
        {
          dataField: "City",
          visible: true,
        },
        {
          dataField: "State",
          visible: false,
        },
        {
          dataField: "Phone",
          visible: true,
        },
        {
          dataField: "Fax",
          visible: true,
        },
      ],
      visible: false,
      dataGridAttributes: {
          id: 'grid'
      }
    };
  },

  methods: {
    onToolbarPreparing(e) {
      e.toolbarOptions.items.push({
        widget: "dxButton",
        location: "after",
        options: {
          icon: "columnchooser",
          elementAttr: {
            id: "myColumnChooser",
          },
          onClick: () => {
            this.visible = true;
          },
        },
      });
    },
    onHiding() {
      this.visible = false;
    },
    onApply(changes) {
      changes.forEach((change) => {
        var column = this.columns.find(
          (column) => column.dataField === change.dataField
        );
        column.visible = change.visible;
      });
      this.visible = false;
    },
  }
}
</script>

<style>
</style>
