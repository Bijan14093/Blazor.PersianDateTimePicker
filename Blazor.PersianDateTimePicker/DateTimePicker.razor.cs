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
        private Guid id;

        protected override void OnInitialized()
        {
            id = Guid.NewGuid();
        }
        [Inject]
        IJSRuntime JS { get; set; }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender) {
                lock (this)
                {
                    JS.InvokeVoidAsync("initPersianCalender", id);
                }
                
            }
            await base.OnAfterRenderAsync(firstRender);
        }

    }
}
