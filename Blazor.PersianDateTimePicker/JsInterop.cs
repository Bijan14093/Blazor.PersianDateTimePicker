using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimePicker
{
    // This class provides an example of how JavaScript functionality can be wrapped
    // in a .NET class for easy consumption. The associated JavaScript module is
    // loaded on demand when first needed.
    //
    // This class can be registered as scoped DI service and then injected into Blazor
    // components for use.

    public class JsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        public JsInterop(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/Blazor.PersianDateTimePicker/JsInterop.js").AsTask());
        }

        public async ValueTask<string> ShowDatePicker(string ControlID)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<string>("ShowDatePicker", ControlID);
        }

        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}
