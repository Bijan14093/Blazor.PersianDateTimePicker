using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimeControl.UI.Shared
{
    public partial class MainLayout: LayoutComponentBase
    {
        [Inject]
        IJSRuntime JS { get; set; }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await JS.InvokeVoidAsync("initPersianCalender");
            await base.OnAfterRenderAsync(firstRender);
            }
    }
}
