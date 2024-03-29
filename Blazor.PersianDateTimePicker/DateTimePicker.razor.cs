﻿using Microsoft.AspNetCore.Components;
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

        public string? Text
        {
            get { return _Text; }
            set { 
                if (_Text != value)
                {
                    try
                    {
                        _DateTime = value.ToDateTime();
                        _Text = value;
                        onChangeDate();
                    }
                    catch (Exception)
                    {
                       //nothing
                    }


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
                    _Text = _DateTime.ToString().ToPersianDate(true, "{0}/{1}/{2} {3}:{4}:{5}");
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
                if (InitialDate!=DateTime.MinValue)
                {
                    Text = InitialDate.ToString().ToPersianDate(true, "{0}/{1}/{2} {3}:{4}:{5}");
                }
                
            }
            await base.OnAfterRenderAsync(firstRender);
        }

    }

  
}
