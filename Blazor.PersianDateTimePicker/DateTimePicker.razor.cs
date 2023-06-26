using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimePicker
{
    public partial class DateTimePicker:ComponentBase
    {
        [Inject]
        IJSRuntime JS { get; set; }
        protected override void OnAfterRender(bool firstRender)
        {
            JS.InvokeVoidAsync("initPersianCalender");
            base.OnAfterRender(firstRender);
        }
    }
}
