// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.
//http://babakhani.github.io/PersianWebToolkit/doc/datepicker/example/
import "js/jquery-3.6.0.min.js"
import "js/persian-date.js"
import "js/persian-datepicker.js"
export function ShowDatePicker(ControlID) {
    $(document).ready(function () {
        $("#" + ControlID).pDatepicker({
            format: 'YYYY/MM/DD HH:mm:ss',
            autoClose: true

        });
    }
        }
export function ShowTimePicker(ControlID) {
    $(document).ready(function () {
        $("#" + ControlID).pDatepicker({
            format: 'YYYY/MM/DD HH:mm:ss',
            timePicker: {
                enabled: true,
                meridiem: {
                    enabled: true
                }
            },
            autoClose: true

        });
    }
        }