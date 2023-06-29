using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimePicker
{
    public partial class DateTimePicker:ComponentBase
    {
        [Parameter] 
        public DateTime InitialDate { get; set; }
        private string? _Text;

        private string? Text
        {
            get { return _Text; }
            set { 
                if (_Text != value)
                {
                    _Text = value;
                    _DateTime = _Text.ToDateTime();
                    onChangeDate();
                }
                
            }
        }
        private DateTime? _DateTime;

        [Parameter]
        public DateTime? Value
        {
            get { return _DateTime; }
            set {
                if (_DateTime != value)
                {
                    _DateTime = value;
                    _Text = _DateTime.ToString().ToPersianDate();
                    onChangeDate();
                }
            }
        }

        private void onChangeDate()
        {
            if (ValueChanged.HasDelegate)
            {
                ValueChanged.InvokeAsync(_DateTime);
            }
            if (DateTimeChanged.HasDelegate)
            {
                DateTimeChanged.InvokeAsync(_DateTime);
            }

        }

        [Parameter] public EventCallback<DateTime?> ValueChanged { get; set; }
        [Parameter] public EventCallback<DateTime?> DateTimeChanged { get; set; }
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
                Text = InitialDate.ToString().ToPersianDate();
            }
            await base.OnAfterRenderAsync(firstRender);
        }

    }

  
}
