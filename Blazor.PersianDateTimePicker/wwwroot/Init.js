//import "./js/jquery-3.6.0.min.js"
//import "./js/persian-date.js"
//import "./js/persian-datepicker.js"
//window.init = initPersianCalender;
function initPersianCalender() {
        persianDate.toLocale('en');
        //http://babakhani.github.io/PersianWebToolkit/doc/datepicker/playground.html
        //http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
        $(document).ready(function () {
            $(".PersainDatePicker").pDatepicker(

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