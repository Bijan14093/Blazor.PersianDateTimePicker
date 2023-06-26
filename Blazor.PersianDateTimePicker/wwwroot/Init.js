
dynamicallyLoadCSS('_content/Blazor.PersianDateTimePicker/css/persian-datepicker.css')
dynamicallyLoadScript('_content/Blazor.PersianDateTimePicker/js/jquery-3.6.0.min.js');
dynamicallyLoadScript('_content/Blazor.PersianDateTimePicker/js/persian-date.js');
dynamicallyLoadScript('_content/Blazor.PersianDateTimePicker/js/persian-datepicker.js');

function initPersianCalender() {

        persianDate.toLocale('en');
        //http://babakhani.github.io/PersianWebToolkit/doc/datepicker/playground.html
        //http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
        $(document).ready(function () {
            $(".PersianDateTimePicker").pDatepicker(

                {
                    "inline": false,
                    "format": "YYYY/MM/DD HH:MM:DD a",
                    "viewMode": "day",
                    "initialValue": true,
                    "minDate": null,
                    "maxDate": null,
                    "autoClose": true,
                    "position": "auto",
                    "altFormat": "YYYY/MM/DD HH:MM:DD a",
                    "altField": "#altfieldExample",
                    "onlyTimePicker": false,
                    "onlySelectOnDate": false,
                    "calendarType": "persian",
                    "inputDelay": "600",
                    "observer": true,
                    "calendar": {
                        "persian": {
                            "locale": "fa",
                            "showHint": true,
                            "leapYearMode": "algorithmic"
                        },
                        "gregorian": {
                            "locale": "en",
                            "showHint": false
                        }
                    },
                    "navigator": {
                        "enabled": true,
                        "scroll": {
                            "enabled": true
                        },
                        "text": {
                            "btnNextText": "<",
                            "btnPrevText": ">"
                        }
                    },
                    "toolbox": {
                        "enabled": true,
                        "calendarSwitch": {
                            "enabled": true,
                            "format": "MMMM"
                        },
                        "todayButton": {
                            "enabled": true,
                            "text": {
                                "fa": "امروز",
                                "en": "Today"
                            }
                        },
                        "submitButton": {
                            "enabled": true,
                            "text": {
                                "fa": "تایید",
                                "en": "Submit"
                            }
                        },
                        "text": {
                            "btnToday": "امروز"
                        }
                    },
                    "timePicker": {
                        "enabled": true,
                        "step": 1,
                        "hour": {
                            "enabled": true,
                            "step": null
                        },
                        "minute": {
                            "enabled": true,
                            "step": null
                        },
                        "second": {
                            "enabled": true,
                            "step": null
                        },
                        "meridian": {
                            "enabled": true
                        }
                    },
                    "dayPicker": {
                        "enabled": true,
                        "titleFormat": "YYYY MMMM"
                    },
                    "monthPicker": {
                        "enabled": true,
                        "titleFormat": "YYYY"
                    },
                    "yearPicker": {
                        "enabled": true,
                        "titleFormat": "YYYY"
                    },
                    "responsive": true,
                    onSelect: function (unix) {
                        console.log('datepicker select : ' + unix);
                    },
                    formatter: function (unixDate) {
                        var self = this;
                        var pdate = new persianDate(unixDate);
                        pdate.toLocale('en');
                        return pdate.format('L HH:MM:DD a');
                    }
                }

            );
        });
}
function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
function dynamicallyLoadCSS(url) {
    var link = document.createElement("link");  
    link.rel = "stylesheet";
    link.href = url; 
    document.head.appendChild(link);  
}



