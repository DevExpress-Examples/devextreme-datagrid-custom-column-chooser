# TreeList/DataGrid - How to implement a custom column chooser using a Popup with List

TreeList/DataGrid has a built-in column chooser which allows users to alter column visibility at runtime. However, it has limited options that can be used to configure it. In cases where further configuration is required, it is better to implement a custom column chooser than to use private API to modify the built-in one.

This example demonstrates how to implement a simple custom column chooser. For this, a [Popup](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/) with a [List](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxList/) widget is used. Any option from both widgets can be used to modify the custom column chooser in this case.

The custom column chooser in this sample has a *Select All* check box which can be used to select/deselect all columns at once. In addition, it is configured so that alterations in column visibility is applied on button click only. Furthermore, the current implementation only supports columns specified as an array of dataField but there should be no issue extending it.