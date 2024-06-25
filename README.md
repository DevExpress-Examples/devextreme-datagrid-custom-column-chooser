<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/310565095/20.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T947741)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DataGrid for DevExtreme - How to implement a custom column chooser

This example demonstrates how to implement a custom column chooser for a DataGrid or TreeList. 

![Custom column chooser](/column-chooser.png)

The DataGrid and TreeList include a built-in column chooser that allows users to alter column visibility at runtime. If you need a more flexible solution, you can use the [Popup](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/) and [List](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxList/) components to implement a custom column chooser.

In this example, the custom column chooser includes a *Select All* checkbox that can be used to select/deselect all columns at once. All alterations in column visibility are applied when you click the button.

## Files to Review

- **jQuery**
    - [index.js](jQuery/index.js)    
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)  
- **Vue**
    - [App.vue](Vue/src/App.vue)
- **React**
    - [App.js](React/src/App.js)
- **ASP.NET**    
    - [Index.cshtml](ASP.NET/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with DataGrid](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/)
- [Getting Started with Popup](https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Getting_Started_with_Popup/)
- [Getting Started with List](https://js.devexpress.com/Documentation/Guide/UI_Components/List/Getting_Started_with_List/)

## More Examples

- [DataGrid - How to implement a custom editing form using Form and Popup](https://github.com/DevExpress-Examples/DataGrid-How-to-implement-a-custom-editing-form-using-dxForm-and-dxPopup)
- [DataGrid - Column Customization](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/ColumnCustomization)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-custom-column-chooser&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-custom-column-chooser&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
