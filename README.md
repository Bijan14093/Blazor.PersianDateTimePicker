# Blazor.PersianDateTimePicker

This project is developed on the Blazor .net 5.0 framework.


-----
# Setup

## 1. Create new project in blazor .net 5.0.
## 2. add nuget package: Blazor.PersianDateTimePicker.
## 3. add java script after blazor.server.js in _Host.cshtml.

    <script src="_content/Blazor.PersianDateTimePicker/Init.js"></script>

like 

    @page "/"
    @namespace Blazor.PersianDateTimeControl.UI.Pages
    @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
    @{
        Layout = null;
    }
    
    
    <html lang="fa">
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    
    <body>
        <component type="typeof(App)" render-mode="Server" />
        <script src="_framework/blazor.server.js"></script>
        <script src="_content/Blazor.PersianDateTimePicker/Init.js"></script>
    </body>
    </html>
## 4. use in project.

Sample:

    @page "/"
    
    <h2>With event: DateTimeChanged</h2>
    
    <Blazor.PersianDateTimePicker.DateTimePicker DateTimeChanged="ShowDate" InitialDate=DateTime.Now/>
    
    <input @bind="_Date" />
    
    <br />
    
    <h2>With binding: bind-Value</h2>
    
    <Blazor.PersianDateTimePicker.DateTimePicker @bind-Value="_DateBind"  />
    
    <input @bind="_DateBind" />
    
    @code
    {
    
        private DateTime? _DateBind = DateTime.Now.AddDays(-10);
    
        private string _Date;
        private void ShowDate(DateTime? dt)
        {
            _Date = dt.ToString();
    
        }
    }
    
# Note

Input and output are based on DateTime data type

DateTimeChange is an event that returns a date with the DateTime data type when the date changes.

InitialDate: It is a property  that determines the initial value.

Text: It is a property  that determines the persian value.

Value: It is a property  that determines the  DateTime value.

## License
[MIT](https://licenses.nuget.org/MIT)
