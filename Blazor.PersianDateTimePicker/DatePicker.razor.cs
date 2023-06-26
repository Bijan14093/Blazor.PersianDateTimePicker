using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimePicker
{
    public partial class DatePicker:ComponentBase
    {
        [Inject]
        IJSRuntime JS { get; set; }
        //protected override Task OnAfterRenderAsync(bool firstRender)
        //{
        //    if (firstRender)
        //    {
        //        JS.InvokeVoidAsync("initPersianCalender");
        //    }
        //    return base.OnAfterRenderAsync(firstRender);
        //}
        protected override void OnAfterRender(bool firstRender)
        {
            JS.InvokeVoidAsync("initPersianCalender");
            base.OnAfterRender(firstRender);
        }
    }
}
