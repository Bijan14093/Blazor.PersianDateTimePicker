
dynamicallyLoadCSS('_content/Blazor.PersianDateTimePicker/css/persian-datepicker.css')
//dynamicallyLoadScript('_content/Blazor.PersianDateTimePicker/js/persian-date.js');
//dynamicallyLoadScript('_content/Blazor.PersianDateTimePicker/js/persian-datepicker.js');

function initPersianCalender(ElementID) {
    //http://babakhani.github.io/PersianWebToolkit/doc/datepicker/playground.html
    //http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
    //persian calender setup
    persianDate.toLocale('en');
    let setting = {
        "inline": false,
        "format": "YYYY/MM/DD HH:mm:ss",
        "viewMode": "day",
        "initialValue": false,
        "minDate": null,
        "maxDate": null,
        "autoClose": true,
        "position": "auto",
        "altFormat": "YYYY/MM/DD HH:mm:ss",
        "altField": "#altfieldExample",
        "onlyTimePicker": false,
        "onlySelectOnDate": true,
        "calendarType": "persian",
        "inputDelay": 800,
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
        "responsive": true
        ,
        onSelect: function (unix) {
            console.log('datepicker select : ' + unix);
        }
        ,
        formatter: function (unixDate) {
            var self = this;
            var pdate = new persianDate(unixDate);
            pdate.toLocale('en');
            return pdate.format('YYYY/MM/DD HH:mm:ss');
        }
    }

    $("#" + ElementID).pDatepicker(
        setting
    );
    $("#" + ElementID).keydown(function (e) {
        HandleKeydown($(this), e);
    });
    $("#" + ElementID).keyup(function (e) {
        HandleKeyup($(this), e);
    });
    $("#" + ElementID).mask('0000/00/00 00:00:00');

}

////tooltip enable
//$(function () {
//    $('[data-toggle="tooltip"]').tooltip({ html: true })
//})

function HandleKeydown(element, e) {
    console.log("HandleKeydown");
    console.log(e);
    console.log(element);
    element.data('datepicker').hide();
    if (e.ctrlKey) {
        //46:Del
        if (e.keyCode == 46) {
            element.val('');
        }
        //32:Space
        else if (e.keyCode == 32) {
            var pd = new persianDate();
            element.data('datepicker').setDate(pd);
        }
        //36:Home
        else if (e.keyCode == 36) {
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var oDate = element.val().split(' ')[0];
            if (oDate == "") {
                var currentDate = new persianDate();
                Year = currentDate.year();
                Month = currentDate.month();
                Day = currentDate.date();
            }
            else {
                Year = parseInt(oDate.split('/')[0]);
                Month = parseInt(oDate.split('/')[1]);
                Day = parseInt(oDate.split('/')[2]);
            }
            var pd = new persianDate([Year, Month, Day, 0, 0, 0]);
            element.data('datepicker').setDate(pd);
        }
        //35:End
        else if (e.keyCode == 35) {

            var Year = 0;
            var Month = 0;
            var Day = 0;
            var oDate = element.val().split(' ')[0];
            if (oDate == "") {
                var currentDate = new persianDate();
                Year = currentDate.year();
                Month = currentDate.month();
                Day = currentDate.date();
            }
            else {
                Year = parseInt(oDate.split('/')[0]);
                Month = parseInt(oDate.split('/')[1]);
                Day = parseInt(oDate.split('/')[2]);
            }
            var pd = new persianDate([Year, Month, Day, 23, 59, 59]);
            element.data('datepicker').setDate(pd);

        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
function HandleKeyup(element, e) {

    console.log("HandleKeyup");
    console.log(e);
    if (element.val().length == 19) {
        var oDate = element.val().split(' ')[0];
        var oTime = element.val().split(' ')[1];

        var oYear = oDate.split('/')[0];
        var oMonth = oDate.split('/')[1];
        var oDay = oDate.split('/')[2];
        var oHour = oTime.split(':')[0];
        var oMinute = oTime.split(':')[1];
        var oSecond = oTime.split(':')[2];
        var pd = new persianDate([parseInt(oYear), parseInt(oMonth), parseInt(oDay), parseInt(oHour), parseInt(oMinute), parseInt(oSecond)]);
        if (isNaN(pd.valueOf()) == false) {
            element.data('datepicker').setDate(pd);
        }

    }
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



/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return t(e) } : t(e) }("undefined" != typeof window ? window : this, function (C, e) { "use strict"; var t = [], r = Object.getPrototypeOf, s = t.slice, g = t.flat ? function (e) { return t.flat.call(e) } : function (e) { return t.concat.apply([], e) }, u = t.push, i = t.indexOf, n = {}, o = n.toString, v = n.hasOwnProperty, a = v.toString, l = a.call(Object), y = {}, m = function (e) { return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item }, x = function (e) { return null != e && e === e.window }, E = C.document, c = { type: !0, src: !0, nonce: !0, noModule: !0 }; function b(e, t, n) { var r, i, o = (n = n || E).createElement("script"); if (o.text = e, t) for (r in c) (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i); n.head.appendChild(o).parentNode.removeChild(o) } function w(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e } var f = "3.6.0", S = function (e, t) { return new S.fn.init(e, t) }; function p(e) { var t = !!e && "length" in e && e.length, n = w(e); return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e) } S.fn = S.prototype = { jquery: f, constructor: S, length: 0, toArray: function () { return s.call(this) }, get: function (e) { return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e] }, pushStack: function (e) { var t = S.merge(this.constructor(), e); return t.prevObject = this, t }, each: function (e) { return S.each(this, e) }, map: function (n) { return this.pushStack(S.map(this, function (e, t) { return n.call(e, t, e) })) }, slice: function () { return this.pushStack(s.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, even: function () { return this.pushStack(S.grep(this, function (e, t) { return (t + 1) % 2 })) }, odd: function () { return this.pushStack(S.grep(this, function (e, t) { return t % 2 })) }, eq: function (e) { var t = this.length, n = +e + (e < 0 ? t : 0); return this.pushStack(0 <= n && n < t ? [this[n]] : []) }, end: function () { return this.prevObject || this.constructor() }, push: u, sort: t.sort, splice: t.splice }, S.extend = S.fn.extend = function () { var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1; for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)if (null != (e = arguments[s])) for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r)); return a }, S.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) { throw new Error(e) }, noop: function () { }, isPlainObject: function (e) { var t, n; return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, globalEval: function (e, t, n) { b(e, { nonce: t && t.nonce }, n) }, each: function (e, t) { var n, r = 0; if (p(e)) { for (n = e.length; r < n; r++)if (!1 === t.call(e[r], r, e[r])) break } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break; return e }, makeArray: function (e, t) { var n = t || []; return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n }, inArray: function (e, t, n) { return null == t ? -1 : i.call(t, e, n) }, merge: function (e, t) { for (var n = +t.length, r = 0, i = e.length; r < n; r++)e[i++] = t[r]; return e.length = i, e }, grep: function (e, t, n) { for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)!t(e[i], i) !== a && r.push(e[i]); return r }, map: function (e, t, n) { var r, i, o = 0, a = []; if (p(e)) for (r = e.length; o < r; o++)null != (i = t(e[o], o, n)) && a.push(i); else for (o in e) null != (i = t(e[o], o, n)) && a.push(i); return g(a) }, guid: 1, support: y }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) { n["[object " + t + "]"] = t.toLowerCase() }); var d = function (n) { var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date, p = n.document, k = 0, r = 0, m = ue(), x = ue(), A = ue(), N = ue(), j = function (e, t) { return e === t && (l = !0), 0 }, D = {}.hasOwnProperty, t = [], q = t.pop, L = t.push, H = t.push, O = t.slice, P = function (e, t) { for (var n = 0, r = e.length; n < r; n++)if (e[n] === t) return n; return -1 }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(M + "+", "g"), $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), _ = new RegExp("^" + M + "*," + M + "*"), z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp(M + "|>"), X = new RegExp(F), V = new RegExp("^" + I + "$"), G = { ID: new RegExp("^#(" + I + ")"), CLASS: new RegExp("^\\.(" + I + ")"), TAG: new RegExp("^(" + I + "|[*])"), ATTR: new RegExp("^" + W), PSEUDO: new RegExp("^" + F), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + R + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"), ne = function (e, t) { var n = "0x" + e.slice(1) - 65536; return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)) }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function (e, t) { return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e }, oe = function () { T() }, ae = be(function (e) { return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase() }, { dir: "parentNode", next: "legend" }); try { H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType } catch (e) { H = { apply: t.length ? function (e, t) { L.apply(e, O.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function se(t, e, n, r) { var i, o, a, s, u, l, c, f = e && e.ownerDocument, p = e ? e.nodeType : 9; if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n; if (!r && (T(e), e = e || C, E)) { if (11 !== p && (u = Z.exec(t))) if (i = u[1]) { if (9 === p) { if (!(a = e.getElementById(i))) return n; if (a.id === i) return n.push(a), n } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n } else { if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n; if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n } if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) { if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) { (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length; while (o--) l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]); c = l.join(",") } try { return H.apply(n, f.querySelectorAll(c)), n } catch (e) { N(t, !0) } finally { s === S && e.removeAttribute("id") } } } return g(t.replace($, "$1"), e, n, r) } function ue() { var r = []; return function e(t, n) { return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n } } function le(e) { return e[S] = !0, e } function ce(e) { var t = C.createElement("fieldset"); try { return !!e(t) } catch (e) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function fe(e, t) { var n = e.split("|"), r = n.length; while (r--) b.attrHandle[n[r]] = t } function pe(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex; if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function de(t) { return function (e) { return "input" === e.nodeName.toLowerCase() && e.type === t } } function he(n) { return function (e) { var t = e.nodeName.toLowerCase(); return ("input" === t || "button" === t) && e.type === n } } function ge(t) { return function (e) { return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t } } function ve(a) { return le(function (o) { return o = +o, le(function (e, t) { var n, r = a([], e.length, o), i = r.length; while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n])) }) }) } function ye(e) { return e && "undefined" != typeof e.getElementsByTagName && e } for (e in d = se.support = {}, i = se.isXML = function (e) { var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement; return !Y.test(t || n && n.nodeName || "HTML") }, T = se.setDocument = function (e) { var t, n, r = e ? e.ownerDocument || e : p; return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function (e) { return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length }), d.attributes = ce(function (e) { return e.className = "i", !e.getAttribute("className") }), d.getElementsByTagName = ce(function (e) { return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) { return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length }), d.getById ? (b.filter.ID = function (e) { var t = e.replace(te, ne); return function (e) { return e.getAttribute("id") === t } }, b.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && E) { var n = t.getElementById(e); return n ? [n] : [] } }) : (b.filter.ID = function (e) { var n = e.replace(te, ne); return function (e) { var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id"); return t && t.value === n } }, b.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && E) { var n, r, i, o = t.getElementById(e); if (o) { if ((n = o.getAttributeNode("id")) && n.value === e) return [o]; i = t.getElementsByName(e), r = 0; while (o = i[r++]) if ((n = o.getAttributeNode("id")) && n.value === e) return [o] } return [] } }), b.find.TAG = d.getElementsByTagName ? function (e, t) { return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0 } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, b.find.CLASS = d.getElementsByClassName && function (e, t) { if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e) }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) { var t; a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]") }), ce(function (e) { e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"; var t = C.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:") })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) { d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F) }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, j = t ? function (e, t) { if (e === t) return l = !0, 0; var n = !e.compareDocumentPosition - !t.compareDocumentPosition; return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1) } : function (e, t) { if (e === t) return l = !0, 0; var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t]; if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0; if (i === o) return pe(e, t); n = e; while (n = n.parentNode) a.unshift(n); n = t; while (n = n.parentNode) s.unshift(n); while (a[r] === s[r]) r++; return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0 }), C }, se.matches = function (e, t) { return se(e, null, null, t) }, se.matchesSelector = function (e, t) { if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try { var n = c.call(e, t); if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (e) { N(t, !0) } return 0 < se(t, C, null, [e]).length }, se.contains = function (e, t) { return (e.ownerDocument || e) != C && T(e), y(e, t) }, se.attr = function (e, t) { (e.ownerDocument || e) != C && T(e); var n = b.attrHandle[t.toLowerCase()], r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0; return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }, se.escape = function (e) { return (e + "").replace(re, ie) }, se.error = function (e) { throw new Error("Syntax error, unrecognized expression: " + e) }, se.uniqueSort = function (e) { var t, n = [], r = 0, i = 0; if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(j), l) { while (t = e[i++]) t === e[i] && (r = n.push(i)); while (r--) e.splice(n[r], 1) } return u = null, e }, o = se.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling)n += o(e) } else if (3 === i || 4 === i) return e.nodeValue } else while (t = e[r++]) n += o(t); return n }, (b = se.selectors = { cacheLength: 50, createPseudo: le, match: G, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e }, PSEUDO: function (e) { var t, n = !e[6] && e[2]; return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(te, ne).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = m[e + " "]; return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function (e) { return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "") }) }, ATTR: function (n, r, i) { return function (e) { var t = se.attr(e, n); return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-")) } }, CHILD: function (h, e, t, g, v) { var y = "nth" !== h.slice(0, 3), m = "last" !== h.slice(-4), x = "of-type" === e; return 1 === g && 0 === v ? function (e) { return !!e.parentNode } : function (e, t, n) { var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling", c = e.parentNode, f = x && e.nodeName.toLowerCase(), p = !n && !x, d = !1; if (c) { if (y) { while (l) { a = e; while (a = a[l]) if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1; u = l = "only" === h && !u && "nextSibling" } return !0 } if (u = [m ? c.firstChild : c.lastChild], m && p) { d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s]; while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) if (1 === a.nodeType && ++d && a === e) { i[h] = [k, s, d]; break } } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break; return (d -= v) === g || d % g == 0 && 0 <= d / g } } }, PSEUDO: function (e, o) { var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e); return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) { var n, r = a(e, o), i = r.length; while (i--) e[n = P(e, r[i])] = !(t[n] = r[i]) }) : function (e) { return a(e, 0, t) }) : a } }, pseudos: { not: le(function (e) { var r = [], i = [], s = f(e.replace($, "$1")); return s[S] ? le(function (e, t, n, r) { var i, o = s(e, null, r, []), a = e.length; while (a--) (i = o[a]) && (e[a] = !(t[a] = i)) }) : function (e, t, n) { return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop() } }), has: le(function (t) { return function (e) { return 0 < se(t, e).length } }), contains: le(function (t) { return t = t.replace(te, ne), function (e) { return -1 < (e.textContent || o(e)).indexOf(t) } }), lang: le(function (n) { return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) { var t; do { if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-") } while ((e = e.parentNode) && 1 === e.nodeType); return !1 } }), target: function (e) { var t = n.location && n.location.hash; return t && t.slice(1) === e.id }, root: function (e) { return e === a }, focus: function (e) { return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: ge(!1), disabled: ge(!0), checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6) return !1; return !0 }, parent: function (e) { return !b.pseudos.empty(e) }, header: function (e) { return J.test(e.nodeName) }, input: function (e) { return Q.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase()) }, first: ve(function () { return [0] }), last: ve(function (e, t) { return [t - 1] }), eq: ve(function (e, t, n) { return [n < 0 ? n + t : n] }), even: ve(function (e, t) { for (var n = 0; n < t; n += 2)e.push(n); return e }), odd: ve(function (e, t) { for (var n = 1; n < t; n += 2)e.push(n); return e }), lt: ve(function (e, t, n) { for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;)e.push(r); return e }), gt: ve(function (e, t, n) { for (var r = n < 0 ? n + t : n; ++r < t;)e.push(r); return e }) } }).pseudos.nth = b.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) b.pseudos[e] = de(e); for (e in { submit: !0, reset: !0 }) b.pseudos[e] = he(e); function me() { } function xe(e) { for (var t = 0, n = e.length, r = ""; t < n; t++)r += e[t].value; return r } function be(s, e, t) { var u = e.dir, l = e.next, c = l || u, f = t && "parentNode" === c, p = r++; return e.first ? function (e, t, n) { while (e = e[u]) if (1 === e.nodeType || f) return s(e, t, n); return !1 } : function (e, t, n) { var r, i, o, a = [k, p]; if (n) { while (e = e[u]) if ((1 === e.nodeType || f) && s(e, t, n)) return !0 } else while (e = e[u]) if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e; else { if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2]; if ((i[c] = a)[2] = s(e, t, n)) return !0 } return !1 } } function we(i) { return 1 < i.length ? function (e, t, n) { var r = i.length; while (r--) if (!i[r](e, t, n)) return !1; return !0 } : i[0] } function Te(e, t, n, r, i) { for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s))); return a } function Ce(d, h, g, v, y, e) { return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function (e, t, n, r) { var i, o, a, s = [], u = [], l = t.length, c = e || function (e, t, n) { for (var r = 0, i = t.length; r < i; r++)se(e, t[r], n); return n }(h || "*", n.nodeType ? [n] : n, []), f = !d || !e && h ? c : Te(c, s, d, n, r), p = g ? y || (e ? d : l || v) ? [] : t : f; if (g && g(f, p, n, r), v) { i = Te(p, u), v(i, [], n, r), o = i.length; while (o--) (a = i[o]) && (p[u[o]] = !(f[u[o]] = a)) } if (e) { if (y || d) { if (y) { i = [], o = p.length; while (o--) (a = p[o]) && i.push(f[o] = a); y(null, p = [], i, r) } o = p.length; while (o--) (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a)) } } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p) }) } function Ee(e) { for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) { return e === i }, a, !0), l = be(function (e) { return -1 < P(i, e) }, a, !0), c = [function (e, t, n) { var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n)); return i = null, r }]; s < r; s++)if (t = b.relative[e[s].type]) c = [be(we(c), t)]; else { if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) { for (n = ++s; n < r; n++)if (b.relative[e[n].type]) break; return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e)) } c.push(t) } return we(c) } return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = se.tokenize = function (e, t) { var n, r, i, o, a, s, u, l = x[e + " "]; if (l) return t ? 0 : l.slice(0); a = e, s = [], u = b.preFilter; while (a) { for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({ value: n, type: r[0].replace($, " ") }), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({ value: n, type: o, matches: r }), a = a.slice(n.length)); if (!n) break } return t ? a.length : a ? se.error(e) : x(e, s).slice(0) }, f = se.compile = function (e, t) { var n, v, y, m, x, r, i = [], o = [], a = A[e + " "]; if (!a) { t || (t = h(e)), n = t.length; while (n--) (a = Ee(t[n]))[S] ? i.push(a) : o.push(a); (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function (e, t, n, r, i) { var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = k += null == p ? 1 : Math.random() || .1, g = d.length; for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) { if (x && o) { a = 0, t || o.ownerDocument == C || (T(o), n = !E); while (s = v[a++]) if (s(o, t || C, n)) { r.push(o); break } i && (k = h) } m && ((o = !s && o) && u--, e && c.push(o)) } if (u += l, m && l !== u) { a = 0; while (s = y[a++]) s(c, f, t, n); if (e) { if (0 < u) while (l--) c[l] || f[l] || (f[l] = q.call(r)); f = Te(f) } H.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r) } return i && (k = h, w = p), c }, m ? le(r) : r))).selector = e } return a }, g = se.select = function (e, t, n, r) { var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e); if (n = n || [], 1 === c.length) { if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) { if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n; l && (t = t.parentNode), e = e.slice(o.shift().value.length) } i = G.needsContext.test(e) ? 0 : o.length; while (i--) { if (a = o[i], b.relative[s = a.type]) break; if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) { if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n; break } } } return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n }, d.sortStable = S.split("").sort(j).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) { return 1 & e.compareDocumentPosition(C.createElement("fieldset")) }), ce(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || fe("type|href|height|width", function (e, t, n) { if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2) }), d.attributes && ce(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || fe("value", function (e, t, n) { if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue }), ce(function (e) { return null == e.getAttribute("disabled") }) || fe(R, function (e, t, n) { var r; if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }), se }(C); S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape; var h = function (e, t, n) { var r = [], i = void 0 !== n; while ((e = e[t]) && 9 !== e.nodeType) if (1 === e.nodeType) { if (i && S(e).is(n)) break; r.push(e) } return r }, T = function (e, t) { for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e); return n }, k = S.expr.match.needsContext; function A(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() } var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; function j(e, n, r) { return m(n) ? S.grep(e, function (e, t) { return !!n.call(e, t, e) !== r }) : n.nodeType ? S.grep(e, function (e) { return e === n !== r }) : "string" != typeof n ? S.grep(e, function (e) { return -1 < i.call(n, e) !== r }) : S.filter(n, e, r) } S.filter = function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function (e) { return 1 === e.nodeType })) }, S.fn.extend({ find: function (e) { var t, n, r = this.length, i = this; if ("string" != typeof e) return this.pushStack(S(e).filter(function () { for (t = 0; t < r; t++)if (S.contains(i[t], this)) return !0 })); for (n = this.pushStack([]), t = 0; t < r; t++)S.find(e, i[t], n); return 1 < r ? S.uniqueSort(n) : n }, filter: function (e) { return this.pushStack(j(this, e || [], !1)) }, not: function (e) { return this.pushStack(j(this, e || [], !0)) }, is: function (e) { return !!j(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length } }); var D, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/; (S.fn.init = function (e, t, n) { var r, i; if (!e) return this; if (n = n || D, "string" == typeof e) { if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e); if (r[1]) { if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t)) for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]); return this } return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this } return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this) }).prototype = S.fn, D = S(E); var L = /^(?:parents|prev(?:Until|All))/, H = { children: !0, contents: !0, next: !0, prev: !0 }; function O(e, t) { while ((e = e[t]) && 1 !== e.nodeType); return e } S.fn.extend({ has: function (e) { var t = S(e, this), n = t.length; return this.filter(function () { for (var e = 0; e < n; e++)if (S.contains(this, t[e])) return !0 }) }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = "string" != typeof e && S(e); if (!k.test(e)) for (; r < i; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) { o.push(n); break } return this.pushStack(1 < o.length ? S.uniqueSort(o) : o) }, index: function (e) { return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t)))) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }), S.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return h(e, "parentNode") }, parentsUntil: function (e, t, n) { return h(e, "parentNode", n) }, next: function (e) { return O(e, "nextSibling") }, prev: function (e) { return O(e, "previousSibling") }, nextAll: function (e) { return h(e, "nextSibling") }, prevAll: function (e) { return h(e, "previousSibling") }, nextUntil: function (e, t, n) { return h(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return h(e, "previousSibling", n) }, siblings: function (e) { return T((e.parentNode || {}).firstChild, e) }, children: function (e) { return T(e.firstChild) }, contents: function (e) { return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes)) } }, function (r, i) { S.fn[r] = function (e, t) { var n = S.map(this, i, e); return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n) } }); var P = /[^\x20\t\r\n\f]+/g; function R(e) { return e } function M(e) { throw e } function I(e, t, n, r) { var i; try { e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r)) } catch (e) { n.apply(void 0, [e]) } } S.Callbacks = function (r) { var e, n; r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function (e, t) { n[t] = !0 }), n) : S.extend({}, r); var i, t, o, a, s = [], u = [], l = -1, c = function () { for (a = a || r.once, o = i = !0; u.length; l = -1) { t = u.shift(); while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1) } r.memory || (t = !1), i = !1, a && (s = t ? [] : "") }, f = { add: function () { return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) { S.each(e, function (e, t) { m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t) }) }(arguments), t && !i && c()), this }, remove: function () { return S.each(arguments, function (e, t) { var n; while (-1 < (n = S.inArray(t, s, n))) s.splice(n, 1), n <= l && l-- }), this }, has: function (e) { return e ? -1 < S.inArray(e, s) : 0 < s.length }, empty: function () { return s && (s = []), this }, disable: function () { return a = u = [], s = t = "", this }, disabled: function () { return !s }, lock: function () { return a = u = [], t || i || (s = t = ""), this }, locked: function () { return !!a }, fireWith: function (e, t) { return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this }, fire: function () { return f.fireWith(this, arguments), this }, fired: function () { return !!o } }; return f }, S.extend({ Deferred: function (e) { var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]], i = "pending", a = { state: function () { return i }, always: function () { return s.done(arguments).fail(arguments), this }, "catch": function (e) { return a.then(null, e) }, pipe: function () { var i = arguments; return S.Deferred(function (r) { S.each(o, function (e, t) { var n = m(i[t[4]]) && i[t[4]]; s[t[1]](function () { var e = n && n.apply(this, arguments); e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments) }) }), i = null }).promise() }, then: function (t, n, r) { var u = 0; function l(i, o, a, s) { return function () { var n = this, r = arguments, e = function () { var e, t; if (!(i < u)) { if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution"); t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r)) } }, t = s ? e : function () { try { e() } catch (e) { S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r)) } }; i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t)) } } return S.Deferred(function (e) { o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M)) }).promise() }, promise: function (e) { return null != e ? S.extend(e, a) : a } }, s = {}; return S.each(o, function (e, t) { var n = t[2], r = t[5]; a[t[1]] = n.add, r && n.add(function () { i = r }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () { return s[t[0] + "With"](this === s ? void 0 : this, arguments), this }, s[t[0] + "With"] = n.fireWith }), a.promise(s), e && e.call(s, s), s }, when: function (e) { var n = arguments.length, t = n, r = Array(t), i = s.call(arguments), o = S.Deferred(), a = function (t) { return function (e) { r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i) } }; if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then(); while (t--) I(i[t], a(t), o.reject); return o.promise() } }); var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/; S.Deferred.exceptionHook = function (e, t) { C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t) }, S.readyException = function (e) { C.setTimeout(function () { throw e }) }; var F = S.Deferred(); function B() { E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready() } S.fn.ready = function (e) { return F.then(e)["catch"](function (e) { S.readyException(e) }), this }, S.extend({ isReady: !1, readyWait: 1, ready: function (e) { (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S]) } }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B)); var $ = function (e, t, n, r, i, o, a) { var s = 0, u = e.length, l = null == n; if ("object" === w(n)) for (s in i = !0, n) $(e, t, s, n[s], !0, o, a); else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) { return l.call(S(e), n) })), t)) for (; s < u; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n))); return i ? e : l ? t.call(e) : u ? t(e[0], n) : o }, _ = /^-ms-/, z = /-([a-z])/g; function U(e, t) { return t.toUpperCase() } function X(e) { return e.replace(_, "ms-").replace(z, U) } var V = function (e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }; function G() { this.expando = S.expando + G.uid++ } G.uid = 1, G.prototype = { cache: function (e) { var t = e[this.expando]; return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t }, set: function (e, t, n) { var r, i = this.cache(e); if ("string" == typeof t) i[X(t)] = n; else for (r in t) i[X(r)] = t[r]; return i }, get: function (e, t) { return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)] }, access: function (e, t, n) { return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t) }, remove: function (e, t) { var n, r = e[this.expando]; if (void 0 !== r) { if (void 0 !== t) { n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length; while (n--) delete r[t[n]] } (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]) } }, hasData: function (e) { var t = e[this.expando]; return void 0 !== t && !S.isEmptyObject(t) } }; var Y = new G, Q = new G, J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, K = /[A-Z]/g; function Z(e, t, n) { var r, i; if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) { try { n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i) } catch (e) { } Q.set(e, t, n) } else n = void 0; return n } S.extend({ hasData: function (e) { return Q.hasData(e) || Y.hasData(e) }, data: function (e, t, n) { return Q.access(e, t, n) }, removeData: function (e, t) { Q.remove(e, t) }, _data: function (e, t, n) { return Y.access(e, t, n) }, _removeData: function (e, t) { Y.remove(e, t) } }), S.fn.extend({ data: function (n, e) { var t, r, i, o = this[0], a = o && o.attributes; if (void 0 === n) { if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) { t = a.length; while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r])); Y.set(o, "hasDataAttrs", !0) } return i } return "object" == typeof n ? this.each(function () { Q.set(this, n) }) : $(this, function (e) { var t; if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0; this.each(function () { Q.set(this, n, e) }) }, null, e, 1 < arguments.length, null, !0) }, removeData: function (e) { return this.each(function () { Q.remove(this, e) }) } }), S.extend({ queue: function (e, t, n) { var r; if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || [] }, dequeue: function (e, t) { t = t || "fx"; var n = S.queue(e, t), r = n.length, i = n.shift(), o = S._queueHooks(e, t); "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () { S.dequeue(e, t) }, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return Y.get(e, n) || Y.access(e, n, { empty: S.Callbacks("once memory").add(function () { Y.remove(e, [t + "queue", n]) }) }) } }), S.fn.extend({ queue: function (t, n) { var e = 2; return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function () { var e = S.queue(this, t, n); S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t) }) }, dequeue: function (e) { return this.each(function () { S.dequeue(this, e) }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, t) { var n, r = 1, i = S.Deferred(), o = this, a = this.length, s = function () { --r || i.resolveWith(o, [o]) }; "string" != typeof e && (t = e, e = void 0), e = e || "fx"; while (a--) (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s)); return s(), i.promise(t) } }); var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"), ne = ["Top", "Right", "Bottom", "Left"], re = E.documentElement, ie = function (e) { return S.contains(e.ownerDocument, e) }, oe = { composed: !0 }; re.getRootNode && (ie = function (e) { return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument }); var ae = function (e, t) { return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display") }; function se(e, t, n, r) { var i, o, a = 20, s = r ? function () { return r.cur() } : function () { return S.css(e, t, "") }, u = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t)); if (c && c[3] !== l) { u /= 2, l = l || c[3], c = +u || 1; while (a--) S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o; c *= 2, S.style(e, t, c + l), n = n || [] } return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i } var ue = {}; function le(e, t) { for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n))); for (c = 0; c < f; c++)null != l[c] && (e[c].style.display = l[c]); return e } S.fn.extend({ show: function () { return le(this, !0) }, hide: function () { return le(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { ae(this) ? S(this).show() : S(this).hide() }) } }); var ce, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i; ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild; var ge = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] }; function ve(e, t) { var n; return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n } function ye(e, t) { for (var n = 0, r = e.length; n < r; n++)Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval")) } ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]); var me = /<|&#?\w+;/; function xe(e, t, n, r, i) { for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o); else if (me.test(o)) { a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0]; while (c--) a = a.lastChild; S.merge(p, a.childNodes), (a = f.firstChild).textContent = "" } else p.push(t.createTextNode(o)); f.textContent = "", d = 0; while (o = p[d++]) if (r && -1 < S.inArray(o, r)) i && i.push(o); else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) { c = 0; while (o = a[c++]) he.test(o.type || "") && n.push(o) } return f } var be = /^([^.]*)(?:\.(.+)|)/; function we() { return !0 } function Te() { return !1 } function Ce(e, t) { return e === function () { try { return E.activeElement } catch (e) { } }() == ("focus" === t) } function Ee(e, t, n, r, i, o) { var a, s; if ("object" == typeof t) { for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ee(e, s, n, r, t[s], o); return e } if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te; else if (!i) return e; return 1 === o && (a = i, (i = function (e) { return S().off(e), a.apply(this, arguments) }).guid = a.guid || (a.guid = S.guid++)), e.each(function () { S.event.add(this, t, i, r, n) }) } function Se(e, i, o) { o ? (Y.set(e, i, !1), S.event.add(e, i, { namespace: !1, handler: function (e) { var t, n, r = Y.get(this, i); if (1 & e.isTrigger && this[i]) { if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation(); else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value } else r.length && (Y.set(this, i, { value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this) }), e.stopImmediatePropagation()) } })) : void 0 === Y.get(e, i) && S.event.add(e, i, we) } S.event = { global: {}, add: function (t, e, n, r, i) { var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t); if (V(t)) { n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) { return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0 }), l = (e = (e || "").match(P) || [""]).length; while (l--) d = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && S.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0) } }, remove: function (e, t, n, r, i) { var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e); if (v && (u = v.events)) { l = (t = (t || "").match(P) || [""]).length; while (l--) if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) { f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c)); a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d]) } else for (d in u) S.event.remove(e, d + t[l], n, r, !0); S.isEmptyObject(u) && Y.remove(e, "handle events") } }, dispatch: function (e) { var t, n, r, i, o, a, s = new Array(arguments.length), u = S.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = S.event.special[u.type] || {}; for (s[0] = u, t = 1; t < arguments.length; t++)s[t] = arguments[t]; if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) { a = S.event.handlers.call(this, u, l), t = 0; while ((i = a[t++]) && !u.isPropagationStopped()) { u.currentTarget = i.elem, n = 0; while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, u), u.result } }, handlers: function (e, t) { var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target; if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) { for (o = [], a = {}, n = 0; n < u; n++)void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r); o.length && s.push({ elem: l, handlers: o }) } return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s }, addProp: function (t, e) { Object.defineProperty(S.Event.prototype, t, { enumerable: !0, configurable: !0, get: m(e) ? function () { if (this.originalEvent) return e(this.originalEvent) } : function () { if (this.originalEvent) return this.originalEvent[t] }, set: function (e) { Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) } }) }, fix: function (e) { return e[S.expando] ? e : new S.Event(e) }, special: { load: { noBubble: !0 }, click: { setup: function (e) { var t = this || e; return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click", we), !1 }, trigger: function (e) { var t = this || e; return pe.test(t.type) && t.click && A(t, "input") && Se(t, "click"), !0 }, _default: function (e) { var t = e.target; return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a") } }, beforeunload: { postDispatch: function (e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } } }, S.removeEvent = function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n) }, S.Event = function (e, t) { if (!(this instanceof S.Event)) return new S.Event(e, t); e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0 }, S.Event.prototype = { constructor: S.Event, isDefaultPrevented: Te, isPropagationStopped: Te, isImmediatePropagationStopped: Te, isSimulated: !1, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault() }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation() }, stopImmediatePropagation: function () { var e = this.originalEvent; this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation() } }, S.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, code: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: !0 }, S.event.addProp), S.each({ focus: "focusin", blur: "focusout" }, function (e, t) { S.event.special[e] = { setup: function () { return Se(this, e, Ce), !1 }, trigger: function () { return Se(this, e), !0 }, _default: function () { return !0 }, delegateType: t } }), S.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, i) { S.event.special[e] = { delegateType: i, bindType: i, handle: function (e) { var t, n = e.relatedTarget, r = e.handleObj; return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t } } }), S.fn.extend({ on: function (e, t, n, r) { return Ee(this, e, t, n, r) }, one: function (e, t, n, r) { return Ee(this, e, t, n, r, 1) }, off: function (e, t, n) { var r, i; if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this; if ("object" == typeof e) { for (i in e) this.off(i, t, e[i]); return this } return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each(function () { S.event.remove(this, e, n, t) }) } }); var ke = /<script|<style|<link/i, Ae = /checked\s*(?:[^=]|=\s*.checked.)/i, Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function je(e, t) { return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e } function De(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e } function qe(e) { return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e } function Le(e, t) { var n, r, i, o, a, s; if (1 === t.nodeType) { if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) for (n = 0, r = s[i].length; n < r; n++)S.event.add(t, i, s[i][n]); Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a)) } } function He(n, r, i, o) { r = g(r); var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = m(d); if (h || 1 < f && "string" == typeof d && !y.checkClone && Ae.test(d)) return n.each(function (e) { var t = n.eq(e); h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o) }); if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) { for (s = (a = S.map(ve(e, "script"), De)).length; c < f; c++)u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c); if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++)u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, { nonce: u.nonce || u.getAttribute("nonce") }, l) : b(u.textContent.replace(Ne, ""), u, l)) } return n } function Oe(e, t, n) { for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r)); return e } S.extend({ htmlPrefilter: function (e) { return e }, clone: function (e, t, n) { var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = ie(e); if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++)s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue); if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++)Le(o[r], a[r]); else Le(e, c); return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c }, cleanData: function (e) { for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)if (V(n)) { if (t = n[Y.expando]) { if (t.events) for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle); n[Y.expando] = void 0 } n[Q.expando] && (n[Q.expando] = void 0) } } }), S.fn.extend({ detach: function (e) { return Oe(this, e, !0) }, remove: function (e) { return Oe(this, e) }, text: function (e) { return $(this, function (e) { return void 0 === e ? S.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e) }) }, null, e, arguments.length) }, append: function () { return He(this, arguments, function (e) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e) }) }, prepend: function () { return He(this, arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = je(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return He(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return He(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, empty: function () { for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = ""); return this }, clone: function (e, t) { return e = null != e && e, t = null == t ? e : t, this.map(function () { return S.clone(this, e, t) }) }, html: function (e) { return $(this, function (e) { var t = this[0] || {}, n = 0, r = this.length; if (void 0 === e && 1 === t.nodeType) return t.innerHTML; if ("string" == typeof e && !ke.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) { e = S.htmlPrefilter(e); try { for (; n < r; n++)1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e); t = 0 } catch (e) { } } t && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var n = []; return He(this, arguments, function (e) { var t = this.parentNode; S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this)) }, n) } }), S.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, a) { S.fn[e] = function (e) { for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++)t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get()); return this.pushStack(n) } }); var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"), Re = function (e) { var t = e.ownerDocument.defaultView; return t && t.opener || (t = C), t.getComputedStyle(e) }, Me = function (e, t, n) { var r, i, o = {}; for (i in t) o[i] = e.style[i], e.style[i] = t[i]; for (i in r = n.call(e), t) e.style[i] = o[i]; return r }, Ie = new RegExp(ne.join("|"), "i"); function We(e, t, n) { var r, i, o, a, s = e.style; return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Pe.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a } function Fe(e, t) { return { get: function () { if (!e()) return (this.get = t).apply(this, arguments); delete this.get } } } !function () { function e() { if (l) { u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l); var e = C.getComputedStyle(l); n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null } } function t(e) { return Math.round(parseFloat(e)) } var n, r, i, o, a, s, u = E.createElement("div"), l = E.createElement("div"); l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, { boxSizingReliable: function () { return e(), r }, pixelBoxStyles: function () { return e(), o }, pixelPosition: function () { return e(), n }, reliableMarginLeft: function () { return e(), s }, scrollboxSize: function () { return e(), i }, reliableTrDimensions: function () { var e, t, n, r; return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, re.removeChild(e)), a } })) }(); var Be = ["Webkit", "Moz", "ms"], $e = E.createElement("div").style, _e = {}; function ze(e) { var t = S.cssProps[e] || _e[e]; return t || (e in $e ? e : _e[e] = function (e) { var t = e[0].toUpperCase() + e.slice(1), n = Be.length; while (n--) if ((e = Be[n] + t) in $e) return e }(e) || e) } var Ue = /^(none|table(?!-c[ea]).+)/, Xe = /^--/, Ve = { position: "absolute", visibility: "hidden", display: "block" }, Ge = { letterSpacing: "0", fontWeight: "400" }; function Ye(e, t, n) { var r = te.exec(t); return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t } function Qe(e, t, n, r, i, o) { var a = "width" === t ? 1 : 0, s = 0, u = 0; if (n === (r ? "border" : "content")) return 0; for (; a < 4; a += 2)"margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i)); return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u } function Je(e, t, n) { var r = Re(e), i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r), o = i, a = We(e, t, r), s = "offset" + t[0].toUpperCase() + t.slice(1); if (Pe.test(a)) { if (!n) return a; a = "auto" } return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Qe(e, t, n || (i ? "border" : "content"), o, r, a) + "px" } function Ke(e, t, n, r, i) { return new Ke.prototype.init(e, t, n, r, i) } S.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = We(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function (e, t, n, r) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var i, o, a, s = X(t), u = Xe.test(t), l = e.style; if (u || (t = ze(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t]; "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n)) } }, css: function (e, t, n, r) { var i, o, a, s = X(t); return Xe.test(t) || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i } }), S.each(["height", "width"], function (e, u) { S.cssHooks[u] = { get: function (e, t, n) { if (t) return !Ue.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Me(e, Ve, function () { return Je(e, u, n) }) }, set: function (e, t, n) { var r, i = Re(e), o = !y.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i), s = n ? Qe(e, u, n, a, i) : 0; return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Qe(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Ye(0, t, s) } } }), S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, function (e, t) { if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, { marginLeft: 0 }, function () { return e.getBoundingClientRect().left })) + "px" }), S.each({ margin: "", padding: "", border: "Width" }, function (i, o) { S.cssHooks[i + o] = { expand: function (e) { for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)n[i + ne[t] + o] = r[t] || r[t - 2] || r[0]; return n } }, "margin" !== i && (S.cssHooks[i + o].set = Ye) }), S.fn.extend({ css: function (e, t) { return $(this, function (e, t, n) { var r, i, o = {}, a = 0; if (Array.isArray(t)) { for (r = Re(e), i = t.length; a < i; a++)o[t[a]] = S.css(e, t[a], !1, r); return o } return void 0 !== n ? S.style(e, t, n) : S.css(e, t) }, e, t, 1 < arguments.length) } }), ((S.Tween = Ke).prototype = { constructor: Ke, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px") }, cur: function () { var e = Ke.propHooks[this.prop]; return e && e.get ? e.get(this) : Ke.propHooks._default.get(this) }, run: function (e) { var t, n = Ke.propHooks[this.prop]; return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this } }).init.prototype = Ke.prototype, (Ke.propHooks = { _default: { get: function (e) { var t; return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 }, set: function (e) { S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit) } } }).scrollTop = Ke.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, S.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 }, _default: "swing" }, S.fx = Ke.prototype.init, S.fx.step = {}; var Ze, et, tt, nt, rt = /^(?:toggle|show|hide)$/, it = /queueHooks$/; function ot() { et && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(ot) : C.setTimeout(ot, S.fx.interval), S.fx.tick()) } function at() { return C.setTimeout(function () { Ze = void 0 }), Ze = Date.now() } function st(e, t) { var n, r = 0, i = { height: e }; for (t = t ? 1 : 0; r < 4; r += 2 - t)i["margin" + (n = ne[r])] = i["padding" + n] = e; return t && (i.opacity = i.width = e), i } function ut(e, t, n) { for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++)if (r = i[o].call(n, t, e)) return r } function lt(o, e, t) { var n, a, r = 0, i = lt.prefilters.length, s = S.Deferred().always(function () { delete u.elem }), u = function () { if (a) return !1; for (var e = Ze || at(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)l.tweens[r].run(n); return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1) }, l = s.promise({ elem: o, props: S.extend({}, e), opts: S.extend(!0, { specialEasing: {}, easing: S.easing._default }, t), originalProperties: e, originalOptions: t, startTime: Ze || at(), duration: t.duration, tweens: [], createTween: function (e, t) { var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing); return l.tweens.push(n), n }, stop: function (e) { var t = 0, n = e ? l.tweens.length : 0; if (a) return this; for (a = !0; t < n; t++)l.tweens[t].run(1); return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this } }), c = l.props; for (!function (e, t) { var n, r, i, o, a; for (n in e) if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && "expand" in a) for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i); else t[r] = i }(c, l.opts.specialEasing); r < i; r++)if (n = lt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n; return S.map(c, ut, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, { elem: o, anim: l, queue: l.opts.queue })), l } S.Animation = S.extend(lt, { tweeners: { "*": [function (e, t) { var n = this.createTween(e, t); return se(n.elem, e, te.exec(t), n), n }] }, tweener: function (e, t) { m(e) ? (t = e, e = ["*"]) : e = e.match(P); for (var n, r = 0, i = e.length; r < i; r++)n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], lt.tweeners[n].unshift(t) }, prefilters: [function (e, t, n) { var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), v = Y.get(e, "fxshow"); for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () { a.unqueued || s() }), a.unqueued++, p.always(function () { p.always(function () { a.unqueued--, S.queue(e, "fx").length || a.empty.fire() }) })), t) if (i = t[r], rt.test(i)) { if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) { if ("show" !== i || !v || void 0 === v[r]) continue; g = !0 } d[r] = v && v[r] || S.style(e, r) } if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function () { h.display = l }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () { h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2] })), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", { display: l }), o && (v.hidden = !g), g && le([e], !0), p.done(function () { for (r in g || le([e]), Y.remove(e, "fxshow"), d) S.style(e, r, d[r]) })), u = ut(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0)) }], prefilter: function (e, t) { t ? lt.prefilters.unshift(e) : lt.prefilters.push(e) } }), S.speed = function (e, t, n) { var r = e && "object" == typeof e ? S.extend({}, e) : { complete: n || !n && t || m(e) && e, duration: e, easing: n && t || t && !m(t) && t }; return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () { m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue) }, r }, S.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (t, e, n, r) { var i = S.isEmptyObject(t), o = S.speed(e, n, r), a = function () { var e = lt(this, S.extend({}, t), o); (i || Y.get(this, "finish")) && e.stop(!0) }; return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a) }, stop: function (i, e, o) { var a = function (e) { var t = e.stop; delete e.stop, t(o) }; return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () { var e = !0, t = null != i && i + "queueHooks", n = S.timers, r = Y.get(this); if (t) r[t] && r[t].stop && a(r[t]); else for (t in r) r[t] && r[t].stop && it.test(t) && a(r[t]); for (t = n.length; t--;)n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1)); !e && o || S.dequeue(this, i) }) }, finish: function (a) { return !1 !== a && (a = a || "fx"), this.each(function () { var e, t = Y.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = S.timers, o = n ? n.length : 0; for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;)i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1)); for (e = 0; e < o; e++)n[e] && n[e].finish && n[e].finish.call(this); delete t.finish }) } }), S.each(["toggle", "show", "hide"], function (e, r) { var i = S.fn[r]; S.fn[r] = function (e, t, n) { return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(st(r, !0), e, t, n) } }), S.each({ slideDown: st("show"), slideUp: st("hide"), slideToggle: st("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, r) { S.fn[e] = function (e, t, n) { return this.animate(r, e, t, n) } }), S.timers = [], S.fx.tick = function () { var e, t = 0, n = S.timers; for (Ze = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1); n.length || S.fx.stop(), Ze = void 0 }, S.fx.timer = function (e) { S.timers.push(e), S.fx.start() }, S.fx.interval = 13, S.fx.start = function () { et || (et = !0, ot()) }, S.fx.stop = function () { et = null }, S.fx.speeds = { slow: 600, fast: 200, _default: 400 }, S.fn.delay = function (r, e) { return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) { var n = C.setTimeout(e, r); t.stop = function () { C.clearTimeout(n) } }) }, tt = E.createElement("input"), nt = E.createElement("select").appendChild(E.createElement("option")), tt.type = "checkbox", y.checkOn = "" !== tt.value, y.optSelected = nt.selected, (tt = E.createElement("input")).value = "t", tt.type = "radio", y.radioValue = "t" === tt.value; var ct, ft = S.expr.attrHandle; S.fn.extend({ attr: function (e, t) { return $(this, S.attr, e, t, 1 < arguments.length) }, removeAttr: function (e) { return this.each(function () { S.removeAttr(this, e) }) } }), S.extend({ attr: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r) }, attrHooks: { type: { set: function (e, t) { if (!y.radioValue && "radio" === t && A(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, removeAttr: function (e, t) { var n, r = 0, i = t && t.match(P); if (i && 1 === e.nodeType) while (n = i[r++]) e.removeAttribute(n) } }), ct = { set: function (e, t, n) { return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n } }, S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) { var a = ft[t] || S.find.attr; ft[t] = function (e, t, n) { var r, i, o = t.toLowerCase(); return n || (i = ft[o], ft[o] = r, r = null != a(e, t, n) ? o : null, ft[o] = i), r } }); var pt = /^(?:input|select|textarea|button)$/i, dt = /^(?:a|area)$/i; function ht(e) { return (e.match(P) || []).join(" ") } function gt(e) { return e.getAttribute && e.getAttribute("class") || "" } function vt(e) { return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [] } S.fn.extend({ prop: function (e, t) { return $(this, S.prop, e, t, 1 < arguments.length) }, removeProp: function (e) { return this.each(function () { delete this[S.propFix[e] || e] }) } }), S.extend({ prop: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t] }, propHooks: { tabIndex: { get: function (e) { var t = S.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : pt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), y.optSelected || (S.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null }, set: function (e) { var t = e.parentNode; t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex) } }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { S.propFix[this.toLowerCase()] = this }), S.fn.extend({ addClass: function (t) { var e, n, r, i, o, a, s, u = 0; if (m(t)) return this.each(function (e) { S(this).addClass(t.call(this, e, gt(this))) }); if ((e = vt(t)).length) while (n = this[u++]) if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") { a = 0; while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " "); i !== (s = ht(r)) && n.setAttribute("class", s) } return this }, removeClass: function (t) { var e, n, r, i, o, a, s, u = 0; if (m(t)) return this.each(function (e) { S(this).removeClass(t.call(this, e, gt(this))) }); if (!arguments.length) return this.attr("class", ""); if ((e = vt(t)).length) while (n = this[u++]) if (i = gt(n), r = 1 === n.nodeType && " " + ht(i) + " ") { a = 0; while (o = e[a++]) while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " "); i !== (s = ht(r)) && n.setAttribute("class", s) } return this }, toggleClass: function (i, t) { var o = typeof i, a = "string" === o || Array.isArray(i); return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) { S(this).toggleClass(i.call(this, e, gt(this), t), t) }) : this.each(function () { var e, t, n, r; if (a) { t = 0, n = S(this), r = vt(i); while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e) } else void 0 !== i && "boolean" !== o || ((e = gt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || "")) }) }, hasClass: function (e) { var t, n, r = 0; t = " " + e + " "; while (n = this[r++]) if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0; return !1 } }); var yt = /\r/g; S.fn.extend({ val: function (n) { var r, e, i, t = this[0]; return arguments.length ? (i = m(n), this.each(function (e) { var t; 1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function (e) { return null == e ? "" : e + "" })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t)) })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0 } }), S.extend({ valHooks: { option: { get: function (e) { var t = S.find.attr(e, "value"); return null != t ? t : ht(S.text(e)) } }, select: { get: function (e) { var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length; for (r = o < 0 ? u : a ? o : 0; r < u; r++)if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) { if (t = S(n).val(), a) return t; s.push(t) } return s }, set: function (e, t) { var n, r, i = e.options, o = S.makeArray(t), a = i.length; while (a--) ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0); return n || (e.selectedIndex = -1), o } } } }), S.each(["radio", "checkbox"], function () { S.valHooks[this] = { set: function (e, t) { if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t) } }, y.checkOn || (S.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }), y.focusin = "onfocusin" in C; var mt = /^(?:focusinfocus|focusoutblur)$/, xt = function (e) { e.stopPropagation() }; S.extend(S.event, { trigger: function (e, t, n, r) { var i, o, a, s, u, l, c, f, p = [n || E], d = v.call(e, "type") ? e.type : e, h = v.call(e, "namespace") ? e.namespace.split(".") : []; if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) { if (!r && !c.noBubble && !x(n)) { for (s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)p.push(o), a = o; a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C) } i = 0; while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault()); return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, xt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, xt), S.event.triggered = void 0, a && (n[u] = a)), e.result } }, simulate: function (e, t, n) { var r = S.extend(new S.Event, n, { type: e, isSimulated: !0 }); S.event.trigger(r, null, t) } }), S.fn.extend({ trigger: function (e, t) { return this.each(function () { S.event.trigger(e, t, this) }) }, triggerHandler: function (e, t) { var n = this[0]; if (n) return S.event.trigger(e, t, n, !0) } }), y.focusin || S.each({ focus: "focusin", blur: "focusout" }, function (n, r) { var i = function (e) { S.event.simulate(r, e.target, S.event.fix(e)) }; S.event.special[r] = { setup: function () { var e = this.ownerDocument || this.document || this, t = Y.access(e, r); t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1) }, teardown: function () { var e = this.ownerDocument || this.document || this, t = Y.access(e, r) - 1; t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r)) } } }); var bt = C.location, wt = { guid: Date.now() }, Tt = /\?/; S.parseXML = function (e) { var t, n; if (!e || "string" != typeof e) return null; try { t = (new C.DOMParser).parseFromString(e, "text/xml") } catch (e) { } return n = t && t.getElementsByTagName("parsererror")[0], t && !n || S.error("Invalid XML: " + (n ? S.map(n.childNodes, function (e) { return e.textContent }).join("\n") : e)), t }; var Ct = /\[\]$/, Et = /\r?\n/g, St = /^(?:submit|button|image|reset|file)$/i, kt = /^(?:input|select|textarea|keygen)/i; function At(n, e, r, i) { var t; if (Array.isArray(e)) S.each(e, function (e, t) { r || Ct.test(n) ? i(n, t) : At(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i) }); else if (r || "object" !== w(e)) i(n, e); else for (t in e) At(n + "[" + t + "]", e[t], r, i) } S.param = function (e, t) { var n, r = [], i = function (e, t) { var n = m(t) ? t() : t; r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n) }; if (null == e) return ""; if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function () { i(this.name, this.value) }); else for (n in e) At(n, e[n], t, i); return r.join("&") }, S.fn.extend({ serialize: function () { return S.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = S.prop(this, "elements"); return e ? S.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !S(this).is(":disabled") && kt.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e)) }).map(function (e, t) { var n = S(this).val(); return null == n ? null : Array.isArray(n) ? S.map(n, function (e) { return { name: t.name, value: e.replace(Et, "\r\n") } }) : { name: t.name, value: n.replace(Et, "\r\n") } }).get() } }); var Nt = /%20/g, jt = /#.*$/, Dt = /([?&])_=[^&]*/, qt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Lt = /^(?:GET|HEAD)$/, Ht = /^\/\//, Ot = {}, Pt = {}, Rt = "*/".concat("*"), Mt = E.createElement("a"); function It(o) { return function (e, t) { "string" != typeof e && (t = e, e = "*"); var n, r = 0, i = e.toLowerCase().match(P) || []; if (m(t)) while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t) } } function Wt(t, i, o, a) { var s = {}, u = t === Pt; function l(e) { var r; return s[e] = !0, S.each(t[e] || [], function (e, t) { var n = t(i, o, a); return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1) }), r } return l(i.dataTypes[0]) || !s["*"] && l("*") } function Ft(e, t) { var n, r, i = S.ajaxSettings.flatOptions || {}; for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]); return r && S.extend(!0, e, r), e } Mt.href = bt.href, S.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: bt.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Rt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": S.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (e, t) { return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e) }, ajaxPrefilter: It(Ot), ajaxTransport: It(Pt), ajax: function (e, t) { "object" == typeof e && (t = e, e = void 0), t = t || {}; var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event, x = S.Deferred(), b = S.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = { readyState: 0, getResponseHeader: function (e) { var t; if (h) { if (!n) { n = {}; while (t = qt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]) } t = n[e.toLowerCase() + " "] } return null == t ? null : t.join(", ") }, getAllResponseHeaders: function () { return h ? p : null }, setRequestHeader: function (e, t) { return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this }, overrideMimeType: function (e) { return null == h && (v.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (h) T.always(e[T.status]); else for (t in e) w[t] = [w[t], e[t]]; return this }, abort: function (e) { var t = e || u; return c && c.abort(t), l(0, t), this } }; if (x.promise(T), v.url = ((e || v.url || bt.href) + "").replace(Ht, bt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) { r = E.createElement("a"); try { r.href = v.url, r.href = r.href, v.crossDomain = Mt.protocol + "//" + Mt.host != r.protocol + "//" + r.host } catch (e) { v.crossDomain = !0 } } if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Wt(Ot, v, t, T), h) return T; for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Lt.test(v.type), f = v.url.replace(jt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Nt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Tt.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Dt, "$1"), o = (Tt.test(f) ? "&" : "?") + "_=" + wt.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]); if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort(); if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Wt(Pt, v, t, T)) { if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T; v.async && 0 < v.timeout && (d = C.setTimeout(function () { T.abort("timeout") }, v.timeout)); try { h = !1, c.send(a, l) } catch (e) { if (h) throw e; l(-1, e) } } else l(-1, "No Transport"); function l(e, t, n, r) { var i, o, a, s, u, l = t; h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) { var r, i, o, a, s = e.contents, u = e.dataTypes; while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type")); if (r) for (i in s) if (s[i] && s[i].test(r)) { u.unshift(i); break } if (u[0] in n) o = u[0]; else { for (i in n) { if (!u[0] || e.converters[i + " " + u[0]]) { o = i; break } a || (a = i) } o = o || a } if (o) return o !== u[0] && u.unshift(o), n[o] }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && S.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function () { }), s = function (e, t, n, r) { var i, o, a, s, u, l = {}, c = e.dataTypes.slice(); if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a]; o = c.shift(); while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) { if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) { !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1])); break } if (!0 !== a) if (a && e["throws"]) t = a(t); else try { t = a(t) } catch (e) { return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o } } } return { state: "success", data: t } }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop"))) } return T }, getJSON: function (e, t, n) { return S.get(e, t, n, "json") }, getScript: function (e, t) { return S.get(e, void 0, t, "script") } }), S.each(["get", "post"], function (e, i) { S[i] = function (e, t, n, r) { return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({ url: e, type: i, dataType: r, data: t, success: n }, S.isPlainObject(e) && e)) } }), S.ajaxPrefilter(function (e) { var t; for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "") }), S._evalUrl = function (e, t, n) { return S.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, converters: { "text script": function () { } }, dataFilter: function (e) { S.globalEval(e, t, n) } }) }, S.fn.extend({ wrapAll: function (e) { var t; return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstElementChild) e = e.firstElementChild; return e }).append(this)), this }, wrapInner: function (n) { return m(n) ? this.each(function (e) { S(this).wrapInner(n.call(this, e)) }) : this.each(function () { var e = S(this), t = e.contents(); t.length ? t.wrapAll(n) : e.append(n) }) }, wrap: function (t) { var n = m(t); return this.each(function (e) { S(this).wrapAll(n ? t.call(this, e) : t) }) }, unwrap: function (e) { return this.parent(e).not("body").each(function () { S(this).replaceWith(this.childNodes) }), this } }), S.expr.pseudos.hidden = function (e) { return !S.expr.pseudos.visible(e) }, S.expr.pseudos.visible = function (e) { return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) }, S.ajaxSettings.xhr = function () { try { return new C.XMLHttpRequest } catch (e) { } }; var Bt = { 0: 200, 1223: 204 }, $t = S.ajaxSettings.xhr(); y.cors = !!$t && "withCredentials" in $t, y.ajax = $t = !!$t, S.ajaxTransport(function (i) { var o, a; if (y.cors || $t && !i.crossDomain) return { send: function (e, t) { var n, r = i.xhr(); if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) r[n] = i.xhrFields[n]; for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]); o = function (e) { return function () { o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Bt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? { binary: r.response } : { text: r.responseText }, r.getAllResponseHeaders())) } }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () { 4 === r.readyState && C.setTimeout(function () { o && a() }) }, o = o("abort"); try { r.send(i.hasContent && i.data || null) } catch (e) { if (o) throw e } }, abort: function () { o && o() } } }), S.ajaxPrefilter(function (e) { e.crossDomain && (e.contents.script = !1) }), S.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function (e) { return S.globalEval(e), e } } }), S.ajaxPrefilter("script", function (e) { void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET") }), S.ajaxTransport("script", function (n) { var r, i; if (n.crossDomain || n.scriptAttrs) return { send: function (e, t) { r = S("<script>").attr(n.scriptAttrs || {}).prop({ charset: n.scriptCharset, src: n.url }).on("load error", i = function (e) { r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type) }), E.head.appendChild(r[0]) }, abort: function () { i && i() } } }); var _t, zt = [], Ut = /(=)\?(?=&|$)|\?\?/; S.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = zt.pop() || S.expando + "_" + wt.guid++; return this[e] = !0, e } }), S.ajaxPrefilter("json jsonp", function (e, t, n) { var r, i, o, a = !1 !== e.jsonp && (Ut.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(e.data) && "data"); if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ut, "$1" + r) : !1 !== e.jsonp && (e.url += (Tt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () { return o || S.error(r + " was not called"), o[0] }, e.dataTypes[0] = "json", i = C[r], C[r] = function () { o = arguments }, n.always(function () { void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, zt.push(r)), o && m(i) && i(o[0]), o = i = void 0 }), "script" }), y.createHTMLDocument = ((_t = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === _t.childNodes.length), S.parseHTML = function (e, t, n) { return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes))); var r, i, o }, S.fn.load = function (e, t, n) { var r, i, o, a = this, s = e.indexOf(" "); return -1 < s && (r = ht(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && S.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) { o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e) }).always(n && function (e, t) { a.each(function () { n.apply(this, o || [e.responseText, t, e]) }) }), this }, S.expr.pseudos.animated = function (t) { return S.grep(S.timers, function (e) { return t === e.elem }).length }, S.offset = { setOffset: function (e, t, n) { var r, i, o, a, s, u, l = S.css(e, "position"), c = S(e), f = {}; "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f) } }, S.fn.extend({ offset: function (t) { if (arguments.length) return void 0 === t ? this : this.each(function (e) { S.offset.setOffset(this, t, e) }); var e, n, r = this[0]; return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 } : void 0 }, position: function () { if (this[0]) { var e, t, n, r = this[0], i = { top: 0, left: 0 }; if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect(); else { t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) e = e.parentNode; e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0)) } return { top: t.top - i.top - S.css(r, "marginTop", !0), left: t.left - i.left - S.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent; while (e && "static" === S.css(e, "position")) e = e.offsetParent; return e || re }) } }), S.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, i) { var o = "pageYOffset" === i; S.fn[t] = function (e) { return $(this, function (e, t, n) { var r; if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t]; r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n }, t, e, arguments.length) } }), S.each(["top", "left"], function (e, n) { S.cssHooks[n] = Fe(y.pixelPosition, function (e, t) { if (t) return t = We(e, n), Pe.test(t) ? S(e).position()[n] + "px" : t }) }), S.each({ Height: "height", Width: "width" }, function (a, s) { S.each({ padding: "inner" + a, content: s, "": "outer" + a }, function (r, o) { S.fn[o] = function (e, t) { var n = arguments.length && (r || "boolean" != typeof e), i = r || (!0 === e || !0 === t ? "margin" : "border"); return $(this, function (e, t, n) { var r; return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i) }, s, n ? e : void 0, n) } }) }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { S.fn[t] = function (e) { return this.on(t, e) } }), S.fn.extend({ bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) }, hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) } }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) { S.fn[n] = function (e, t) { return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n) } }); var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; S.proxy = function (e, t) { var n, r, i; if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function () { return e.apply(t || this, r.concat(s.call(arguments))) }).guid = e.guid = e.guid || S.guid++, i }, S.holdReady = function (e) { e ? S.readyWait++ : S.ready(!0) }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function (e) { var t = S.type(e); return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e)) }, S.trim = function (e) { return null == e ? "" : (e + "").replace(Xt, "") }, "function" == typeof define && define.amd && define("jquery", [], function () { return S }); var Vt = C.jQuery, Gt = C.$; return S.noConflict = function (e) { return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S }, "undefined" == typeof e && (C.jQuery = C.$ = S), S });
/*!
 * 
 * persian-date -  1.1.0
 * Reza Babakhani <babakhani.reza@gmail.com>
 * http://babakhani.github.io/PersianWebToolkit/docs/persian-date/
 * Under MIT license 
 * 
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["persianDate"] = factory();
    else
        root["persianDate"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
                /******/
            };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
        }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
            /******/
        });
                /******/
            }
            /******/
        };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
            /******/
        };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
        /******/
    })
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var durationUnit = __webpack_require__(4).durationUnit;

            var Helpers = function () {
                function Helpers() {
                    _classCallCheck(this, Helpers);
                }

                _createClass(Helpers, [{
                    key: 'toPersianDigit',


                    /**
                     * @description return converted string to persian digit
                     * @param digit
                     * @returns {string|*}
                     */
                    value: function toPersianDigit(digit) {
                        var latinDigit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                        return digit.toString().replace(/\d+/g, function (digit) {
                            var enDigitArr = [],
                                peDigitArr = [],
                                i = void 0,
                                j = void 0;
                            for (i = 0; i < digit.length; i += 1) {
                                enDigitArr.push(digit.charCodeAt(i));
                            }
                            for (j = 0; j < enDigitArr.length; j += 1) {
                                peDigitArr.push(String.fromCharCode(enDigitArr[j] + (!!latinDigit && latinDigit === true ? 1584 : 1728)));
                            }
                            return peDigitArr.join('');
                        });
                    }

                    /**
                     * @param number
                     * @param targetLength
                     * @returns {string}
                     */

                }, {
                    key: 'leftZeroFill',
                    value: function leftZeroFill(number, targetLength) {
                        var output = number + '';
                        while (output.length < targetLength) {
                            output = '0' + output;
                        }
                        return output;
                    }

                    /**
                     * @description normalize duration params and return valid param
                     * @return {{unit: *, value: *}}
                     */

                }, {
                    key: 'normalizeDuration',
                    value: function normalizeDuration() {
                        var unit = void 0,
                            value = void 0;
                        if (typeof arguments[0] === 'string') {
                            unit = arguments[0];
                            value = arguments[1];
                        } else {
                            value = arguments[0];
                            unit = arguments[1];
                        }
                        if (durationUnit.year.indexOf(unit) > -1) {
                            unit = 'year';
                        } else if (durationUnit.month.indexOf(unit) > -1) {
                            unit = 'month';
                        } else if (durationUnit.week.indexOf(unit) > -1) {
                            unit = 'week';
                        } else if (durationUnit.day.indexOf(unit) > -1) {
                            unit = 'day';
                        } else if (durationUnit.hour.indexOf(unit) > -1) {
                            unit = 'hour';
                        } else if (durationUnit.minute.indexOf(unit) > -1) {
                            unit = 'minute';
                        } else if (durationUnit.second.indexOf(unit) > -1) {
                            unit = 'second';
                        } else if (durationUnit.millisecond.indexOf(unit) > -1) {
                            unit = 'millisecond';
                        }
                        return {
                            unit: unit,
                            value: value
                        };
                    }

                    /**
                     *
                     * @param number
                     * @returns {number}
                     */

                }, {
                    key: 'absRound',
                    value: function absRound(number) {
                        if (number < 0) {
                            return Math.ceil(number);
                        } else {
                            return Math.floor(number);
                        }
                    }

                    /**
                     *
                     * @param number
                     * @return {number}
                     */

                }, {
                    key: 'absFloor',
                    value: function absFloor(number) {
                        if (number < 0) {
                            // -0 -> 0
                            return Math.ceil(number) || 0;
                        } else {
                            return Math.floor(number);
                        }
                    }
                }]);

                return Helpers;
            }();

            module.exports = Helpers;

            /***/
        }),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var TypeChecking = __webpack_require__(10);
            var Algorithms = __webpack_require__(2);
            var Helpers = __webpack_require__(0);
            var Duration = __webpack_require__(5);
            var Validator = __webpack_require__(11);
            var toPersianDigit = new Helpers().toPersianDigit;
            var leftZeroFill = new Helpers().leftZeroFill;
            var normalizeDuration = new Helpers().normalizeDuration;
            var fa = __webpack_require__(7);
            var en = __webpack_require__(6);

            /**
             * @description persian date class
             */

            var PersianDateClass = function () {

                /**
                 * @param input
                 * @return {PersianDateClass}
                 */
                function PersianDateClass(input) {
                    _classCallCheck(this, PersianDateClass);

                    this.calendarType = PersianDateClass.calendarType;
                    this.localType = PersianDateClass.localType;
                    this.leapYearMode = PersianDateClass.leapYearMode;

                    this.algorithms = new Algorithms(this);
                    this.version = "1.1.0";
                    this._utcMode = false;
                    if (this.localType !== 'fa') {
                        this.formatPersian = false;
                    } else {
                        this.formatPersian = '_default';
                    }
                    this.State = this.algorithms.State;
                    this.setup(input);
                    if (this.State.isInvalidDate) {
                        // Return Date like message
                        return new Date([-1, -1]);
                    }
                    return this;
                }

                /**
                 * @param input
                 */


                _createClass(PersianDateClass, [{
                    key: 'setup',
                    value: function setup(input) {
                        // Convert Any thing to Gregorian Date
                        if (TypeChecking.isDate(input)) {
                            this._gDateToCalculators(input);
                        } else if (TypeChecking.isArray(input)) {
                            if (!Validator.validateInputArray(input)) {
                                this.State.isInvalidDate = true;
                                return false;
                            }
                            this.algorithmsCalc([input[0], input[1] ? input[1] : 1, input[2] ? input[2] : 1, input[3] ? input[3] : 0, input[4] ? input[4] : 0, input[5] ? input[5] : 0, input[6] ? input[6] : 0]);
                        } else if (TypeChecking.isNumber(input)) {
                            var fromUnix = new Date(input);
                            this._gDateToCalculators(fromUnix);
                        }
                        // instance of pDate
                        else if (input instanceof PersianDateClass) {
                            this.algorithmsCalc([input.year(), input.month(), input.date(), input.hour(), input.minute(), input.second(), input.millisecond()]);
                        }
                        // ASP.NET JSON Date
                        else if (input && input.substring(0, 6) === '/Date(') {
                            var fromDotNet = new Date(parseInt(input.substr(6)));
                            this._gDateToCalculators(fromDotNet);
                        } else {
                            var now = new Date();
                            this._gDateToCalculators(now);
                        }
                    }

                    /**
                     * @param input
                     * @return {*}
                     * @private
                     */

                }, {
                    key: '_getSyncedClass',
                    value: function _getSyncedClass(input) {
                        var syncedCelander = PersianDateClass.toCalendar(this.calendarType).toLocale(this.localType).toLeapYearMode(this.leapYearMode);
                        return new syncedCelander(input);
                    }

                    /**
                     * @param inputgDate
                     * @private
                     */

                }, {
                    key: '_gDateToCalculators',
                    value: function _gDateToCalculators(inputgDate) {
                        this.algorithms.calcGregorian([inputgDate.getFullYear(), inputgDate.getMonth(), inputgDate.getDate(), inputgDate.getHours(), inputgDate.getMinutes(), inputgDate.getSeconds(), inputgDate.getMilliseconds()]);
                    }

                    /**
                     * @since 1.0.0
                     * @description Helper method that return date range name like week days name, month names, month days names (specially in persian calendar).
                     * @static
                     * @return {*}
                     */

                }, {
                    key: 'rangeName',


                    /**
                     * @since 1.0.0
                     * @description Helper method that return date range name like week days name, month names, month days names (specially in persian calendar).
                     * @return {*}
                     */
                    value: function rangeName() {
                        var t = this.calendarType;
                        if (this.localType === 'fa') {
                            if (t === 'persian') {
                                return fa.persian;
                            } else {
                                return fa.gregorian;
                            }
                        } else {
                            if (t === 'persian') {
                                return en.persian;
                            } else {
                                return en.gregorian;
                            }
                        }
                    }

                    /**
                     * @since 1.0.0
                     * @param input
                     * @return {PersianDateClass}
                     */

                }, {
                    key: 'toLeapYearMode',
                    value: function toLeapYearMode(input) {
                        this.leapYearMode = input;
                        if (input === 'astronomical' && this.calendarType == 'persian') {
                            this.leapYearMode = 'astronomical';
                        } else if (input === 'algorithmic' && this.calendarType == 'persian') {
                            this.leapYearMode = 'algorithmic';
                        }
                        this.algorithms.updateFromGregorian();
                        return this;
                    }

                    /**
                     * @since 1.0.0
                     * @static
                     * @param input
                     * @return {PersianDateClass}
                     */

                }, {
                    key: 'toCalendar',


                    /**
                     * @since 1.0.0
                     * @param input
                     * @return {PersianDateClass}
                     */
                    value: function toCalendar(input) {
                        this.calendarType = input;
                        this.algorithms.updateFromGregorian();
                        return this;
                    }

                    /**
                     * @since 1.0.0
                     * @static
                     * @param input
                     * @return {PersianDateClass}
                     */

                }, {
                    key: 'toLocale',


                    /**
                     * @since 1.0.0
                     * @param input
                     * @return {PersianDateClass}
                     */
                    value: function toLocale(input) {
                        this.localType = input;
                        if (this.localType !== 'fa') {
                            this.formatPersian = false;
                        } else {
                            this.formatPersian = '_default';
                        }
                        return this;
                    }

                    /**
                     * @return {*}
                     * @private
                     */

                }, {
                    key: '_locale',
                    value: function _locale() {
                        var t = this.calendarType;
                        if (this.localType === 'fa') {
                            if (t === 'persian') {
                                return fa.persian;
                            } else {
                                return fa.gregorian;
                            }
                        } else {
                            if (t === 'persian') {
                                return en.persian;
                            } else {
                                return en.gregorian;
                            }
                        }
                    }

                    /**
                     * @param input
                     * @private
                     */

                }, {
                    key: '_weekName',
                    value: function _weekName(input) {
                        return this._locale().weekdays[input - 1];
                    }

                    /**
                     * @param input
                     * @private
                     */

                }, {
                    key: '_weekNameShort',
                    value: function _weekNameShort(input) {
                        return this._locale().weekdaysShort[input - 1];
                    }

                    /**
                     * @param input
                     * @private
                     */

                }, {
                    key: '_weekNameMin',
                    value: function _weekNameMin(input) {
                        return this._locale().weekdaysMin[input - 1];
                    }

                    /**
                     * @param input
                     * @return {*}
                     * @private
                     */

                }, {
                    key: '_dayName',
                    value: function _dayName(input) {
                        return this._locale().persianDaysName[input - 1];
                    }

                    /**
                     * @param input
                     * @private
                     */

                }, {
                    key: '_monthName',
                    value: function _monthName(input) {
                        return this._locale().months[input - 1];
                    }

                    /**
                     * @param input
                     * @private
                     */

                }, {
                    key: '_monthNameShort',
                    value: function _monthNameShort(input) {
                        return this._locale().monthsShort[input - 1];
                    }

                    /**
                     * @param obj
                     * @returns {boolean}
                     */

                }, {
                    key: 'isPersianDate',


                    /**
                     * @param obj
                     * @return {boolean}
                     */
                    value: function isPersianDate(obj) {
                        return obj instanceof PersianDateClass;
                    }

                    /**
                     * @returns {PersianDate}
                     */

                }, {
                    key: 'clone',
                    value: function clone() {
                        return this._getSyncedClass(this.State.gDate);
                    }

                    /**
                     * @since 1.0.0
                     * @param dateArray
                     * @return {*}
                     */

                }, {
                    key: 'algorithmsCalc',
                    value: function algorithmsCalc(dateArray) {
                        if (this.isPersianDate(dateArray)) {
                            dateArray = [dateArray.year(), dateArray.month(), dateArray.date(), dateArray.hour(), dateArray.minute(), dateArray.second(), dateArray.millisecond()];
                        }
                        if (this.calendarType === 'persian' && this.leapYearMode == 'algorithmic') {
                            return this.algorithms.calcPersian(dateArray);
                        } else if (this.calendarType === 'persian' && this.leapYearMode == 'astronomical') {
                            return this.algorithms.calcPersiana(dateArray);
                        } else if (this.calendarType === 'gregorian') {
                            dateArray[1] = dateArray[1] - 1;
                            return this.algorithms.calcGregorian(dateArray);
                        }
                    }

                    /**
                     * @since 1.0.0
                     * @return {*}
                     */

                }, {
                    key: 'calendar',
                    value: function calendar() {
                        var key = void 0;
                        if (this.calendarType == 'persian') {
                            if (this.leapYearMode == 'astronomical') {
                                key = 'persianAstro';
                            } else if (this.leapYearMode == 'algorithmic') {
                                key = 'persianAlgo';
                            }
                        } else {
                            key = 'gregorian';
                        }
                        return this.State[key];
                    }

                    /**
                     * @description return Duration object
                     * @param input
                     * @param key
                     * @returns {Duration}
                     */

                }, {
                    key: 'duration',


                    /**
                     * @description return Duration object
                     * @param input
                     * @param key
                     * @returns {Duration}
                     */
                    value: function duration(input, key) {
                        return new Duration(input, key);
                    }

                    /**
                     * @description check if passed object is duration
                     * @param obj
                     * @returns {boolean}
                     */

                }, {
                    key: 'isDuration',


                    /**
                     * @description check if passed object is duration
                     * @param obj
                     * @returns {boolean}
                     */
                    value: function isDuration(obj) {
                        return obj instanceof Duration;
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'years',
                    value: function years(input) {
                        return this.year(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'year',
                    value: function year(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([input, this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()]);
                            return this;
                        } else {
                            return this.calendar().year;
                        }
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'month',
                    value: function month(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([this.year(), input, this.date()]);
                            return this;
                        } else {
                            return this.calendar().month + 1;
                        }
                    }

                    /**
                     * Day of week
                     * @returns {Function|Date.toJSON.day|date_json.day|PersianDate.day|day|output.day|*}
                     */

                }, {
                    key: 'days',
                    value: function days() {
                        return this.day();
                    }

                    /**
                     * @returns {Function|Date.toJSON.day|date_json.day|PersianDate.day|day|output.day|*}
                     */

                }, {
                    key: 'day',
                    value: function day() {
                        return this.calendar().weekday;
                    }

                    /**
                     * Day of Months
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'dates',
                    value: function dates(input) {
                        return this.date(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'date',
                    value: function date(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([this.year(), this.month(), input]);
                            return this;
                        } else {
                            return this.calendar().day;
                        }
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'hour',
                    value: function hour(input) {
                        return this.hours(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'hours',
                    value: function hours(input) {
                        if (input || input === 0) {
                            if (input === 0) {
                                input = 24;
                            }
                            this.algorithmsCalc([this.year(), this.month(), this.date(), input]);
                            return this;
                        } else {
                            return this.State.gDate.getHours();
                        }
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'minute',
                    value: function minute(input) {
                        return this.minutes(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'minutes',
                    value: function minutes(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([this.year(), this.month(), this.date(), this.hour(), input]);
                            return this;
                        } else {
                            return this.State.gDate.getMinutes();
                        }
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'second',
                    value: function second(input) {
                        return this.seconds(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'seconds',
                    value: function seconds(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([this.year(), this.month(), this.date(), this.hour(), this.minute(), input]);
                            return this;
                        } else {
                            return this.State.gDate.getSeconds();
                        }
                    }

                    /**
                     * @param input
                     * @returns {*}
                     * Getter Setter
                     */

                }, {
                    key: 'millisecond',
                    value: function millisecond(input) {
                        return this.milliseconds(input);
                    }

                    /**
                     * @param input
                     * @returns {*}
                     */

                }, {
                    key: 'milliseconds',
                    value: function milliseconds(input) {
                        if (input || input === 0) {
                            this.algorithmsCalc([this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), input]);
                            return this;
                        } else {
                            return this.State.gregorian.millisecond;
                        }
                    }

                    /**
                     * Return Milliseconds since the Unix Epoch (1318874398806)
                     * @returns {*}
                     * @private
                     */
                    //    _valueOf () {
                    //        return this.State.gDate.valueOf();
                    //    }


                }, {
                    key: 'unix',


                    /**
                     * Return Unix Timestamp (1318874398)
                     * @param timestamp
                     * @returns {*}
                     */
                    value: function unix(timestamp) {
                        var output = void 0;
                        if (timestamp) {
                            return this._getSyncedClass(timestamp * 1000);
                        } else {
                            var str = this.State.gDate.valueOf().toString();
                            output = str.substring(0, str.length - 3);
                        }
                        return parseInt(output);
                    }

                    /**
                     * @returns {*}
                     */

                }, {
                    key: 'valueOf',
                    value: function valueOf() {
                        return this.State.gDate.valueOf();
                    }

                    /**
                     * @param year
                     * @param month
                     * @returns {*}
                     * @since 1.0.0
                     */

                }, {
                    key: 'getFirstWeekDayOfMonth',


                    /**
                     * @param year
                     * @param month
                     * @returns {*}
                     * @since 1.0.0
                     */
                    value: function getFirstWeekDayOfMonth(year, month) {
                        return this._getSyncedClass([year, month, 1]).day();
                    }

                    /**
                     * @param input
                     * @param val
                     * @param asFloat
                     * @returns {*}
                     */

                }, {
                    key: 'diff',
                    value: function diff(input, val, asFloat) {
                        var self = this,
                            inputMoment = input,
                            zoneDiff = 0,
                            diff = self.State.gDate - inputMoment.toDate() - zoneDiff,
                            year = self.year() - inputMoment.year(),
                            month = self.month() - inputMoment.month(),
                            date = (self.date() - inputMoment.date()) * -1,
                            output = void 0;

                        if (val === 'months' || val === 'month') {
                            output = year * 12 + month + date / 30;
                        } else if (val === 'years' || val === 'year') {
                            output = year + (month + date / 30) / 12;
                        } else {
                            output = val === 'seconds' || val === 'second' ? diff / 1e3 : // 1000
                                val === 'minutes' || val === 'minute' ? diff / 6e4 : // 1000 * 60
                                    val === 'hours' || val === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                                        val === 'days' || val === 'day' ? diff / 864e5 : // 1000 * 60 * 60 * 24
                                            val === 'weeks' || val === 'week' ? diff / 6048e5 : // 1000 * 60 * 60 * 24 * 7
                                                diff;
                        }
                        return asFloat ? output : Math.round(output);
                    }

                    /**
                     * @param key
                     * @returns {*}
                     */

                }, {
                    key: 'startOf',
                    value: function startOf(key) {
                        var syncedCelander = PersianDateClass.toCalendar(this.calendarType).toLocale(this.localType);
                        var newArray = new PersianDateClass(this.valueOf() - (this.calendar().weekday - 1) * 86400000).toArray();
                        // Simplify this\
                        /* jshint ignore:start */
                        switch (key) {
                            case 'years':
                            case 'year':
                                return new syncedCelander([this.year(), 1, 1]);
                            case 'months':
                            case 'month':
                                return new syncedCelander([this.year(), this.month(), 1]);
                            case 'days':
                            case 'day':
                                return new syncedCelander([this.year(), this.month(), this.date(), 0, 0, 0]);
                            case 'hours':
                            case 'hour':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), 0, 0]);
                            case 'minutes':
                            case 'minute':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), this.minutes(), 0]);
                            case 'seconds':
                            case 'second':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), this.minutes(), this.seconds()]);
                            case 'weeks':
                            case 'week':
                                return new syncedCelander(newArray);
                            default:
                                return this.clone();
                        }
                        /* jshint ignore:end */
                    }

                    /**
                     * @param key
                     * @returns {*}
                     */
                    /* eslint-disable no-case-declarations */

                }, {
                    key: 'endOf',
                    value: function endOf(key) {
                        var syncedCelander = PersianDateClass.toCalendar(this.calendarType).toLocale(this.localType);
                        // Simplify this
                        switch (key) {
                            case 'years':
                            case 'year':
                                var days = this.isLeapYear() ? 30 : 29;
                                return new syncedCelander([this.year(), 12, days, 23, 59, 59]);
                            case 'months':
                            case 'month':
                                var monthDays = this.daysInMonth(this.year(), this.month());
                                return new syncedCelander([this.year(), this.month(), monthDays, 23, 59, 59]);
                            case 'days':
                            case 'day':
                                return new syncedCelander([this.year(), this.month(), this.date(), 23, 59, 59]);
                            case 'hours':
                            case 'hour':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), 59, 59]);
                            case 'minutes':
                            case 'minute':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), this.minutes(), 59]);
                            case 'seconds':
                            case 'second':
                                return new syncedCelander([this.year(), this.month(), this.date(), this.hours(), this.minutes(), this.seconds()]);
                            case 'weeks':
                            case 'week':
                                var weekDayNumber = this.calendar().weekday;
                                return new syncedCelander([this.year(), this.month(), this.date() + (7 - weekDayNumber)]);
                            default:
                                return this.clone();
                        }
                        /* eslint-enable no-case-declarations */
                    }

                    /**
                     * @returns {*}
                     */

                }, {
                    key: 'sod',
                    value: function sod() {
                        return this.startOf('day');
                    }

                    /**
                     * @returns {*}
                     */

                }, {
                    key: 'eod',
                    value: function eod() {
                        return this.endOf('day');
                    }

                    /** Get the timezone offset in minutes.
                     * @return {*}
                     */

                }, {
                    key: 'zone',
                    value: function zone(input) {
                        if (input || input === 0) {
                            this.State.zone = input;
                            return this;
                        } else {
                            return this.State.zone;
                        }
                    }

                    /**
                     * @returns {PersianDate}
                     */

                }, {
                    key: 'local',
                    value: function local() {
                        var utcStamp = void 0;
                        if (this._utcMode) {
                            var ThatDayOffset = new Date(this.toDate()).getTimezoneOffset();
                            var offsetMils = ThatDayOffset * 60 * 1000;
                            if (ThatDayOffset < 0) {
                                utcStamp = this.valueOf() - offsetMils;
                            } else {
                                /* istanbul ignore next */
                                utcStamp = this.valueOf() + offsetMils;
                            }
                            this.toCalendar(PersianDateClass.calendarType);
                            var utcDate = new Date(utcStamp);
                            this._gDateToCalculators(utcDate);
                            this._utcMode = false;
                            this.zone(ThatDayOffset);
                            return this;
                        } else {
                            return this;
                        }
                    }

                    /**
                     * @param input
                     * @return {*}
                     */

                }, {
                    key: 'utc',


                    /**
                     * @description Current date/time in UTC mode
                     * @param input
                     * @returns {*}
                     */
                    value: function utc(input) {
                        var utcStamp = void 0;
                        if (input) {
                            return this._getSyncedClass(input).utc();
                        }
                        if (this._utcMode) {
                            return this;
                        } else {
                            var offsetMils = this.zone() * 60 * 1000;
                            if (this.zone() < 0) {
                                utcStamp = this.valueOf() + offsetMils;
                            } else {
                                /* istanbul ignore next */
                                utcStamp = this.valueOf() - offsetMils;
                            }
                            var utcDate = new Date(utcStamp),
                                d = this._getSyncedClass(utcDate);
                            this.algorithmsCalc(d);
                            this._utcMode = true;
                            this.zone(0);
                            return this;
                        }
                    }

                    /**
                     * @returns {boolean}
                     */

                }, {
                    key: 'isUtc',
                    value: function isUtc() {
                        return this._utcMode;
                    }

                    /**
                     * @returns {boolean}
                     * @link https://fa.wikipedia.org/wiki/%D8%B3%D8%A7%D8%B9%D8%AA_%D8%AA%D8%A7%D8%A8%D8%B3%D8%AA%D8%A7%D9%86%DB%8C
                     */

                }, {
                    key: 'isDST',
                    value: function isDST() {
                        var month = this.month(),
                            day = this.date();
                        if (month == 1 && day > 1 || month == 6 && day < 31 || month < 6 && month >= 2) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    /**
                     * @returns {boolean}
                     */

                }, {
                    key: 'isLeapYear',
                    value: function isLeapYear(year) {
                        if (year === undefined) {
                            year = this.year();
                        }
                        if (this.calendarType == 'persian' && this.leapYearMode === 'algorithmic') {
                            return this.algorithms.leap_persian(year);
                        }
                        if (this.calendarType == 'persian' && this.leapYearMode === 'astronomical') {
                            return this.algorithms.leap_persiana(year);
                        } else if (this.calendarType == 'gregorian') {
                            return this.algorithms.leap_gregorian(year);
                        }
                    }

                    /**
                     * @param yearInput
                     * @param monthInput
                     * @returns {number}
                     */

                }, {
                    key: 'daysInMonth',
                    value: function daysInMonth(yearInput, monthInput) {
                        var year = yearInput ? yearInput : this.year(),
                            month = monthInput ? monthInput : this.month();
                        if (this.calendarType === 'persian') {
                            if (month < 1 || month > 12) return 0;
                            if (month < 7) return 31;
                            if (month < 12) return 30;
                            if (this.isLeapYear(year)) {
                                return 30;
                            }
                            return 29;
                        }
                        if (this.calendarType === 'gregorian') {
                            return new Date(year, month, 0).getDate();
                        }
                    }

                    /**
                     * @description Return Native Javascript Date
                     * @returns {*|PersianDate.gDate}
                     */

                }, {
                    key: 'toDate',
                    value: function toDate() {
                        return this.State.gDate;
                    }

                    /**
                     * @description Returns Array Of Persian Date
                     * @returns {array}
                     */

                }, {
                    key: 'toArray',
                    value: function toArray() {
                        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
                    }

                    /**
                     * @returns {*}
                     */

                }, {
                    key: 'formatNumber',
                    value: function formatNumber() {
                        var output = void 0,
                            self = this;

                        // if default conf dosent set follow golbal config
                        if (this.formatPersian === '_default') {
                            if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
                                /* istanbul ignore next */
                                if (self.formatPersian === false) {
                                    output = false;
                                } else {
                                    // Default Conf
                                    output = true;
                                }
                            }
                            /* istanbul ignore next */
                            else {
                                if (window.formatPersian === false) {
                                    output = false;
                                } else {
                                    // Default Conf
                                    output = true;
                                }
                            }
                        } else {
                            if (this.formatPersian === true) {
                                output = true;
                            } else if (this.formatPersian === false) {
                                output = false;
                            } else {
                                Error('Invalid Config "formatPersian" !!');
                            }
                        }
                        return output;
                    }

                    /**
                     * @param inputString
                     * @returns {*}
                     */

                }, {
                    key: 'format',
                    value: function format(inputString) {
                        if (this.State.isInvalidDate) {
                            return false;
                        }
                        var self = this,
                            formattingTokens = /([[^[]*])|(\\)?(Mo|MM?M?M?|Do|DD?D?D?|dddddd?|ddddd?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|X|LT|ll?l?l?|LL?L?L?)/g,
                            info = {
                                year: self.year(),
                                month: self.month(),
                                hour: self.hours(),
                                minute: self.minutes(),
                                second: self.seconds(),
                                date: self.date(),
                                timezone: self.zone(),
                                unix: self.unix()
                            },
                            formatToPersian = self.formatNumber();

                        var checkPersian = function checkPersian(i) {
                            if (formatToPersian) {
                                return toPersianDigit(i);
                            } else {
                                return i;
                            }
                        };

                        /* jshint ignore:start */
                        function replaceFunction(input) {
                            switch (input) {
                                // AM/PM
                                case 'a':
                                    {
                                        if (formatToPersian) return info.hour >= 12 ? 'ب ظ' : 'ق ظ'; else return info.hour >= 12 ? 'PM' : 'AM';
                                    }
                                // Hours (Int)
                                case 'H':
                                    {
                                        return checkPersian(info.hour);
                                    }
                                case 'HH':
                                    {
                                        return checkPersian(leftZeroFill(info.hour, 2));
                                    }
                                case 'h':
                                    {
                                        return checkPersian(info.hour % 12);
                                    }
                                case 'hh':
                                    {
                                        return checkPersian(leftZeroFill(info.hour % 12, 2));
                                    }
                                // Minutes
                                case 'm':
                                    {
                                        return checkPersian(leftZeroFill(info.minute, 2));
                                    }
                                // Two Digit Minutes
                                case 'mm':
                                    {
                                        return checkPersian(leftZeroFill(info.minute, 2));
                                    }
                                // Second
                                case 's':
                                    {
                                        return checkPersian(info.second);
                                    }
                                case 'ss':
                                    {
                                        return checkPersian(leftZeroFill(info.second, 2));
                                    }
                                // Day (Int)
                                case 'D':
                                    {
                                        return checkPersian(leftZeroFill(info.date));
                                    }
                                // Return Two Digit
                                case 'DD':
                                    {
                                        return checkPersian(leftZeroFill(info.date, 2));
                                    }
                                // Return day Of Month
                                case 'DDD':
                                    {
                                        var t = self.startOf('year');
                                        return checkPersian(leftZeroFill(self.diff(t, 'days'), 3));
                                    }
                                // Return Day of Year
                                case 'DDDD':
                                    {
                                        var _t = self.startOf('year');
                                        return checkPersian(leftZeroFill(self.diff(_t, 'days'), 3));
                                    }
                                // Return day Of week
                                case 'd':
                                    {
                                        return checkPersian(self.calendar().weekday);
                                    }
                                // Return week day name abbr
                                case 'ddd':
                                    {
                                        return self._weekNameShort(self.calendar().weekday);
                                    }
                                case 'dddd':
                                    {
                                        return self._weekName(self.calendar().weekday);
                                    }
                                // Return Persian Day Name
                                case 'ddddd':
                                    {
                                        return self._dayName(self.calendar().day);
                                    }
                                // Return Persian Day Name
                                case 'dddddd':
                                    {
                                        return self._weekNameMin(self.calendar().weekday);
                                    }
                                // Return Persian Day Name
                                case 'w':
                                    {
                                        var _t2 = self.startOf('year'),
                                            day = parseInt(self.diff(_t2, 'days') / 7) + 1;
                                        return checkPersian(day);
                                    }
                                // Return Persian Day Name
                                case 'ww':
                                    {
                                        var _t3 = self.startOf('year'),
                                            _day = leftZeroFill(parseInt(self.diff(_t3, 'days') / 7) + 1, 2);
                                        return checkPersian(_day);
                                    }
                                // Month  (Int)
                                case 'M':
                                    {
                                        return checkPersian(info.month);
                                    }
                                // Two Digit Month (Str)
                                case 'MM':
                                    {
                                        return checkPersian(leftZeroFill(info.month, 2));
                                    }
                                // Abbr String of Month (Str)
                                case 'MMM':
                                    {
                                        return self._monthNameShort(info.month);
                                    }
                                // Full String name of Month (Str)
                                case 'MMMM':
                                    {
                                        return self._monthName(info.month);
                                    }
                                // Year
                                // Two Digit Year (Str)
                                case 'YY':
                                    {
                                        var yearDigitArray = info.year.toString().split('');
                                        return checkPersian(yearDigitArray[2] + yearDigitArray[3]);
                                    }
                                // Full Year (Int)
                                case 'YYYY':
                                    {
                                        return checkPersian(info.year);
                                    }
                                /* istanbul ignore next */
                                case 'Z':
                                    {
                                        var flag = '+',
                                            hours = Math.round(info.timezone / 60),
                                            minutes = info.timezone % 60;

                                        if (minutes < 0) {
                                            minutes *= -1;
                                        }
                                        if (hours < 0) {
                                            flag = '-';
                                            hours *= -1;
                                        }

                                        var z = flag + leftZeroFill(hours, 2) + ':' + leftZeroFill(minutes, 2);
                                        return checkPersian(z);
                                    }
                                /* istanbul ignore next */
                                case 'ZZ':
                                    {
                                        var _flag = '+',
                                            _hours = Math.round(info.timezone / 60),
                                            _minutes = info.timezone % 60;

                                        if (_minutes < 0) {
                                            _minutes *= -1;
                                        }
                                        if (_hours < 0) {
                                            _flag = '-';
                                            _hours *= -1;
                                        }
                                        var _z = _flag + leftZeroFill(_hours, 2) + '' + leftZeroFill(_minutes, 2);
                                        return checkPersian(_z);
                                    }
                                /* istanbul ignore next */
                                case 'X':
                                    {
                                        return self.unix();
                                    }
                                // 8:30 PM
                                case 'LT':
                                    {
                                        return self.format('H:m a');
                                    }
                                // 09/04/1986
                                case 'L':
                                    {
                                        return self.format('YYYY/MM/DD');
                                    }
                                // 9/4/1986
                                case 'l':
                                    {
                                        return self.format('YYYY/M/D');
                                    }
                                // September 4th 1986
                                case 'LL':
                                    {
                                        return self.format('MMMM DD YYYY');
                                    }
                                // Sep 4 1986
                                case 'll':
                                    {
                                        return self.format('MMM DD YYYY');
                                    }
                                //September 4th 1986 8:30 PM
                                case 'LLL':
                                    {
                                        return self.format('MMMM YYYY DD   H:m  a');
                                    }
                                // Sep 4 1986 8:30 PM
                                case 'lll':
                                    {
                                        return self.format('MMM YYYY DD   H:m  a');
                                    }
                                //Thursday, September 4th 1986 8:30 PM
                                case 'LLLL':
                                    {
                                        return self.format('dddd D MMMM YYYY  H:m  a');
                                    }
                                // Thu, Sep 4 1986 8:30 PM
                                case 'llll':
                                    {
                                        return self.format('ddd D MMM YYYY  H:m  a');
                                    }
                            }
                        }

                        /* jshint ignore:end */

                        if (inputString) {
                            return inputString.replace(formattingTokens, replaceFunction);
                        } else {
                            var _inputString = 'YYYY-MM-DD HH:mm:ss a';
                            return _inputString.replace(formattingTokens, replaceFunction);
                        }
                    }

                    /**
                     * @param key
                     * @param value
                     * @returns {PersianDate}
                     */

                }, {
                    key: 'add',
                    value: function add(key, value) {
                        if (value === 0) {
                            return this;
                        }
                        var unit = normalizeDuration(key, value).unit,
                            arr = this.toArray();
                        value = normalizeDuration(key, value).value;
                        if (unit === 'year') {
                            var normalizedDate = arr[2],
                                monthDays = this.daysInMonth(arr[0] + value, arr[1]);
                            if (arr[2] > monthDays) {
                                normalizedDate = monthDays;
                            }
                            var tempDate = new PersianDateClass([arr[0] + value, arr[1], normalizedDate, arr[3], arr[4], arr[5], arr[6], arr[7]]);
                            return tempDate;
                        }
                        if (unit === 'month') {
                            var tempYear = Math.floor(value / 12);
                            var remainingMonth = value - tempYear * 12,
                                calcedMonth = null;
                            if (arr[1] + remainingMonth > 12) {
                                tempYear += 1;
                                calcedMonth = arr[1] + remainingMonth - 12;
                            } else {
                                calcedMonth = arr[1] + remainingMonth;
                            }
                            var normalizaedDate = arr[2],
                                tempDateArray = new PersianDateClass([arr[0] + tempYear, calcedMonth, 1, arr[3], arr[4], arr[5], arr[6], arr[7]]).toArray(),
                                _monthDays = this.daysInMonth(arr[0] + tempYear, calcedMonth);
                            if (arr[2] > _monthDays) {
                                normalizaedDate = _monthDays;
                            }
                            return new PersianDateClass([tempDateArray[0], tempDateArray[1], normalizaedDate, tempDateArray[3], tempDateArray[4], tempDateArray[5], tempDateArray[6], tempDateArray[7]]);
                        }
                        if (unit === 'day') {
                            var calcedDay = new PersianDateClass(this.valueOf()).hour(12),
                                newMillisecond = calcedDay.valueOf() + value * 86400000,
                                newDate = new PersianDateClass(newMillisecond);
                            return newDate.hour(arr[3]);
                        }
                        if (unit === 'week') {
                            var _calcedDay = new PersianDateClass(this.valueOf()).hour(12),
                                _newMillisecond = _calcedDay.valueOf() + 7 * value * 86400000,
                                _newDate = new PersianDateClass(_newMillisecond);
                            return _newDate.hour(arr[3]);
                        }
                        if (unit === 'hour') {
                            var _newMillisecond2 = this.valueOf() + value * 3600000;
                            return this.unix(_newMillisecond2 / 1000);
                        }
                        if (unit === 'minute') {
                            var _newMillisecond3 = this.valueOf() + value * 60000;
                            return this.unix(_newMillisecond3 / 1000);
                        }
                        if (unit === 'second') {
                            var _newMillisecond4 = this.valueOf() + value * 1000;
                            return this.unix(_newMillisecond4 / 1000);
                        }
                        if (unit === 'millisecond') {
                            var _newMillisecond5 = this.valueOf() + value;
                            return this.unix(_newMillisecond5 / 1000);
                        }
                        return this._getSyncedClass(this.valueOf());
                    }

                    /**
                     * @param key
                     * @param value
                     * @returns {PersianDate}
                     */

                }, {
                    key: 'subtract',
                    value: function subtract(key, value) {
                        return this.add(key, value * -1);
                    }

                    /**
                     * check if a date is same as b
                     * @param dateA
                     * @param dateB
                     * @since 1.0.0
                     * @return {boolean}
                     * @static
                     */

                }, {
                    key: 'isSameDay',


                    /**
                     * @param dateB
                     * @since 1.0.0
                     * @return {PersianDateClass|*|boolean}
                     */
                    value: function isSameDay(dateB) {
                        return this && dateB && this.date() == dateB.date() && this.year() == dateB.year() && this.month() == dateB.month();
                    }

                    /**
                     * @desc check if a month is same as b
                     * @param {Date} dateA
                     * @param {Date} dateB
                     * @return {boolean}
                     * @since 1.0.0
                     * @static
                     */

                }, {
                    key: 'isSameMonth',


                    /**
                     * @desc check two for month similarity
                     * @param dateA
                     * @param dateB
                     * @since 1.0.0
                     * @return {*|boolean}
                     */
                    value: function isSameMonth(dateB) {
                        return this && dateB && this.year() == this.year() && this.month() == dateB.month();
                    }
                }], [{
                    key: 'rangeName',
                    value: function rangeName() {
                        var p = PersianDateClass,
                            t = p.calendarType;
                        if (p.localType === 'fa') {
                            if (t === 'persian') {
                                return fa.persian;
                            } else {
                                return fa.gregorian;
                            }
                        } else {
                            if (t === 'persian') {
                                return en.persian;
                            } else {
                                return en.gregorian;
                            }
                        }
                    }
                }, {
                    key: 'toLeapYearMode',
                    value: function toLeapYearMode(input) {
                        var d = PersianDateClass;
                        d.leapYearMode = input;
                        return d;
                    }
                }, {
                    key: 'toCalendar',
                    value: function toCalendar(input) {
                        var d = PersianDateClass;
                        d.calendarType = input;
                        return d;
                    }

                    /**
                     * @since 1.0.0
                     * @static
                     * @param input
                     * @return {PersianDateClass}
                     */

                }, {
                    key: 'toLocale',
                    value: function toLocale(input) {
                        var d = PersianDateClass;
                        d.localType = input;
                        if (d.localType !== 'fa') {
                            d.formatPersian = false;
                        } else {
                            d.formatPersian = '_default';
                        }
                        return d;
                    }
                }, {
                    key: 'isPersianDate',
                    value: function isPersianDate(obj) {
                        return obj instanceof PersianDateClass;
                    }
                }, {
                    key: 'duration',
                    value: function duration(input, key) {
                        return new Duration(input, key);
                    }
                }, {
                    key: 'isDuration',
                    value: function isDuration(obj) {
                        return obj instanceof Duration;
                    }
                }, {
                    key: 'unix',
                    value: function unix(timestamp) {
                        if (timestamp) {
                            return new PersianDateClass(timestamp * 1000);
                        } else {
                            return new PersianDateClass().unix();
                        }
                    }
                }, {
                    key: 'getFirstWeekDayOfMonth',
                    value: function getFirstWeekDayOfMonth(year, month) {
                        return new PersianDateClass([year, month, 1]).day();
                    }
                }, {
                    key: 'utc',
                    value: function utc(input) {
                        if (input) {
                            return new PersianDateClass(input).utc();
                        } else {
                            return new PersianDateClass().utc();
                        }
                    }
                }, {
                    key: 'isSameDay',
                    value: function isSameDay(dateA, dateB) {
                        return dateA && dateB && dateA.date() == dateB.date() && dateA.year() == dateB.year() && dateA.month() == dateB.month();
                    }
                }, {
                    key: 'isSameMonth',
                    value: function isSameMonth(dateA, dateB) {
                        return dateA && dateB && dateA.year() == dateB.year() && dateA.month() == dateB.month();
                    }
                }]);

                return PersianDateClass;
            }();

            /**
             * @type {PersianDateClass}
             */


            module.exports = PersianDateClass;

            /***/
        }),
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            // Start algorithm class
            var ASTRO = __webpack_require__(3);
            var State = __webpack_require__(9);

            var Algorithms = function () {
                function Algorithms(parent) {
                    _classCallCheck(this, Algorithms);

                    this.parent = parent;
                    this.ASTRO = new ASTRO();
                    this.State = new State();
                    /*  You may notice that a variety of array variables logically local
                     to functions are declared globally here.  In JavaScript, construction
                     of an array variable from source code occurs as the code is
                     interpreted.  Making these variables pseudo-globals permits us
                     to avoid overhead constructing and disposing of them in each
                     call on the function in which whey are used.  */
                    // TODO this block didnt used in main agorithm
                    this.J0000 = 1721424.5; // Julian date of Gregorian epoch: 0000-01-01
                    this.J1970 = 2440587.5; // Julian date at Unix epoch: 1970-01-01
                    this.JMJD = 2400000.5; // Epoch of Modified Julian Date system
                    this.NormLeap = [false /*"Normal year"*/, true /*"Leap year"*/];
                    // TODO END
                    this.GREGORIAN_EPOCH = 1721425.5;
                    this.PERSIAN_EPOCH = 1948320.5;
                }

                /**
                 * @desc LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?
                 * @param year
                 * @return {boolean}
                 */


                _createClass(Algorithms, [{
                    key: 'leap_gregorian',
                    value: function leap_gregorian(year) {
                        return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
                    }

                    /**
                     * @desc Determine Julian day number from Gregorian calendar date
                     * @param {*} year
                     * @param {*} month
                     * @param {*} day
                     */

                }, {
                    key: 'gregorian_to_jd',
                    value: function gregorian_to_jd(year, month, day) {
                        return this.GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) + -Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : this.leap_gregorian(year) ? -1 : -2) + day);
                    }

                    /**
                     * @desc Calculate Gregorian calendar date from Julian day
                     * @param {*} jd
                     */

                }, {
                    key: 'jd_to_gregorian',
                    value: function jd_to_gregorian(jd) {
                        var wjd = void 0,
                            depoch = void 0,
                            quadricent = void 0,
                            dqc = void 0,
                            cent = void 0,
                            dcent = void 0,
                            quad = void 0,
                            dquad = void 0,
                            yindex = void 0,
                            year = void 0,
                            yearday = void 0,
                            leapadj = void 0,
                            month = void 0,
                            day = void 0;

                        wjd = Math.floor(jd - 0.5) + 0.5;
                        depoch = wjd - this.GREGORIAN_EPOCH;
                        quadricent = Math.floor(depoch / 146097);
                        dqc = this.ASTRO.mod(depoch, 146097);
                        cent = Math.floor(dqc / 36524);
                        dcent = this.ASTRO.mod(dqc, 36524);
                        quad = Math.floor(dcent / 1461);
                        dquad = this.ASTRO.mod(dcent, 1461);
                        yindex = Math.floor(dquad / 365);
                        year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
                        if (!(cent === 4 || yindex === 4)) {
                            year++;
                        }
                        yearday = wjd - this.gregorian_to_jd(year, 1, 1);
                        leapadj = wjd < this.gregorian_to_jd(year, 3, 1) ? 0 : this.leap_gregorian(year) ? 1 : 2;
                        month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
                        day = wjd - this.gregorian_to_jd(year, month, 1) + 1;

                        return [year, month, day];
                    }

                    /**
                     * @param {*} year
                     */
                    //    leap_julian (year) {
                    //        return this.ASTRO.mod(year, 4) === ((year > 0) ? 0 : 3);
                    //    }


                    /**
                     * @desc Calculate Julian calendar date from Julian day
                     * @param {*} td
                     */
                    //    jd_to_julian (td) {
                    //        let z, a, b, c, d, e, year, month, day;
                    //
                    //        td += 0.5;
                    //        z = Math.floor(td);
                    //
                    //        a = z;
                    //        b = a + 1524;
                    //        c = Math.floor((b - 122.1) / 365.25);
                    //        d = Math.floor(365.25 * c);
                    //        e = Math.floor((b - d) / 30.6001);
                    //
                    //        month = Math.floor((e < 14) ? (e - 1) : (e - 13));
                    //        year = Math.floor((month > 2) ? (c - 4716) : (c - 4715));
                    //        day = b - d - Math.floor(30.6001 * e);
                    //
                    //        /*  If year is less than 1, subtract one to convert from
                    //         a zero based date system to the common era system in
                    //         which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).  */
                    //
                    //        if (year < 1) {
                    //            year--;
                    //        }
                    //
                    //        return [year, month, day];
                    //    }


                    /**
                     * @desc TEHRAN_EQUINOX  --  Determine Julian day and fraction of the
                     March equinox at the Tehran meridian in
                     a given Gregorian year.
                     * @param {*} year
                     */

                }, {
                    key: 'tehran_equinox',
                    value: function tehran_equinox(year) {
                        var equJED = void 0,
                            equJD = void 0,
                            equAPP = void 0,
                            equTehran = void 0,
                            dtTehran = void 0;

                        //  March equinox in dynamical time
                        equJED = this.ASTRO.equinox(year, 0);

                        //  Correct for delta T to obtain Universal time
                        equJD = equJED - this.ASTRO.deltat(year) / (24 * 60 * 60);

                        //  Apply the equation of time to yield the apparent time at Greenwich
                        equAPP = equJD + this.ASTRO.equationOfTime(equJED);

                        /*  Finally, we must correct for the constant difference between
                         the Greenwich meridian andthe time zone standard for
                         Iran Standard time, 52°30' to the East.  */

                        dtTehran = (52 + 30 / 60.0 + 0 / (60.0 * 60.0)) / 360;
                        equTehran = equAPP + dtTehran;

                        return equTehran;
                    }

                    /**
                     * @desc TEHRAN_EQUINOX_JD  --  Calculate Julian day during which the
                     March equinox, reckoned from the Tehran
                     meridian, occurred for a given Gregorian
                     year.
                     * @param {*} year
                     */

                }, {
                    key: 'tehran_equinox_jd',
                    value: function tehran_equinox_jd(year) {
                        var ep = void 0,
                            epg = void 0;

                        ep = this.tehran_equinox(year);
                        epg = Math.floor(ep);

                        return epg;
                    }

                    /**
                     * @desc  PERSIANA_YEAR  --  Determine the year in the Persian
                     astronomical calendar in which a
                     given Julian day falls.  Returns an
                     array of two elements:
                      [0]  Persian year
                     [1]  Julian day number containing
                     equinox for this year.
                     * @param {*} jd
                     */

                }, {
                    key: 'persiana_year',
                    value: function persiana_year(jd) {
                        var guess = this.jd_to_gregorian(jd)[0] - 2,
                            lasteq = void 0,
                            nexteq = void 0,
                            adr = void 0;

                        lasteq = this.tehran_equinox_jd(guess);
                        while (lasteq > jd) {
                            guess--;
                            lasteq = this.tehran_equinox_jd(guess);
                        }
                        nexteq = lasteq - 1;
                        while (!(lasteq <= jd && jd < nexteq)) {
                            lasteq = nexteq;
                            guess++;
                            nexteq = this.tehran_equinox_jd(guess);
                        }
                        adr = Math.round((lasteq - this.PERSIAN_EPOCH) / this.ASTRO.TropicalYear) + 1;

                        return [adr, lasteq];
                    }

                    /**
                     * @desc Calculate date in the Persian astronomical
                     calendar from Julian day.
                     * @param {*} jd
                     */

                }, {
                    key: 'jd_to_persiana',
                    value: function jd_to_persiana(jd) {
                        var year = void 0,
                            month = void 0,
                            day = void 0,
                            adr = void 0,
                            equinox = void 0,
                            yday = void 0;

                        jd = Math.floor(jd) + 0.5;
                        adr = this.persiana_year(jd);
                        year = adr[0];
                        equinox = adr[1];
                        day = Math.floor((jd - equinox) / 30) + 1;

                        yday = Math.floor(jd) - this.persiana_to_jd(year, 1, 1) + 1;
                        month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
                        day = Math.floor(jd) - this.persiana_to_jd(year, month, 1) + 1;

                        return [year, month, day];
                    }

                    /**
                     * @desc Obtain Julian day from a given Persian
                     astronomical calendar date.
                     * @param {*} year
                     * @param {*} month
                     * @param {*} day
                     */

                }, {
                    key: 'persiana_to_jd',
                    value: function persiana_to_jd(year, month, day) {
                        var adr = void 0,
                            equinox = void 0,
                            guess = void 0,
                            jd = void 0;

                        guess = this.PERSIAN_EPOCH - 1 + this.ASTRO.TropicalYear * (year - 1 - 1);
                        adr = [year - 1, 0];

                        while (adr[0] < year) {
                            adr = this.persiana_year(guess);
                            guess = adr[1] + (this.ASTRO.TropicalYear + 2);
                        }
                        equinox = adr[1];

                        jd = equinox + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + (day - 1);
                        return jd;
                    }

                    /**
                     * @desc Is a given year a leap year in the Persian astronomical calendar ?
                     * @param {*} year
                     */

                }, {
                    key: 'leap_persiana',
                    value: function leap_persiana(year) {
                        return this.persiana_to_jd(year + 1, 1, 1) - this.persiana_to_jd(year, 1, 1) > 365;
                    }

                    /**
                     * @desc Is a given year a leap year in the Persian calendar ?
                     * also nasa use this algorithm https://eclipse.gsfc.nasa.gov/SKYCAL/algorithm.js search for 'getLastDayOfPersianMonth' and you can find it
                     * @param {*} year
                     *
                     */

                }, {
                    key: 'leap_persian',
                    value: function leap_persian(year) {
                        return ((year - (year > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
                    }

                    /**
                     * @desc Determine Julian day from Persian date
                     * @param {*} year
                     * @param {*} month
                     * @param {*} day
                     */

                }, {
                    key: 'persian_to_jd',
                    value: function persian_to_jd(year, month, day) {
                        var epbase = void 0,
                            epyear = void 0;

                        epbase = year - (year >= 0 ? 474 : 473);
                        epyear = 474 + this.ASTRO.mod(epbase, 2820);

                        return day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + Math.floor((epyear * 682 - 110) / 2816) + (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983 + (this.PERSIAN_EPOCH - 1);
                    }

                    /**
                     * @desc Calculate Persian date from Julian day
                     * @param {*} jd
                     */

                }, {
                    key: 'jd_to_persian',
                    value: function jd_to_persian(jd) {
                        var year = void 0,
                            month = void 0,
                            day = void 0,
                            depoch = void 0,
                            cycle = void 0,
                            cyear = void 0,
                            ycycle = void 0,
                            aux1 = void 0,
                            aux2 = void 0,
                            yday = void 0;

                        jd = Math.floor(jd) + 0.5;

                        depoch = jd - this.persian_to_jd(475, 1, 1);
                        cycle = Math.floor(depoch / 1029983);
                        cyear = this.ASTRO.mod(depoch, 1029983);
                        if (cyear === 1029982) {
                            ycycle = 2820;
                        } else {
                            aux1 = Math.floor(cyear / 366);
                            aux2 = this.ASTRO.mod(cyear, 366);
                            ycycle = Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
                        }
                        year = ycycle + 2820 * cycle + 474;
                        if (year <= 0) {
                            year--;
                        }
                        yday = jd - this.persian_to_jd(year, 1, 1) + 1;
                        month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
                        day = jd - this.persian_to_jd(year, month, 1) + 1;
                        return [year, month, day];
                    }

                    /**
                     *
                     * @param {*} weekday
                     */

                }, {
                    key: 'gWeekDayToPersian',
                    value: function gWeekDayToPersian(weekday) {
                        if (weekday + 2 === 8) {
                            return 1;
                        } else if (weekday + 2 === 7) {
                            return 7;
                        } else {
                            return weekday + 2;
                        }
                    }

                    /**
                     * @desc updateFromGregorian  --  Update all calendars from Gregorian.
                     "Why not Julian date?" you ask.  Because
                     starting from Gregorian guarantees we're
                     already snapped to an integral second, so
                     we don't get roundoff errors in other
                     calendars.
                     */

                }, {
                    key: 'updateFromGregorian',
                    value: function updateFromGregorian() {
                        var j = void 0,
                            year = void 0,
                            mon = void 0,
                            mday = void 0,
                            hour = void 0,
                            min = void 0,
                            sec = void 0,
                            weekday = void 0,
                            utime = void 0,
                            perscal = void 0;

                        year = this.State.gregorian.year;
                        mon = this.State.gregorian.month;
                        mday = this.State.gregorian.day;
                        hour = 0; //this.State.gregorian.hour;
                        min = 0; //this.State.gregorian.minute;
                        sec = 0; //this.State.gregorian.second;

                        this.State.gDate = new Date(year, mon, mday, this.State.gregorian.hour, this.State.gregorian.minute, this.State.gregorian.second, this.State.gregorian.millisecond);

                        if (this.parent._utcMode === false) {
                            this.State.zone = this.State.gDate.getTimezoneOffset();
                        }

                        // Added for this algorithms cant parse 2016,13,32 successfully
                        this.State.gregorian.year = this.State.gDate.getFullYear();
                        this.State.gregorian.month = this.State.gDate.getMonth();
                        this.State.gregorian.day = this.State.gDate.getDate();

                        //  Update Julian day
                        // ---------------------------------------------------------------------------
                        j = this.gregorian_to_jd(year, mon + 1, mday) + Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0;

                        this.State.julianday = j;
                        this.State.modifiedjulianday = j - this.JMJD;

                        //  Update day of week in Gregorian box
                        // ---------------------------------------------------------------------------
                        weekday = this.ASTRO.jwday(j);
                        // Move to 1 indexed number
                        this.State.gregorian.weekday = weekday + 1;

                        //  Update leap year status in Gregorian box
                        // ---------------------------------------------------------------------------
                        this.State.gregorian.leap = this.NormLeap[this.leap_gregorian(year) ? 1 : 0];

                        //  Update Julian Calendar
                        // ---------------------------------------------------------------------------
                        //        julcal = this.jd_to_julian(j);
                        //
                        //        this.State.juliancalendar.year = julcal[0];
                        //        this.State.juliancalendar.month = julcal[1] - 1;
                        //        this.State.juliancalendar.day = julcal[2];
                        //        this.State.juliancalendar.leap = this.NormLeap[this.leap_julian(julcal[0]) ? 1 : 0];
                        weekday = this.ASTRO.jwday(j);
                        //        this.State.juliancalendar.weekday = weekday;

                        //  Update Persian Calendar
                        // ---------------------------------------------------------------------------
                        if (this.parent.calendarType == 'persian' && this.parent.leapYearMode == 'algorithmic') {
                            perscal = this.jd_to_persian(j);
                            this.State.persian.year = perscal[0];
                            this.State.persian.month = perscal[1] - 1;
                            this.State.persian.day = perscal[2];
                            this.State.persian.weekday = this.gWeekDayToPersian(weekday);
                            this.State.persian.leap = this.NormLeap[this.leap_persian(perscal[0]) ? 1 : 0];
                        }

                        //  Update Persian Astronomical Calendar
                        // ---------------------------------------------------------------------------
                        if (this.parent.calendarType == 'persian' && this.parent.leapYearMode == 'astronomical') {
                            perscal = this.jd_to_persiana(j);
                            this.State.persianAstro.year = perscal[0];
                            this.State.persianAstro.month = perscal[1] - 1;
                            this.State.persianAstro.day = perscal[2];
                            this.State.persianAstro.weekday = this.gWeekDayToPersian(weekday);
                            this.State.persianAstro.leap = this.NormLeap[this.leap_persiana(perscal[0]) ? 1 : 0];
                        }
                        //  Update Gregorian serial number
                        // ---------------------------------------------------------------------------
                        if (this.State.gregserial.day !== null) {
                            this.State.gregserial.day = j - this.J0000;
                        }

                        //  Update Unix time()
                        // ---------------------------------------------------------------------------
                        utime = (j - this.J1970) * (60 * 60 * 24 * 1000);

                        this.State.unixtime = Math.round(utime / 1000);
                    }

                    /**
                     * @desc Perform calculation starting with a Gregorian date
                     * @param {*} dateArray
                     */

                }, {
                    key: 'calcGregorian',
                    value: function calcGregorian(dateArray) {
                        if (dateArray[0] || dateArray[0] === 0) {
                            this.State.gregorian.year = dateArray[0];
                        }
                        if (dateArray[1] || dateArray[1] === 0) {
                            this.State.gregorian.month = dateArray[1];
                        }
                        if (dateArray[2] || dateArray[2] === 0) {
                            this.State.gregorian.day = dateArray[2];
                        }
                        if (dateArray[3] || dateArray[3] === 0) {
                            this.State.gregorian.hour = dateArray[3];
                        }
                        if (dateArray[4] || dateArray[4] === 0) {
                            this.State.gregorian.minute = dateArray[4];
                        }
                        if (dateArray[5] || dateArray[5] === 0) {
                            this.State.gregorian.second = dateArray[5];
                        }
                        if (dateArray[6] || dateArray[6] === 0) {
                            this.State.gregorian.millisecond = dateArray[6];
                        }
                        this.updateFromGregorian();
                    }

                    /**
                     * @desc Perform calculation starting with a Julian date
                     */

                }, {
                    key: 'calcJulian',
                    value: function calcJulian() {
                        var j = void 0,
                            date = void 0;
                        j = this.State.julianday;
                        date = this.jd_to_gregorian(j);
                        this.State.gregorian.year = date[0];
                        this.State.gregorian.month = date[1] - 1;
                        this.State.gregorian.day = date[2];
                        //        this.State.gregorian.hour = this.pad(time[0], 2, " ");
                        //        this.State.gregorian.minute = this.pad(time[1], 2, "0");
                        //        this.State.gregorian.second = this.pad(time[2], 2, "0");
                        this.updateFromGregorian();
                    }

                    /**
                     * @desc Set Julian date and update all calendars
                     * @param {*} j
                     */

                }, {
                    key: 'setJulian',
                    value: function setJulian(j) {
                        this.State.julianday = j;
                        this.calcJulian();
                    }

                    /**
                     * @desc  Update from Persian calendar
                     * @param {*} dateArray
                     */

                }, {
                    key: 'calcPersian',
                    value: function calcPersian(dateArray) {
                        if (dateArray[0] || dateArray[0] === 0) {
                            this.State.persian.year = dateArray[0];
                        }
                        if (dateArray[1] || dateArray[1] === 0) {
                            this.State.persian.month = dateArray[1];
                        }
                        if (dateArray[2] || dateArray[2] === 0) {
                            this.State.persian.day = dateArray[2];
                        }
                        if (dateArray[3] || dateArray[3] === 0) {
                            this.State.gregorian.hour = dateArray[3];
                        }
                        if (dateArray[4] || dateArray[4] === 0) {
                            this.State.gregorian.minute = dateArray[4];
                        }
                        if (dateArray[5] || dateArray[5] === 0) {
                            this.State.gregorian.second = dateArray[5];
                        }
                        if (dateArray[6] || dateArray[6] === 0) {
                            this.State.gregorian.millisecond = dateArray[6];
                        }

                        this.setJulian(this.persian_to_jd(this.State.persian.year, this.State.persian.month, this.State.persian.day));
                    }

                    /**
                     * @desc Update from Persian astronomical calendar
                     * @param {*} dateArray
                     */

                }, {
                    key: 'calcPersiana',
                    value: function calcPersiana(dateArray) {
                        if (dateArray[0] || dateArray[0] === 0) {
                            this.State.persianAstro.year = dateArray[0];
                        }
                        if (dateArray[1] || dateArray[1] === 0) {
                            this.State.persianAstro.month = dateArray[1];
                        }
                        if (dateArray[2] || dateArray[2] === 0) {
                            this.State.persianAstro.day = dateArray[2];
                        }

                        if (dateArray[3] || dateArray[3] === 0) {
                            this.State.gregorian.hour = dateArray[3];
                        }
                        if (dateArray[4] || dateArray[4] === 0) {
                            this.State.gregorian.minute = dateArray[4];
                        }
                        if (dateArray[5] || dateArray[5] === 0) {
                            this.State.gregorian.second = dateArray[5];
                        }
                        if (dateArray[6] || dateArray[6] === 0) {
                            this.State.gregorian.millisecond = dateArray[6];
                        }
                        this.setJulian(this.persiana_to_jd(this.State.persianAstro.year, this.State.persianAstro.month, this.State.persianAstro.day + 0.5));
                    }
                }]);

                return Algorithms;
            }();

            module.exports = Algorithms;

            /***/
        }),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            /*
             JavaScript functions for positional astronomy
             by John Walker  --  September, MIM
             http://www.fourmilab.ch/
             This program is in the public domain.
             */

            var ASTRO = function () {
                function ASTRO() {
                    _classCallCheck(this, ASTRO);

                    //  Frequently-used constants
                    this.J2000 = 2451545.0; // Julian day of J2000 epoch
                    this.JulianCentury = 36525.0; // Days in Julian century
                    this.JulianMillennium = this.JulianCentury * 10; // Days in Julian millennium
                    //        this.AstronomicalUnit = 149597870.0;           // Astronomical unit in kilometres
                    this.TropicalYear = 365.24219878; // Mean solar tropical year

                    /*  OBLIQEQ  --  Calculate the obliquity of the ecliptic for a given
                     Julian date.  This uses Laskar's tenth-degree
                     polynomial fit (J. Laskar, Astronomy and
                     Astrophysics, Vol. 157, page 68 [1986]) which is
                     accurate to within 0.01 arc second between AD 1000
                     and AD 3000, and within a few seconds of arc for
                     +/-10000 years around AD 2000.  If we're outside the
                     range in which this fit is valid (deep time) we
                     simply return the J2000 value of the obliquity, which
                     happens to be almost precisely the mean.  */
                    this.oterms = [-4680.93, -1.55, 1999.25, -51.38, -249.67, -39.05, 7.12, 27.87, 5.79, 2.45];
                    /* Periodic terms for nutation in longiude (delta \Psi) and
                     obliquity (delta \Epsilon) as given in table 21.A of
                     Meeus, "Astronomical Algorithms", first edition. */
                    this.nutArgMult = [0, 0, 0, 0, 1, -2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, -2, 1, 0, 2, 2, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, -2, -1, 0, 2, 2, -2, 0, 1, 0, 0, -2, 0, 0, 2, 1, 0, 0, -1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, -1, 2, 2, 0, 0, -1, 0, 1, 0, 0, 1, 2, 1, -2, 0, 2, 0, 0, 0, 0, -2, 2, 1, 2, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, -2, 0, 1, 2, 2, 0, 0, 0, 2, 0, -2, 0, 0, 2, 0, 0, 0, -1, 2, 1, 0, 2, 0, 0, 0, 2, 0, -1, 0, 1, -2, 2, 0, 2, 2, 0, 1, 0, 0, 1, -2, 0, 1, 0, 1, 0, -1, 0, 0, 1, 0, 0, 2, -2, 0, 2, 0, -1, 2, 1, 2, 0, 1, 2, 2, 0, 1, 0, 2, 2, -2, 1, 1, 0, 0, 0, -1, 0, 2, 2, 2, 0, 0, 2, 1, 2, 0, 1, 0, 0, -2, 0, 2, 2, 2, -2, 0, 1, 2, 1, 2, 0, -2, 0, 1, 2, 0, 0, 0, 1, 0, -1, 1, 0, 0, -2, -1, 0, 2, 1, -2, 0, 0, 0, 1, 0, 0, 2, 2, 1, -2, 0, 2, 0, 1, -2, 1, 0, 2, 1, 0, 0, 1, -2, 0, -1, 0, 1, 0, 0, -2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, -1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1, 1, 2, 2, 2, -1, -1, 2, 2, 0, 0, -2, 2, 2, 0, 0, 3, 2, 2, 2, -1, 0, 2, 2];

                    this.nutArgCoeff = [-171996, -1742, 92095, 89, /*  0,  0,  0,  0,  1 */
                    -13187, -16, 5736, -31, /* -2,  0,  0,  2,  2 */
                    -2274, -2, 977, -5, /*  0,  0,  0,  2,  2 */
                        2062, 2, -895, 5, /*  0,  0,  0,  0,  2 */
                        1426, -34, 54, -1, /*  0,  1,  0,  0,  0 */
                        712, 1, -7, 0, /*  0,  0,  1,  0,  0 */
                    -517, 12, 224, -6, /* -2,  1,  0,  2,  2 */
                    -386, -4, 200, 0, /*  0,  0,  0,  2,  1 */
                    -301, 0, 129, -1, /*  0,  0,  1,  2,  2 */
                        217, -5, -95, 3, /* -2, -1,  0,  2,  2 */
                    -158, 0, 0, 0, /* -2,  0,  1,  0,  0 */
                        129, 1, -70, 0, /* -2,  0,  0,  2,  1 */
                        123, 0, -53, 0, /*  0,  0, -1,  2,  2 */
                        63, 0, 0, 0, /*  2,  0,  0,  0,  0 */
                        63, 1, -33, 0, /*  0,  0,  1,  0,  1 */
                    -59, 0, 26, 0, /*  2,  0, -1,  2,  2 */
                    -58, -1, 32, 0, /*  0,  0, -1,  0,  1 */
                    -51, 0, 27, 0, /*  0,  0,  1,  2,  1 */
                        48, 0, 0, 0, /* -2,  0,  2,  0,  0 */
                        46, 0, -24, 0, /*  0,  0, -2,  2,  1 */
                    -38, 0, 16, 0, /*  2,  0,  0,  2,  2 */
                    -31, 0, 13, 0, /*  0,  0,  2,  2,  2 */
                        29, 0, 0, 0, /*  0,  0,  2,  0,  0 */
                        29, 0, -12, 0, /* -2,  0,  1,  2,  2 */
                        26, 0, 0, 0, /*  0,  0,  0,  2,  0 */
                    -22, 0, 0, 0, /* -2,  0,  0,  2,  0 */
                        21, 0, -10, 0, /*  0,  0, -1,  2,  1 */
                        17, -1, 0, 0, /*  0,  2,  0,  0,  0 */
                        16, 0, -8, 0, /*  2,  0, -1,  0,  1 */
                    -16, 1, 7, 0, /* -2,  2,  0,  2,  2 */
                    -15, 0, 9, 0, /*  0,  1,  0,  0,  1 */
                    -13, 0, 7, 0, /* -2,  0,  1,  0,  1 */
                    -12, 0, 6, 0, /*  0, -1,  0,  0,  1 */
                        11, 0, 0, 0, /*  0,  0,  2, -2,  0 */
                    -10, 0, 5, 0, /*  2,  0, -1,  2,  1 */
                    -8, 0, 3, 0, /*  2,  0,  1,  2,  2 */
                        7, 0, -3, 0, /*  0,  1,  0,  2,  2 */
                    -7, 0, 0, 0, /* -2,  1,  1,  0,  0 */
                    -7, 0, 3, 0, /*  0, -1,  0,  2,  2 */
                    -7, 0, 3, 0, /*  2,  0,  0,  2,  1 */
                        6, 0, 0, 0, /*  2,  0,  1,  0,  0 */
                        6, 0, -3, 0, /* -2,  0,  2,  2,  2 */
                        6, 0, -3, 0, /* -2,  0,  1,  2,  1 */
                    -6, 0, 3, 0, /*  2,  0, -2,  0,  1 */
                    -6, 0, 3, 0, /*  2,  0,  0,  0,  1 */
                        5, 0, 0, 0, /*  0, -1,  1,  0,  0 */
                    -5, 0, 3, 0, /* -2, -1,  0,  2,  1 */
                    -5, 0, 3, 0, /* -2,  0,  0,  0,  1 */
                    -5, 0, 3, 0, /*  0,  0,  2,  2,  1 */
                        4, 0, 0, 0, /* -2,  0,  2,  0,  1 */
                        4, 0, 0, 0, /* -2,  1,  0,  2,  1 */
                        4, 0, 0, 0, /*  0,  0,  1, -2,  0 */
                    -4, 0, 0, 0, /* -1,  0,  1,  0,  0 */
                    -4, 0, 0, 0, /* -2,  1,  0,  0,  0 */
                    -4, 0, 0, 0, /*  1,  0,  0,  0,  0 */
                        3, 0, 0, 0, /*  0,  0,  1,  2,  0 */
                    -3, 0, 0, 0, /* -1, -1,  1,  0,  0 */
                    -3, 0, 0, 0, /*  0,  1,  1,  0,  0 */
                    -3, 0, 0, 0, /*  0, -1,  1,  2,  2 */
                    -3, 0, 0, 0, /*  2, -1, -1,  2,  2 */
                    -3, 0, 0, 0, /*  0,  0, -2,  2,  2 */
                    -3, 0, 0, 0, /*  0,  0,  3,  2,  2 */
                    -3, 0, 0, 0 /*  2, -1,  0,  2,  2 */
                    ];

                    /**
                     * @desc Table of observed Delta T values at the beginning of even numbered years from 1620 through 2002.
                     * @type Array
                     */
                    this.deltaTtab = [121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46, 44, 42, 40, 38, 35, 33, 31, 29, 26, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 14, 13, 13.1, 12.5, 12.2, 12, 12, 12, 12, 12, 12, 11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6, 5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7, 1.4, -1.2, -2.8, -3.8, -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6, -6.3, -6.5, -6.2, -4.7, -2.8, -0.1, 2.6, 5.3, 7.7, 10.4, 13.3, 16, 18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24, 23.9, 23.9, 23.7, 24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4, 32.2, 33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5, 48.5, 50.5, 52.2, 53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6];

                    /*  EQUINOX  --  Determine the Julian Ephemeris Day of an
                     equinox or solstice.  The "which" argument
                     selects the item to be computed:
                      0   March equinox
                     1   June solstice
                     2   September equinox
                     3   December solstice
                      */
                    /**
                     * @desc Periodic terms to obtain true time
                     * @type Array
                     */
                    this.EquinoxpTerms = [485, 324.96, 1934.136, 203, 337.23, 32964.467, 199, 342.08, 20.186, 182, 27.85, 445267.112, 156, 73.14, 45036.886, 136, 171.52, 22518.443, 77, 222.54, 65928.934, 74, 296.72, 3034.906, 70, 243.58, 9037.513, 58, 119.81, 33718.147, 52, 297.17, 150.678, 50, 21.02, 2281.226, 45, 247.54, 29929.562, 44, 325.15, 31555.956, 29, 60.93, 4443.417, 18, 155.12, 67555.328, 17, 288.79, 4562.452, 16, 198.04, 62894.029, 14, 199.76, 31436.921, 12, 95.39, 14577.848, 12, 287.11, 31931.756, 12, 320.81, 34777.259, 9, 227.73, 1222.114, 8, 15.45, 16859.074];

                    this.JDE0tab1000 = [new Array(1721139.29189, 365242.13740, 0.06134, 0.00111, -0.00071), new Array(1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025), new Array(1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074), new Array(1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006)];

                    this.JDE0tab2000 = [new Array(2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057), new Array(2451716.56767, 365241.62603, 0.00325, 0.00888, -0.00030), new Array(2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078), new Array(2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032)];
                }

                /**
                 *
                 * @param Degrees to radians.
                 * @return {number}
                 */


                _createClass(ASTRO, [{
                    key: "dtr",
                    value: function dtr(d) {
                        return d * Math.PI / 180.0;
                    }

                    /**
                     * @desc Radians to degrees.
                     * @param r
                     * @return {number}
                     */

                }, {
                    key: "rtd",
                    value: function rtd(r) {
                        return r * 180.0 / Math.PI;
                    }

                    /**
                     * @desc Range reduce angle in degrees.
                     * @param a
                     * @return {number}
                     */

                }, {
                    key: "fixangle",
                    value: function fixangle(a) {
                        return a - 360.0 * Math.floor(a / 360.0);
                    }

                    /**
                     * @desc Range reduce angle in radians.
                     * @param a
                     * @return {number}
                     */

                }, {
                    key: "fixangr",
                    value: function fixangr(a) {
                        return a - 2 * Math.PI * Math.floor(a / (2 * Math.PI));
                    }

                    /**
                     * @desc  Sine of an angle in degrees
                     * @param d
                     * @return {number}
                     */

                }, {
                    key: "dsin",
                    value: function dsin(d) {
                        return Math.sin(this.dtr(d));
                    }

                    /**
                     * @desc Cosine of an angle in degrees
                     * @param d
                     * @return {number}
                     */

                }, {
                    key: "dcos",
                    value: function dcos(d) {
                        return Math.cos(this.dtr(d));
                    }

                    /**
                     * @desc Modulus function which works for non-integers.
                     * @param a
                     * @param b
                     * @return {number}
                     */

                }, {
                    key: "mod",
                    value: function mod(a, b) {
                        return a - b * Math.floor(a / b);
                    }

                    /**
                     *
                     * @param j
                     * @return {number}
                     */

                }, {
                    key: "jwday",
                    value: function jwday(j) {
                        return this.mod(Math.floor(j + 1.5), 7);
                    }

                    /**
                     *
                     * @param jd
                     * @return {number|*}
                     */

                }, {
                    key: "obliqeq",
                    value: function obliqeq(jd) {
                        var eps, u, v, i;
                        v = u = (jd - this.J2000) / (this.JulianCentury * 100);
                        eps = 23 + 26 / 60.0 + 21.448 / 3600.0;

                        if (Math.abs(u) < 1.0) {
                            for (i = 0; i < 10; i++) {
                                eps += this.oterms[i] / 3600.0 * v;
                                v *= u;
                            }
                        }
                        return eps;
                    }

                    /**
                     * @desc  Calculate the nutation in longitude, deltaPsi, and
                     obliquity, deltaEpsilon for a given Julian date
                     jd.  Results are returned as a two element Array
                     giving (deltaPsi, deltaEpsilon) in degrees.
                     * @param jd
                     * @return Object
                     */

                }, {
                    key: "nutation",
                    value: function nutation(jd) {
                        var deltaPsi,
                            deltaEpsilon,
                            i,
                            j,
                            t = (jd - 2451545.0) / 36525.0,
                            t2,
                            t3,
                            to10,
                            ta = [],
                            dp = 0,
                            de = 0,
                            ang;

                        t3 = t * (t2 = t * t);

                        /* Calculate angles.  The correspondence between the elements
                         of our array and the terms cited in Meeus are:
                          ta[0] = D  ta[0] = M  ta[2] = M'  ta[3] = F  ta[4] = \Omega
                          */

                        ta[0] = this.dtr(297.850363 + 445267.11148 * t - 0.0019142 * t2 + t3 / 189474.0);
                        ta[1] = this.dtr(357.52772 + 35999.05034 * t - 0.0001603 * t2 - t3 / 300000.0);
                        ta[2] = this.dtr(134.96298 + 477198.867398 * t + 0.0086972 * t2 + t3 / 56250.0);
                        ta[3] = this.dtr(93.27191 + 483202.017538 * t - 0.0036825 * t2 + t3 / 327270);
                        ta[4] = this.dtr(125.04452 - 1934.136261 * t + 0.0020708 * t2 + t3 / 450000.0);

                        /* Range reduce the angles in case the sine and cosine functions
                         don't do it as accurately or quickly. */

                        for (i = 0; i < 5; i++) {
                            ta[i] = this.fixangr(ta[i]);
                        }

                        to10 = t / 10.0;
                        for (i = 0; i < 63; i++) {
                            ang = 0;
                            for (j = 0; j < 5; j++) {
                                if (this.nutArgMult[i * 5 + j] !== 0) {
                                    ang += this.nutArgMult[i * 5 + j] * ta[j];
                                }
                            }
                            dp += (this.nutArgCoeff[i * 4 + 0] + this.nutArgCoeff[i * 4 + 1] * to10) * Math.sin(ang);
                            de += (this.nutArgCoeff[i * 4 + 2] + this.nutArgCoeff[i * 4 + 3] * to10) * Math.cos(ang);
                        }

                        /* Return the result, converting from ten thousandths of arc
                         seconds to radians in the process. */

                        deltaPsi = dp / (3600.0 * 10000.0);
                        deltaEpsilon = de / (3600.0 * 10000.0);

                        return [deltaPsi, deltaEpsilon];
                    }

                    /**
                     * @desc  Determine the difference, in seconds, between
                     Dynamical time and Universal time.
                     * @param year
                     * @return {*}
                     */

                }, {
                    key: "deltat",
                    value: function deltat(year) {
                        var dt, f, i, t;

                        if (year >= 1620 && year <= 2000) {
                            i = Math.floor((year - 1620) / 2);
                            f = (year - 1620) / 2 - i;
                            /* Fractional part of year */
                            dt = this.deltaTtab[i] + (this.deltaTtab[i + 1] - this.deltaTtab[i]) * f;
                        } else {
                            t = (year - 2000) / 100;
                            if (year < 948) {
                                dt = 2177 + 497 * t + 44.1 * t * t;
                            } else {
                                dt = 102 + 102 * t + 25.3 * t * t;
                                if (year > 2000 && year < 2100) {
                                    dt += 0.37 * (year - 2100);
                                }
                            }
                        }
                        return dt;
                    }

                    /**
                     *
                     * @param year
                     * @param which
                     * @return {*}
                     */

                }, {
                    key: "equinox",
                    value: function equinox(year, which) {
                        var deltaL = void 0,
                            i = void 0,
                            j = void 0,
                            JDE0 = void 0,
                            JDE = void 0,
                            JDE0tab = void 0,
                            S = void 0,
                            T = void 0,
                            W = void 0,
                            Y = void 0;
                        /*  Initialise terms for mean equinox and solstices.  We
                         have two sets: one for years prior to 1000 and a second
                         for subsequent years.  */

                        if (year < 1000) {
                            JDE0tab = this.JDE0tab1000;
                            Y = year / 1000;
                        } else {
                            JDE0tab = this.JDE0tab2000;
                            Y = (year - 2000) / 1000;
                        }

                        JDE0 = JDE0tab[which][0] + JDE0tab[which][1] * Y + JDE0tab[which][2] * Y * Y + JDE0tab[which][3] * Y * Y * Y + JDE0tab[which][4] * Y * Y * Y * Y;
                        T = (JDE0 - 2451545.0) / 36525;
                        W = 35999.373 * T - 2.47;
                        deltaL = 1 + 0.0334 * this.dcos(W) + 0.0007 * this.dcos(2 * W);
                        S = 0;
                        for (i = j = 0; i < 24; i++) {
                            S += this.EquinoxpTerms[j] * this.dcos(this.EquinoxpTerms[j + 1] + this.EquinoxpTerms[j + 2] * T);
                            j += 3;
                        }
                        JDE = JDE0 + S * 0.00001 / deltaL;
                        return JDE;
                    }

                    /**
                     * @desc  Position of the Sun.  Please see the comments
                     on the return statement at the end of this function
                     which describe the array it returns.  We return
                     intermediate values because they are useful in a
                     variety of other contexts.
                     * @param jd
                     * @return Object
                     */

                }, {
                    key: "sunpos",
                    value: function sunpos(jd) {
                        var T = void 0,
                            T2 = void 0,
                            L0 = void 0,
                            M = void 0,
                            e = void 0,
                            C = void 0,
                            sunLong = void 0,
                            sunAnomaly = void 0,
                            sunR = void 0,
                            Omega = void 0,
                            Lambda = void 0,
                            epsilon = void 0,
                            epsilon0 = void 0,
                            Alpha = void 0,
                            Delta = void 0,
                            AlphaApp = void 0,
                            DeltaApp = void 0;

                        T = (jd - this.J2000) / this.JulianCentury;
                        T2 = T * T;
                        L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
                        L0 = this.fixangle(L0);
                        M = 357.52911 + 35999.05029 * T + -0.0001537 * T2;
                        M = this.fixangle(M);
                        e = 0.016708634 + -0.000042037 * T + -0.0000001267 * T2;
                        C = (1.914602 + -0.004817 * T + -0.000014 * T2) * this.dsin(M) + (0.019993 - 0.000101 * T) * this.dsin(2 * M) + 0.000289 * this.dsin(3 * M);
                        sunLong = L0 + C;
                        sunAnomaly = M + C;
                        sunR = 1.000001018 * (1 - e * e) / (1 + e * this.dcos(sunAnomaly));
                        Omega = 125.04 - 1934.136 * T;
                        Lambda = sunLong + -0.00569 + -0.00478 * this.dsin(Omega);
                        epsilon0 = this.obliqeq(jd);
                        epsilon = epsilon0 + 0.00256 * this.dcos(Omega);
                        Alpha = this.rtd(Math.atan2(this.dcos(epsilon0) * this.dsin(sunLong), this.dcos(sunLong)));
                        Alpha = this.fixangle(Alpha);
                        Delta = this.rtd(Math.asin(this.dsin(epsilon0) * this.dsin(sunLong)));
                        AlphaApp = this.rtd(Math.atan2(this.dcos(epsilon) * this.dsin(Lambda), this.dcos(Lambda)));
                        AlphaApp = this.fixangle(AlphaApp);
                        DeltaApp = this.rtd(Math.asin(this.dsin(epsilon) * this.dsin(Lambda)));

                        return [//  Angular quantities are expressed in decimal degrees
                            L0, //  [0] Geometric mean longitude of the Sun
                            M, //  [1] Mean anomaly of the Sun
                            e, //  [2] Eccentricity of the Earth's orbit
                            C, //  [3] Sun's equation of the Centre
                            sunLong, //  [4] Sun's true longitude
                            sunAnomaly, //  [5] Sun's true anomaly
                            sunR, //  [6] Sun's radius vector in AU
                            Lambda, //  [7] Sun's apparent longitude at true equinox of the date
                            Alpha, //  [8] Sun's true right ascension
                            Delta, //  [9] Sun's true declination
                            AlphaApp, // [10] Sun's apparent right ascension
                            DeltaApp // [11] Sun's apparent declination
                        ];
                    }

                    /**
                     * @desc Compute equation of time for a given moment. Returns the equation of time as a fraction of a day.
                     * @param jd
                     * @return {number|*}
                     */

                }, {
                    key: "equationOfTime",
                    value: function equationOfTime(jd) {
                        var alpha = void 0,
                            deltaPsi = void 0,
                            E = void 0,
                            epsilon = void 0,
                            L0 = void 0,
                            tau = void 0;
                        tau = (jd - this.J2000) / this.JulianMillennium;
                        L0 = 280.4664567 + 360007.6982779 * tau + 0.03032028 * tau * tau + tau * tau * tau / 49931 + -(tau * tau * tau * tau / 15300) + -(tau * tau * tau * tau * tau / 2000000);
                        L0 = this.fixangle(L0);
                        alpha = this.sunpos(jd)[10];
                        deltaPsi = this.nutation(jd)[0];
                        epsilon = this.obliqeq(jd) + this.nutation(jd)[1];
                        E = L0 + -0.0057183 + -alpha + deltaPsi * this.dcos(epsilon);
                        E = E - 20.0 * Math.floor(E / 20.0);
                        E = E / (24 * 60);
                        return E;
                    }
                }]);

                return ASTRO;
            }();

            module.exports = ASTRO;

            /***/
        }),
/* 4 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Constants
             * @module constants
             */

            module.exports = {
                durationUnit: {
                    year: ['y', 'years', 'year'],
                    month: ['M', 'months', 'month'],
                    day: ['d', 'days', 'day'],
                    hour: ['h', 'hours', 'hour'],
                    minute: ['m', 'minutes', 'minute'],
                    second: ['s', 'second', 'seconds'],
                    millisecond: ['ms', 'milliseconds', 'millisecond'],
                    week: ['W', 'w', 'weeks', 'week']
                }
            };

            /***/
        }),
/* 5 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Helpers = __webpack_require__(0);
            var normalizeDuration = new Helpers().normalizeDuration;
            var absRound = new Helpers().absRound;
            var absFloor = new Helpers().absFloor;
            /**
             * Duration object constructor
             * @param duration
             * @class Duration
             * @constructor
             */

            var Duration = function () {
                function Duration(key, value) {
                    _classCallCheck(this, Duration);

                    var duration = {},
                        data = this._data = {},
                        milliseconds = 0,
                        normalizedUnit = normalizeDuration(key, value),
                        unit = normalizedUnit.unit;
                    duration[unit] = normalizedUnit.value;
                    milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

                    var years = duration.years || duration.year || duration.y || 0,
                        months = duration.months || duration.month || duration.M || 0,
                        weeks = duration.weeks || duration.w || duration.week || 0,
                        days = duration.days || duration.d || duration.day || 0,
                        hours = duration.hours || duration.hour || duration.h || 0,
                        minutes = duration.minutes || duration.minute || duration.m || 0,
                        seconds = duration.seconds || duration.second || duration.s || 0;
                    // representation for dateAddRemove
                    this._milliseconds = milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
                    // Because of dateAddRemove treats 24 hours as different from a
                    // day when working around DST, we need to store them separately
                    this._days = days + weeks * 7;
                    // It is impossible translate months into days without knowing
                    // which months you are are talking about, so we have to store
                    // it separately.
                    this._months = months + years * 12;
                    // The following code bubbles up values, see the tests for
                    // examples of what that means.
                    data.milliseconds = milliseconds % 1000;
                    seconds += absFloor(milliseconds / 1000);
                    data.seconds = seconds % 60;
                    minutes += absRound(seconds / 60);
                    data.minutes = minutes % 60;
                    hours += absRound(minutes / 60);
                    data.hours = hours % 24;
                    days += absRound(hours / 24);
                    days += weeks * 7;
                    data.days = days % 30;
                    months += absRound(days / 30);
                    data.months = months % 12;
                    years += absRound(months / 12);
                    data.years = years;
                    return this;
                }

                _createClass(Duration, [{
                    key: 'valueOf',
                    value: function valueOf() {
                        return this._milliseconds + this._days * 864e5 + this._months * 2592e6;
                    }
                }]);

                return Duration;
            }();

            module.exports = Duration;

            /***/
        }),
/* 6 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Constants
             * @module constants
             */

            module.exports = {
                gregorian: {
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
                },
                persian: {
                    months: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
                    monthsShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Dey', 'Bah', 'Esf'],
                    weekdays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    weekdaysShort: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    weekdaysMin: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
                    persianDaysName: ['Urmazd', 'Bahman', 'Ordibehesht', 'Shahrivar', 'Sepandarmaz', 'Khurdad', 'Amordad', 'Dey-be-azar', 'Azar', 'Aban', 'Khorshid', 'Mah', 'Tir', 'Gush', 'Dey-be-mehr', 'Mehr', 'Sorush', 'Rashn', 'Farvardin', 'Bahram', 'Ram', 'Bad', 'Dey-be-din', 'Din', 'Ord', 'Ashtad', 'Asman', 'Zamyad', 'Mantre-sepand', 'Anaram', 'Ziadi']
                }
            };

            /***/
        }),
/* 7 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * Constants
             * @module constants
             */

            module.exports = {
                gregorian: {
                    months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
                    monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
                    weekdays: '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split('_'),
                    weekdaysShort: '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split('_'),
                    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_')
                },
                persian: {
                    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
                    monthsShort: ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'],
                    weekdays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', '\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647', 'جمعه'],
                    weekdaysShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
                    weekdaysMin: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
                    persianDaysName: ['اورمزد', 'بهمن', 'اوردیبهشت', 'شهریور', 'سپندارمذ', 'خورداد', 'امرداد', 'دی به آذز', 'آذز', 'آبان', 'خورشید', 'ماه', 'تیر', 'گوش', 'دی به مهر', 'مهر', 'سروش', 'رشن', 'فروردین', 'بهرام', 'رام', 'باد', 'دی به دین', 'دین', 'ارد', 'اشتاد', 'آسمان', 'زامیاد', 'مانتره سپند', 'انارام', 'زیادی']
                }
            };

            /***/
        }),
/* 8 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var PersianDateClass = __webpack_require__(1);
            PersianDateClass.calendarType = 'persian';
            PersianDateClass.leapYearMode = 'astronomical';
            PersianDateClass.localType = 'fa';
            module.exports = PersianDateClass;

            /***/
        }),
/* 9 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Container = function Container() {
                _classCallCheck(this, Container);

                this.isInvalidDate = null;

                this.gDate = null;
                /**
                 *
                 * @type {number}
                 */
                this.modifiedjulianday = 0;

                /**
                 *
                 * @type {number}
                 */
                this.julianday = 0;

                /**
                 *
                 * @type {{day: number}}
                 */
                this.gregserial = {
                    day: 0
                };

                this.zone = 0;

                /**
                 *
                 * @type {{year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, weekday: number, unix: number, leap: number}}
                 */
                this.gregorian = {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                    weekday: 0,
                    unix: 0,
                    leap: 0
                };

                /**
                 *
                 * @type {{year: number, month: number, day: number, leap: number, weekday: number}}
                 */
                this.juliancalendar = {
                    year: 0,
                    month: 0,
                    day: 0,
                    leap: 0,
                    weekday: 0
                };

                /**
                 *
                 * @type {{year: number, month: number, day: number, leap: number, weekday: number}}
                 */
                this.islamic = {
                    year: 0,
                    month: 0,
                    day: 0,
                    leap: 0,
                    weekday: 0
                };

                /**
                 *
                 * @type {{year: number, month: number, day: number, leap: number, weekday: number}}
                 */
                this.persianAlgo = this.persian = {
                    year: 0,
                    month: 0,
                    day: 0,
                    leap: 0,
                    weekday: 0
                };

                /**
                 *
                 * @type {{year: number, month: number, day: number, leap: number, weekday: number}}
                 */
                this.persianAstro = {
                    year: 0,
                    month: 0,
                    day: 0,
                    leap: 0,
                    weekday: 0
                };

                /**
                 *
                 * @type {{year: number, week: number, day: number}}
                 */
                this.isoweek = {
                    year: 0,
                    week: 0,
                    day: 0
                };

                /**
                 *
                 * @type {{year: number, day: number}}
                 */
                this.isoday = {
                    year: 0,
                    day: 0
                };
            };

            module.exports = Container;

            /***/
        }),
/* 10 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            module.exports = {
                /**
                 * @param input
                 * @returns {boolean}
                 */
                isArray: function isArray(input) {
                    return Object.prototype.toString.call(input) === '[object Array]';
                },


                /**
                 *
                 * @param input
                 * @returns {boolean}
                 */
                isNumber: function isNumber(input) {
                    return typeof input === 'number';
                },


                /**
                 *
                 * @param input
                 * @returns {boolean}
                 */
                isDate: function isDate(input) {
                    return input instanceof Date;
                }
            };

            /***/
        }),
/* 11 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            module.exports = {
                /**
                 * @param input
                 * @returns {boolean}
                 */
                validateInputArray: function validateInputArray(input) {
                    var out = true;
                    // Check month
                    if (input[1] < 1 || input[1] > 12) {
                        out = false;
                    }
                    // Check date
                    if (input[2] < 1 || input[1] > 31) {
                        out = false;
                    }
                    // Check hour 
                    if (input[3] < 0 || input[3] > 24) {
                        out = false;
                    }
                    // Check minute 
                    if (input[4] < 0 || input[4] > 60) {
                        out = false;
                    }
                    // Check second 
                    if (input[5] < 0 || input[5] > 60) {
                        out = false;
                    }
                    return out;
                }
            };

            /***/
        })
/******/]);
});
/*
** persian-datepicker - v1.2.0
** Reza Babakhani <babakhani.reza@gmail.com>
** http://babakhani.github.io/PersianWebToolkit/docs/datepicker
** Under MIT license 
*/

(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["persianDatepicker"] = factory();
    else
        root["persianDatepicker"] = factory();
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
                /******/
            }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
                /******/
            };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
        }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
            /******/
        });
                /******/
            }
            /******/
        };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
            /******/
        };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
        /******/
    })
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var Helper = {

                // leading edge, instead of the trailing.
                debounce: function debounce(func, wait, immediate) {
                    var timeout;
                    return function () {
                        var context = this,
                            args = arguments;
                        var later = function later() {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                },


                /**
                 * @desc normal log
                 * @param input
                 * @example log('whoooooha')
                 */
                log: function log(input) {
                    /*eslint-disable no-console */
                    console.log(input);
                    /*eslint-enable no-console */
                },


                /* eslint-disable no-useless-escape */
                isMobile: function () {
                    var check = false;
                    (function (a) {
                        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
                    })(navigator.userAgent || navigator.vendor || window.opera);
                    return check;
                }(),
                /* eslint-enable no-useless-escape */

                /**
                 * @desc show debug messages if window.persianDatepickerDebug set as true
                 * @param elem
                 * @param input
                 * @example window.persianDatepickerDebug = true;
                 * debug('element','message');
                 */
                debug: function debug(elem, input) {
                    /*eslint-disable no-console */
                    if (window.persianDatepickerDebug) {
                        if (elem.constructor.name) {
                            console.log('Debug: ' + elem.constructor.name + ' : ' + input);
                        } else {
                            console.log('Debug: ' + input);
                        }
                    }
                    /*eslint-enable no-console */
                },
                delay: function delay(callback, ms) {
                    clearTimeout(window.datepickerTimer);
                    window.datepickerTimer = setTimeout(callback, ms);
                }
            };

            module.exports = Helper;

            /***/
        }),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            /**
             * @type {string}
             */
            var Template = "\n<div id=\"plotId\" class=\"datepicker-plot-area {{cssClass}}\">\n    {{#navigator.enabled}}\n        <div data-navigator class=\"datepicker-navigator\">\n            <div class=\"pwt-btn pwt-btn-next\">{{navigator.text.btnNextText}}</div>\n            <div class=\"pwt-btn pwt-btn-switch\">{{navigator.switch.text}}</div>\n            <div class=\"pwt-btn pwt-btn-prev\">{{navigator.text.btnPrevText}}</div>\n        </div>\n    {{/navigator.enabled}}\n    <div class=\"datepicker-grid-view\" >\n    {{#days.enabled}}\n        {{#days.viewMode}}\n        <div class=\"datepicker-day-view\" >    \n            <div class=\"month-grid-box\">\n                <div class=\"header\">\n                    <div class=\"title\"></div>\n                    <div class=\"header-row\">\n                        {{#weekdays.list}}\n                            <div class=\"header-row-cell\">{{.}}</div>\n                        {{/weekdays.list}}\n                    </div>\n                </div>    \n                <table cellspacing=\"0\" class=\"table-days\">\n                    <tbody>\n                        {{#days.list}}\n                           \n                            <tr>\n                                {{#.}}\n                                    {{#enabled}}\n                                        <td data-date=\"{{dataDate}}\" data-unix=\"{{dataUnix}}\" >\n                                            <span  class=\"{{#otherMonth}}other-month{{/otherMonth}}\">{{title}}</span>\n                                            {{#altCalendarShowHint}}\n                                            <i  class=\"alter-calendar-day\">{{alterCalTitle}}</i>\n                                            {{/altCalendarShowHint}}\n                                        </td>\n                                    {{/enabled}}\n                                    {{^enabled}}\n                                        <td data-date=\"{{dataDate}}\" data-unix=\"{{dataUnix}}\" class=\"disabled\">\n                                            <span class=\"{{#otherMonth}}other-month{{/otherMonth}}\">{{title}}</span>\n                                            {{#altCalendarShowHint}}\n                                            <i  class=\"alter-calendar-day\">{{alterCalTitle}}</i>\n                                            {{/altCalendarShowHint}}\n                                        </td>\n                                    {{/enabled}}\n                                    \n                                {{/.}}\n                            </tr>\n                        {{/days.list}}\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        {{/days.viewMode}}\n    {{/days.enabled}}\n    \n    {{#month.enabled}}\n        {{#month.viewMode}}\n            <div class=\"datepicker-month-view\">\n                {{#month.list}}\n                    {{#enabled}}               \n                        <div data-year=\"{{year}}\" data-month=\"{{dataMonth}}\" class=\"month-item {{#selected}}selected{{/selected}}\">{{title}}</small></div>\n                    {{/enabled}}\n                    {{^enabled}}               \n                        <div data-year=\"{{year}}\"data-month=\"{{dataMonth}}\" class=\"month-item month-item-disable {{#selected}}selected{{/selected}}\">{{title}}</small></div>\n                    {{/enabled}}\n                {{/month.list}}\n            </div>\n        {{/month.viewMode}}\n    {{/month.enabled}}\n    \n    {{#year.enabled }}\n        {{#year.viewMode }}\n            <div class=\"datepicker-year-view\" >\n                {{#year.list}}\n                    {{#enabled}}\n                        <div data-year=\"{{dataYear}}\" class=\"year-item {{#selected}}selected{{/selected}}\">{{title}}</div>\n                    {{/enabled}}\n                    {{^enabled}}\n                        <div data-year=\"{{dataYear}}\" class=\"year-item year-item-disable {{#selected}}selected{{/selected}}\">{{title}}</div>\n                    {{/enabled}}                    \n                {{/year.list}}\n            </div>\n        {{/year.viewMode }}\n    {{/year.enabled }}\n    \n    </div>\n    {{#time}}\n    {{#enabled}}\n    <div class=\"datepicker-time-view\">\n        {{#hour.enabled}}\n            <div class=\"hour time-segment\" data-time-key=\"hour\">\n                <div class=\"up-btn\" data-time-key=\"hour\">\u25B2</div>\n                <input disabled value=\"{{hour.title}}\" type=\"text\" placeholder=\"hour\" class=\"hour-input\">\n                <div class=\"down-btn\" data-time-key=\"hour\">\u25BC</div>                    \n            </div>       \n            <div class=\"divider\">\n                <span>:</span>\n            </div>\n        {{/hour.enabled}}\n        {{#minute.enabled}}\n            <div class=\"minute time-segment\" data-time-key=\"minute\" >\n                <div class=\"up-btn\" data-time-key=\"minute\">\u25B2</div>\n                <input disabled value=\"{{minute.title}}\" type=\"text\" placeholder=\"minute\" class=\"minute-input\">\n                <div class=\"down-btn\" data-time-key=\"minute\">\u25BC</div>\n            </div>        \n            <div class=\"divider second-divider\">\n                <span>:</span>\n            </div>\n        {{/minute.enabled}}\n        {{#second.enabled}}\n            <div class=\"second time-segment\" data-time-key=\"second\"  >\n                <div class=\"up-btn\" data-time-key=\"second\" >\u25B2</div>\n                <input disabled value=\"{{second.title}}\"  type=\"text\" placeholder=\"second\" class=\"second-input\">\n                <div class=\"down-btn\" data-time-key=\"second\" >\u25BC</div>\n            </div>\n            <div class=\"divider meridian-divider\"></div>\n            <div class=\"divider meridian-divider\"></div>\n        {{/second.enabled}}\n        {{#meridian.enabled}}\n            <div class=\"meridian time-segment\" data-time-key=\"meridian\" >\n                <div class=\"up-btn\" data-time-key=\"meridian\">\u25B2</div>\n                <input disabled value=\"{{meridian.title}}\" type=\"text\" class=\"meridian-input\">\n                <div class=\"down-btn\" data-time-key=\"meridian\">\u25BC</div>\n            </div>\n        {{/meridian.enabled}}\n    </div>\n    {{/enabled}}\n    {{/time}}\n    \n    {{#toolbox}}\n    {{#enabled}}\n    <div class=\"toolbox\">\n        {{#toolbox.submitButton.enabled}}\n            <div class=\"pwt-btn-submit\">{{submitButtonText}}</div>\n        {{/toolbox.submitButton.enabled}}        \n        {{#toolbox.todayButton.enabled}}\n            <div class=\"pwt-btn-today\">{{todayButtonText}}</div>\n        {{/toolbox.todayButton.enabled}}        \n        {{#toolbox.calendarSwitch.enabled}}\n            <div class=\"pwt-btn-calendar\">{{calendarSwitchText}}</div>\n        {{/toolbox.calendarSwitch.enabled}}\n    </div>\n    {{/enabled}}\n    {{^enabled}}\n        {{#onlyTimePicker}}\n        <div class=\"toolbox\">\n            <div class=\"pwt-btn-submit\">{{submitButtonText}}</div>\n        </div>\n        {{/onlyTimePicker}}\n    {{/enabled}}\n    {{/toolbox}}\n</div>\n";

            module.exports = Template;

            /***/
        }),
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var State = __webpack_require__(11);
            var Toolbox = __webpack_require__(12);
            var View = __webpack_require__(13);
            var Input = __webpack_require__(6);
            var API = __webpack_require__(3);
            var Navigator = __webpack_require__(7);
            var Options = __webpack_require__(8);
            var PersianDateWrapper = __webpack_require__(10);

            /**
             * Main datepicker object, manage every things
             */

            var Model = function () {

                /**
                 * @param inputElement
                 * @param options
                 * @private
                 */
                function Model(inputElement, options) {
                    _classCallCheck(this, Model);

                    return this.components(inputElement, options);
                }

                _createClass(Model, [{
                    key: 'components',
                    value: function components(inputElement, options) {
                        /**
                         * @desc [initialUnix=null]
                         * @type {unix}
                         */
                        this.initialUnix = null;

                        /**
                         * @desc inputElement=inputElement
                         * @type {Object}
                         */
                        this.inputElement = inputElement;

                        /**
                         * @desc handle works about config
                         * @type {Options}
                         */
                        this.options = new Options(options, this);

                        /**
                         *
                         * @type {PersianDateWrapper}
                         */
                        this.PersianDate = new PersianDateWrapper(this);

                        /**
                         * @desc set and get selected and view and other state
                         * @type {State}
                         */
                        this.state = new State(this);

                        this.api = new API(this);

                        /**
                         * @desc handle works about input and alt field input element
                         * @type {Input}
                         */
                        this.input = new Input(this, inputElement);

                        /**
                         * @desc render datepicker view base on State
                         * @type {View}
                         */
                        this.view = new View(this);

                        /**
                         * @desc handle works about toolbox
                         * @type {Toolbox}
                         */
                        this.toolbox = new Toolbox(this);

                        /**
                         *
                         * @param unix
                         */
                        this.updateInput = function (unix) {
                            this.input.update(unix);
                        };

                        this.state.setViewDateTime('unix', this.input.getOnInitState());
                        this.state.setSelectedDateTime('unix', this.input.getOnInitState());
                        this.view.render();

                        /**
                         * @desc handle navigation and dateoicker element events
                         * @type {Navigator}
                         */
                        this.navigator = new Navigator(this);

                        return this.api;
                    }
                }]);

                return Model;
            }();

            module.exports = Model;

            /***/
        }),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            /**
             * This is the API documentation for persian-datepicker
             */
            var API = function () {
                function API(model) {
                    _classCallCheck(this, API);

                    this.model = model;
                }

                /**
                 * @description get current option object
                 * @example var pd = $('.selector').persianDatepicker();
                 * console.log(pd.options);
                 */


                _createClass(API, [{
                    key: 'show',


                    /**
                     * @description make datepicker visible
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.show();
                     */
                    value: function show() {
                        this.model.view.show();
                        this.model.options.onShow(this.model);
                        return this.model;
                    }

                    /**
                     * @description return datepicker current state
                     * @since 1.0.0
                     * @example var pd = $('.selector').persianDatepicker();
                     * var state = pd.getState();
                     *
                     * console.log(state.selected);
                     * console.log(state.view);
                     * */

                }, {
                    key: 'getState',
                    value: function getState() {
                        return this.model.state;
                    }

                    /**
                     * @description make datepicker invisible
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.show();
                     */

                }, {
                    key: 'hide',
                    value: function hide() {
                        this.model.view.hide();
                        this.model.options.onHide(this.model);
                        return this.model;
                    }

                    /**
                     * @description toggle datepicker visibility state
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.toggle();
                     */

                }, {
                    key: 'toggle',
                    value: function toggle() {
                        this.model.view.toggle();
                        this.model.options.onToggle(this.model);
                        return this.model;
                    }

                    /**
                     * @description destroy every thing clean dom and
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.destroy();
                     */

                }, {
                    key: 'destroy',
                    value: function destroy() {
                        if (this.model) {
                            this.model.view.destroy();
                            this.model.options.onDestroy(this.model);
                            delete this.model;
                        }
                    }

                    /**
                     * @description set selected date of datepicker accept unix timestamp
                     * @param unix
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.setDate(1382276091100)
                     */

                }, {
                    key: 'setDate',
                    value: function setDate(unix) {
                        this.model.state.setSelectedDateTime('unix', unix);
                        this.model.state.setViewDateTime('unix', unix);
                        this.model.state.setSelectedDateTime('unix', unix);
                        this.model.view.render(this.view);
                        this.model.options.onSet(unix);
                        return this.model;
                    }
                }, {
                    key: 'options',
                    get: function get() {
                        return this.model.options;
                    }

                    /**
                     * @description set options live
                     * @example var pd = $('.selector').persianDatepicker();
                     * pd.options;
                     * //return current options
                     * pd.options = {};
                     * // set options and render datepicker with new options
                     */
                    ,
                    set: function set(inputOptions) {
                        var opt = $.extend(true, this.model.options, inputOptions);
                        this.model.view.destroy();
                        this.model.components(this.model.inputElement, opt);
                    }
                }]);

                return API;
            }();

            module.exports = API;

            /***/
        }),
/* 4 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var Helper = __webpack_require__(0);

            /**
             * @description persian-datepicker configuration document
             */
            var Config = {

                /**
                 * @description set default calendar mode of datepicker, available options: 'persian', 'gregorian'
                 * @default 'persian'
                 * @type string
                 * @since 1.0.0
                 */
                'calendarType': 'persian',

                /**
                 * @description calendar type and localization configuration
                 * @type object
                 * @since 1.0.0
                 * @example
                 * {
                 *     'persian': {
                 *         'locale': 'fa',
                 *         'showHint': false,
                 *         'leapYearMode': 'algorithmic' // "astronomical"
                 *     },
                 *
                 *     'gregorian': {
                 *         'locale': 'en',
                 *         'showHint': false
                 *     }
                 * }
                 *
                 *
                 *
                 */
                'calendar': {

                    /**
                     * @description Persian calendar configuration
                     * @type object
                     * @since 1.0.0
                     */
                    'persian': {

                        /**
                         * @description set locale of Persian calendar available options: 'fa', 'en'
                         * @default 'fa'
                         * @type string
                         * @since 1.0.0
                         */
                        'locale': 'fa',

                        /**
                         * @description if set true, small date hint of this calendar will be shown on another calendar
                         * @type boolean
                         * @default false
                         * @since 1.0.0
                         */
                        'showHint': false,

                        /**
                         * @description Persian calendar leap year calculation mode, available options: 'algorithmic', 'astronomical'
                         * @type string
                         * @link http://babakhani.github.io/PersianWebToolkit/doc/persian-date/leapyear
                         * @default 'algorithmic'
                         * @since 1.0.0
                         */
                        'leapYearMode': 'algorithmic' // "astronomical"
                    },

                    /**
                     * @description Gregorian calendar configuration
                     * @type object
                     * @since 1.0.0
                     */
                    'gregorian': {

                        /**
                         * @description set locale of Gregorian calendar available options: 'fa', 'en'
                         * @default 'en'
                         * @type string
                         * @since 1.0.0
                         */
                        'locale': 'en',

                        /**
                         * @description if set true, small date hint of this calendar will be shown on another calendar
                         * @type boolean
                         * @default false
                         * @since 1.0.0
                         */
                        'showHint': false
                    }
                },

                /**
                 * @description if set true make enable responsive view on mobile devices
                 * @type boolean
                 * @since 1.0.0
                 * @default true
                 */
                'responsive': true,

                /**
                 * @description if true datepicker render inline
                 * @type boolean
                 * @default false
                 */
                'inline': false,

                /**
                 * @description If set true datepicker init with input value date, use data-date property when you want set inline datepicker initial value
                 * @type boolean
                 * @default true
                 */
                'initialValue': true,

                /**
                 * @description Initial value calendar type, accept: 'persian', 'gregorian'
                 * @type boolean
                 * @default true
                 */
                'initialValueType': 'gregorian',

                /**
                 * @description from v1.0.0 this options is deprecated, use calendar.persian.locale instead
                 * @deprecated
                 * @type boolean
                 * @default true
                 */
                'persianDigit': true,

                /**
                 * @description default view mode, Acceptable value : day,month,year
                 * @type {string}
                 * @default 'day'
                 */
                'viewMode': 'day',

                /**
                 * @description the date format, combination of d, dd, m, mm, yy, yyy.
                 * @link http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
                 * @type {boolean}
                 * @default 'LLLL'
                 */
                'format': 'LLLL',

                /**
                 * @description format value of input
                 * @param unixDate
                 * @default function
                 * @example function (unixDate) {
                 *      var self = this;
                 *      var pdate = new persianDate(unixDate);
                 *      pdate.formatPersian = this.persianDigit;
                 *      return pdate.format(self.format);
                 *  }
                 */
                'formatter': function formatter(unixDate) {
                    var self = this,
                        pdate = this.model.PersianDate.date(unixDate);
                    return pdate.format(self.format);
                },

                /**
                 * @description An input element that is to be updated with the selected date from the datepicker. Use the altFormat option to change the format of the date within this field. Leave as blank for no alternate field. acceptable value: : '#elementId','.element-class'
                 * @type {boolean}
                 * @default false
                 * @example
                 * altField: '#inputAltFirld'
                 *
                 * altField: '.input-alt-field'
                 */
                'altField': false,

                /**
                 * @description the date format, combination of d, dd, m, mm, yy, yyy.
                 * @link http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
                 * @type {string}
                 * @default 'unix'
                 */
                'altFormat': 'unix',

                /**
                 * @description format value of 'altField' input
                 * @param unixDate
                 * @default function
                 * @example function (unixDate) {
                 *      var self = this;
                 *      var thisAltFormat = self.altFormat.toLowerCase();
                 *      if (thisAltFormat === 'gregorian' || thisAltFormat === 'g') {
                 *          return new Date(unixDate);
                 *      }
                 *      if (thisAltFormat === 'unix' || thisAltFormat === 'u') {
                 *          return unixDate;
                 *      }
                 *      else {
                 *          var pd = new persianDate(unixDate);
                 *          pd.formatPersian = this.persianDigit;
                 *          return pd.format(self.altFormat);
                 *      }
                 *  }
                 */
                'altFieldFormatter': function altFieldFormatter(unixDate) {
                    var self = this,
                        thisAltFormat = self.altFormat.toLowerCase(),
                        pd = void 0;
                    if (thisAltFormat === 'gregorian' || thisAltFormat === 'g') {
                        return new Date(unixDate);
                    }
                    if (thisAltFormat === 'unix' || thisAltFormat === 'u') {
                        return unixDate;
                    } else {
                        pd = this.model.PersianDate.date(unixDate);
                        return pd.format(self.altFormat);
                    }
                },

                /**
                 * @description Set min date on datepicker, prevent user select date before given unix time
                 * @property minDate
                 * @type Date
                 * @default null
                 */
                'minDate': null,

                /**
                 * @description Set max date on datepicker, prevent user select date after given unix time
                 * @property maxDate
                 * @type Date
                 * @default null
                 */
                'maxDate': null,

                /**
                 * @description navigator config object
                 * @type {object}
                 * @default true
                 */
                'navigator': {
                    /**
                     * @description make navigator enable or disable
                     * @type boolean
                     * @default true
                     */
                    'enabled': true,

                    /**
                     * @description navigate by scroll configuration
                     * @type object
                     * @description scroll navigation options
                     */
                    'scroll': {

                        /**
                         * @description if you want make disable scroll navigation set this option false
                         * @type boolean
                         * @default true
                         */
                        'enabled': true
                    },

                    /**
                     * @description navigator text config object
                     */
                    'text': {
                        /**
                         * @description text of next button
                         * @default '<'
                         */
                        'btnNextText': '<',

                        /**
                         * @description text of prev button
                         * @default: '>'
                         */
                        'btnPrevText': '>'
                    },

                    /**
                     * @description Called when navigator goes to next state
                     * @event
                     * @example function (navigator) {
                     *      //log('navigator next ');
                     *  }
                     */
                    'onNext': function onNext(datepickerObject) {
                        Helper.debug(datepickerObject, 'Event: onNext');
                    },

                    /**
                     * @description Called when navigator goes to previews state
                     * @event
                     * @example function (navigator) {
                     *      //log('navigator prev ');
                     *  }
                     */
                    'onPrev': function onPrev(datepickerObject) {
                        Helper.debug(datepickerObject, 'Event: onPrev');
                    },

                    /**
                     * @description Called when navigator switch
                     * @event
                     * @example function (datepickerObject) {
                            // console.log('navigator switch ');
                     *  }
                     */
                    'onSwitch': function onSwitch(datepickerObject) {
                        Helper.debug(datepickerObject, 'dayPicker Event: onSwitch');
                    }
                },

                /**
                 * @description toolbox config object
                 * @type {object}
                 * @default true
                 */
                'toolbox': {

                    /**
                     * @description boolean option that make toolbar enable or disable
                     * @type boolean
                     * @default true
                     */
                    'enabled': true,

                    /**
                     * @description toolbox button text configuration
                     * @type object
                     * @deprecated from 1.0.0
                     */
                    'text': {

                        /**
                         * @description text of today button, deprecated from 1.0.0
                         * @type string
                         * @default 'امروز'
                         * @deprecated from 1.0.0
                         */
                        btnToday: 'امروز'

                    },

                    /**
                     * @description submit button configuration (only shown on mobile)
                     * @since 1.0.0
                     */
                    submitButton: {

                        /**
                         * @description make submit button enable or disable
                         * @type boolean
                         * @default false
                         * @since 1.0.0
                         */
                        enabled: Helper.isMobile,

                        /**
                         * @description submit button text
                         * @since 1.0.0
                         * @type object
                         */
                        text: {

                            /**
                             * @description show when current calendar is Persian
                             * @since 1.0.0
                             * @type object
                             * @default تایید
                             */
                            fa: 'تایید',

                            /**
                             * @description show when current calendar is Gregorian
                             * @since 1.0.0
                             * @type object
                             * @default submit
                             */
                            en: 'submit'
                        },

                        /**
                         * @description Called when submit button clicked
                         * @since 1.0.0
                         * @type function
                         * @event
                         */
                        onSubmit: function onSubmit(datepickerObject) {
                            Helper.debug(datepickerObject, 'dayPicker Event: onSubmit');
                        }
                    },

                    /**
                     * @description toolbox today button configuration
                     * @since 1.0.0
                     */
                    todayButton: {

                        /**
                         * @description make toolbox today button enable or disable
                         * @type boolean
                         * @since 1.0.0
                         */
                        enabled: true,

                        /**
                         * @description today button text
                         * @since 1.0.0
                         * @type object
                         */
                        text: {

                            /**
                             * @description show when current calendar is Persian
                             * @since 1.0.0
                             * @type object
                             * @default امروز
                             */
                            fa: 'امروز',

                            /**
                             * @description show when current calendar is Gregorian
                             * @since 1.0.0
                             * @type object
                             * @default today
                             */
                            en: 'today'
                        },

                        /**
                         * @description Called when today button clicked
                         * @since 1.0.0
                         * @type function
                         * @event
                         */
                        onToday: function onToday(datepickerObject) {
                            Helper.debug(datepickerObject, 'dayPicker Event: onToday');
                        }
                    },

                    /**
                     * @description toolbox calendar switch configuration
                     * @type object
                     * @since 1.0.0
                     */
                    calendarSwitch: {

                        /**
                         * @description make calendar switch enable or disable
                         * @type boolean
                         * @since 1.0.0
                         * @default true
                         */
                        enabled: true,

                        /**
                         * @description calendar switch text format string
                         * @link http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
                         * @type string
                         * @since 1.0.0
                         * @default MMMM
                         */
                        format: 'MMMM',

                        /**
                         * @description Called when calendar switch clicked
                         * @since 1.0.0
                         * @type function
                         * @event
                         */
                        onSwitch: function onSwitch(datepickerObject) {
                            Helper.debug(datepickerObject, 'dayPicker Event: onSwitch');
                        }
                    },

                    /**
                     * @event
                     * @param toolbox
                     * @example function (toolbox) {
                     *      //log('toolbox today btn');
                     *  }
                     *  @deprecated 1.0.0
                     */
                    onToday: function onToday(datepickerObject) {
                        Helper.debug(datepickerObject, 'dayPicker Event: onToday');
                    }
                },

                /**
                 * @description if true all pickers hide and just show timepicker
                 * @default false
                 * @type boolean
                 */
                'onlyTimePicker': false,

                /**
                 * @description  if true date select just by click on day in month grid, and when user select month or year selected date doesnt change
                 * @property justSelectOnDate
                 * @type boolean
                 * @default: true
                 */
                'onlySelectOnDate': true,

                /**
                 * @description Validate date access before render
                 * @type function
                 */
                'checkDate': function checkDate() {
                    return true;
                },

                /**
                 * @description Validate month access before render
                 * @type {function}
                 */
                'checkMonth': function checkMonth() {
                    return true;
                },

                /**
                 * @description Validate year access before render
                 * @type {function}
                 */
                'checkYear': function checkYear() {
                    return true;
                },

                /**
                 * @description timePicker configuration
                 * @type {object}
                 */
                'timePicker': {

                    /**
                     * @description make timePicker enable or disable
                     * @type boolean
                     */
                    'enabled': false,

                    /**
                     * @description The amount that increases or decreases by pressing the button
                     * @type number
                     */
                    'step': 1,

                    /**
                     * @description hour selector configuration
                     * @type object
                     */
                    'hour': {

                        /**
                         * @description make hour selector enable or disable
                         * @type boolean
                         */
                        'enabled': true,

                        /**
                         * @description The amount that increases or decreases hour, by pressing the button. overwrite by timepicker.step
                         * @type boolean
                         */
                        'step': null
                    },

                    /**
                     * @description minute selector configuration
                     * @type object
                     */
                    'minute': {

                        /**
                         * @description make minute selector enable or disable
                         * @type boolean
                         */
                        'enabled': true,

                        /**
                         * @description The amount that increases or decreases minute, by pressing the button. overwrite by timepicker.step
                         * @description overwrite by parent step
                         * @type boolean
                         */
                        'step': null
                    },

                    /**
                     * @description second selector configuration
                     * @type object
                     */
                    'second': {

                        /**
                         * @description make second selector enable or disable
                         * @type boolean
                         */
                        'enabled': true,

                        /**
                         * @description The amount that increases or decreases second, by pressing the button. overwrite by timepicker.step
                         * @type boolean
                         */
                        'step': null
                    },

                    /**
                     * @description meridian selector configuration
                     * @type object
                     */
                    'meridian': {

                        /**
                         * @description if you set this as false, datepicker timepicker system moved to 24-hour system
                         * @type boolean
                         */
                        'enabled': false
                    }
                },

                /**
                 * @description dayPicker configuration
                 * @type {object}
                 */
                'dayPicker': {

                    /**
                     * @description make daypicker enable or disable
                     * @type boolean
                     * @default true
                     */
                    'enabled': true,

                    /**
                     * @description daypicker title format string
                     * @type string
                     * @default 'YYYY MMMM'
                     * @link http://babakhani.github.io/PersianWebToolkit/doc/persian-date/#format
                     */
                    'titleFormat': 'YYYY MMMM',

                    /**
                     * @description daypicker title formatter function
                     * @param year
                     * @param month
                     * @return {*}
                     */
                    'titleFormatter': function titleFormatter(year, month) {
                        var titleDate = this.model.PersianDate.date([year, month]);
                        return titleDate.format(this.model.options.dayPicker.titleFormat);
                    },

                    /**
                     * @description fired when user select date
                     * @event
                     * @param selectedDayUnix
                     */
                    'onSelect': function onSelect(selectedDayUnix) {
                        Helper.debug(this, 'dayPicker Event: onSelect : ' + selectedDayUnix);
                    }

                },

                /**
                 * @description monthPicker configuration
                 * @type {object}
                 */
                'monthPicker': {

                    /**
                     * @description make monthPicker enable or disable
                     * @type boolean
                     * @default true
                     */
                    'enabled': true,

                    /**
                     * @description monthPicker title format string
                     * @type string
                     * @default 'YYYY'
                     */
                    'titleFormat': 'YYYY',

                    /**
                     * @description monthPicker title formatter function
                     * @param unix
                     * @return {*}
                     */
                    'titleFormatter': function titleFormatter(unix) {
                        var titleDate = this.model.PersianDate.date(unix);
                        return titleDate.format(this.model.options.monthPicker.titleFormat);
                    },

                    /**
                     * @description fired when user select month
                     * @event
                     * @param monthIndex
                     */
                    'onSelect': function onSelect(monthIndex) {
                        Helper.debug(this, 'monthPicker Event: onSelect : ' + monthIndex);
                    }
                },

                /**
                 * @description yearPicker configuration
                 * @type {object}
                 */
                'yearPicker': {

                    /**
                     * @description make yearPicker enable or disable
                     * @type boolean
                     * @default true
                     */
                    'enabled': true,

                    /**
                     * @description yearPicker title format string
                     * @type string
                     * @default 'YYYY'
                     */
                    'titleFormat': 'YYYY',

                    /**
                     * @description yearPicker title formatter function
                     * @param year
                     * @return {string}
                     */
                    'titleFormatter': function titleFormatter(year) {
                        var remaining = parseInt(year / 12, 10) * 12;
                        var startYear = this.model.PersianDate.date([remaining]);
                        var endYear = this.model.PersianDate.date([remaining + 11]);
                        return startYear.format(this.model.options.yearPicker.titleFormat) + '-' + endYear.format(this.model.options.yearPicker.titleFormat);
                    },

                    /**
                     * @description fired when user select year
                     * @event
                     * @param year
                     */
                    'onSelect': function onSelect(year) {
                        Helper.debug(this, 'yearPicker Event: onSelect : ' + year);
                    }
                },

                /**
                 * @description Called when date Select by user.
                 * @event
                 * @param unixDate
                 */
                'onSelect': function onSelect(unixDate) {
                    Helper.debug(this, 'datepicker Event: onSelect : ' + unixDate);
                },

                /**
                 * @description Called when date Select by api.
                 * @event
                 * @param unixDate
                 */
                'onSet': function onSet(unixDate) {
                    Helper.debug(this, 'datepicker Event: onSet : ' + unixDate);
                },

                /**
                 * @description position of datepicker relative to input element
                 * @type string | array
                 * @default 'auto'
                 * @example
                 *  'position': 'auto'
                 *'position': [10,10]
                 */
                'position': 'auto',

                /**
                 * @description A function that takes current datepicker instance. It is called just before the datepicker is displayed.
                 * @event
                 */
                'onShow': function onShow(datepickerObject) {
                    Helper.debug(datepickerObject, 'Event: onShow ');
                },

                /**
                 * @description A function that takes current datepicker instance. It is called just before the datepicker Hide.
                 * @event
                 */
                'onHide': function onHide(datepickerObject) {
                    Helper.debug(datepickerObject, 'Event: onHide ');
                },

                /**
                 * @description on toggle datepicker event
                 * @event
                 */
                'onToggle': function onToggle(datepickerObject) {
                    Helper.debug(datepickerObject, 'Event: onToggle ');
                },

                /**
                 * @description on destroy datepicker event
                 * @event
                 */
                'onDestroy': function onDestroy(datepickerObject) {
                    Helper.debug(datepickerObject, 'Event: onDestroy ');
                },

                /**
                 * @description If true datepicker close When select a date
                 * @type {boolean}
                 * @default false
                 */
                'autoClose': false,

                /**
                 * @description by default datepicker have a template string, and you can overwrite it simply by replace string in config.
                 * @type string
                 * @example
                 * <div id="plotId" class="datepicker-plot-area datepicker-plot-area-inline-view">
                 {{#navigator.enabled}}
                 <div class="navigator">
                 <div class="datepicker-header">
                 <div class="btn btn-next">{{navigator.text.btnNextText}}</div>
                 <div class="btn btn-switch">{{ navigator.switch.text }}</div>
                 <div class="btn btn-prev">{{navigator.text.btnPrevText}}</div>
                 </div>
                 </div>
                 {{/navigator.enabled}}
                 <div class="datepicker-grid-view" >
                 {{#days.enabled}}
                 {{#days.viewMode}}
                 <div class="datepicker-day-view" >
                 <div class="month-grid-box">
                 <div class="header">
                 <div class="title"></div>
                 <div class="header-row">
                 <div class="header-row-cell">ش</div>
                 <div class="header-row-cell">ی</div>
                 <div class="header-row-cell">د</div>
                 <div class="header-row-cell">س</div>
                 <div class="header-row-cell">چ</div>
                 <div class="header-row-cell">پ</div>
                 <div class="header-row-cell">ج</div>
                 </div>
                 </div>
                 <table cellspacing="0" class="table-days">
                 <tbody>
                 {{#days.list}}
                  <tr>
                 {{#.}}
                  {{#enabled}}
                 <td data-unix="{{dataUnix}}" ><span  class="{{#otherMonth}}other-month{{/otherMonth}} {{#selected}}selected{{/selected}}">{{title}}</span></td>
                 {{/enabled}}
                 {{^enabled}}
                 <td data-unix="{{dataUnix}}" class="disabled"><span class="{{#otherMonth}}other-month{{/otherMonth}}">{{title}}</span></td>
                 {{/enabled}}
                  {{/.}}
                 </tr>
                 {{/days.list}}
                 </tbody>
                 </table>
                 </div>
                 </div>
                 {{/days.viewMode}}
                 {{/days.enabled}}
                  {{#month.enabled}}
                 {{#month.viewMode}}
                 <div class="datepicker-month-view">
                 {{#month.list}}
                 {{#enabled}}
                 <div data-month="{{dataMonth}}" class="month-item {{#selected}}selected{{/selected}}">{{title}}</small></div>
                 {{/enabled}}
                 {{^enabled}}
                 <div data-month="{{dataMonth}}" class="month-item month-item-disable {{#selected}}selected{{/selected}}">{{title}}</small></div>
                 {{/enabled}}
                 {{/month.list}}
                 </div>
                 {{/month.viewMode}}
                 {{/month.enabled}}
                  {{#year.enabled }}
                 {{#year.viewMode }}
                 <div class="datepicker-year-view" >
                 {{#year.list}}
                 {{#enabled}}
                 <div data-year="{{dataYear}}" class="year-item {{#selected}}selected{{/selected}}">{{title}}</div>
                 {{/enabled}}
                 {{^enabled}}
                 <div data-year="{{dataYear}}" class="year-item year-item-disable {{#selected}}selected{{/selected}}">{{title}}</div>
                 {{/enabled}}
                 {{/year.list}}
                 </div>
                 {{/year.viewMode }}
                 {{/year.enabled }}
                  </div>
                 {{#time}}
                 {{#enabled}}
                 <div class="datepicker-time-view">
                 {{#hour.enabled}}
                 <div class="hour time-segment" data-time-key="hour">
                 <div class="up-btn" data-time-key="hour">▲</div>
                 <input value="{{hour.title}}" type="text" placeholder="hour" class="hour-input">
                 <div class="down-btn" data-time-key="hour">▼</div>
                 </div>
                 <div class="divider">:</div>
                 {{/hour.enabled}}
                 {{#minute.enabled}}
                 <div class="minute time-segment" data-time-key="minute" >
                 <div class="up-btn" data-time-key="minute">▲</div>
                 <input value="{{minute.title}}" type="text" placeholder="minute" class="minute-input">
                 <div class="down-btn" data-time-key="minute">▼</div>
                 </div>
                 <div class="divider second-divider">:</div>
                 {{/minute.enabled}}
                 {{#second.enabled}}
                 <div class="second time-segment" data-time-key="second"  >
                 <div class="up-btn" data-time-key="second" >▲</div>
                 <input value="{{second.title}}"  type="text" placeholder="second" class="second-input">
                 <div class="down-btn" data-time-key="second" >▼</div>
                 </div>
                 <div class="divider meridian-divider"></div>
                 <div class="divider meridian-divider"></div>
                 {{/second.enabled}}
                 {{#meridian.enabled}}
                 <div class="meridian time-segment" data-time-key="meridian" >
                 <div class="up-btn" data-time-key="meridian">▲</div>
                 <input value="{{meridian.title}}" type="text" class="meridian-input">
                 <div class="down-btn" data-time-key="meridian">▼</div>
                 </div>
                 {{/meridian.enabled}}
                 </div>
                 {{/enabled}}
                 {{/time}}
                  {{#toolbox}}
                 {{#enabled}}
                 <div class="toolbox ">
                 <div class="btn-today">{{text.btnToday}}</div>
                 </div>
                 {{/enabled}}
                 {{/toolbox}}
                 </div>
                 */
                'template': null,

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////// Under Implement ///////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                /**
                 * @description if true datepicker update self by user inputted date string, accept 'yyyy/mm/dd'
                 * @example '1396/10/2', ''
                 * @type {boolean}
                 * @default false
                 */
                'observer': false,

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////// Un  implemented ///////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                /**
                 * @description waite time for last user key-down event, accept millisecond
                 * @type {number}
                 * @default 800
                 */
                'inputDelay': 800
            };

            module.exports = Config;

            /***/
        }),
/* 5 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var Model = __webpack_require__(2);

            /**
             * @author babakhani.reza@gmail.com
             * @description jquery plugin initializer
             */
            (function ($) {
                /*eslint-disable no-unused-vars */
                $.fn.persianDatepicker = $.fn.pDatepicker = function (options) {
                    var args = Array.prototype.slice.call(arguments),
                        output = null,
                        self = this;
                    if (!this) {
                        $.error('Invalid selector');
                    }
                    $(this).each(function () {
                        // encapsulation Args
                        var emptyArr = [],
                            tempArg = args.concat(emptyArr),
                            dp = $(this).data('datepicker'),
                            funcName = null;
                        if (dp && typeof tempArg[0] === 'string') {
                            funcName = tempArg[0];
                            output = dp[funcName](tempArg[0]);
                        } else {
                            self.pDatePicker = new Model(this, options);
                        }
                    });
                    $(this).data('datepicker', self.pDatePicker);
                    return self.pDatePicker;
                };
                /*eslint-enable no-unused-vars */
            })(jQuery);

            /***/
        }),
/* 6 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Helper = __webpack_require__(0);
            var PersianDateParser = __webpack_require__(9);
            /**
             * Do every thing about input element like get default value, set new value, set alt field input and etc.
             */

            var Input = function () {

                /**
                 * @param {Model} model
                 * @param {Element}
                 * @return {Input}
                 */
                function Input(model, inputElement) {
                    _classCallCheck(this, Input);

                    /**
                     * @type {Object}
                     */
                    this.model = model;

                    /**
                     * @type {boolean}
                     * @private
                     */
                    this._firstUpdate = true;

                    /**
                     * @type {Element}
                     */
                    this.elem = inputElement;

                    if (this.model.options.observer) {
                        this.observe();
                    }

                    this.addInitialClass();

                    /**
                     * @type {Number}
                     */
                    this.initialUnix = null;

                    if (this.model.options.inline == false) {
                        this._attachInputElementEvents();
                    }

                    return this;
                }

                _createClass(Input, [{
                    key: 'addInitialClass',
                    value: function addInitialClass() {
                        $(this.elem).addClass('pwt-datepicker-input-element');
                    }
                }, {
                    key: 'parseInput',
                    value: function parseInput(inputString) {
                        var parse = new PersianDateParser(),
                            that = this;
                        if (parse.parse(inputString) !== undefined) {
                            var pd = this.model.PersianDate.date(parse.parse(inputString)).valueOf();
                            that.model.state.setSelectedDateTime('unix', pd);
                            that.model.state.setViewDateTime('unix', pd);
                            that.model.view.render();
                        }
                    }
                }, {
                    key: 'observe',
                    value: function observe() {
                        var that = this;
                        /////////////////   Manipulate by Copy And paste
                        $(that.elem).bind('paste', function (e) {
                            Helper.delay(function () {
                                that.parseInput(e.target.value);
                            }, 60);
                        });
                        var typingTimer = void 0,
                            doneTypingInterval = that.model.options.inputDelay,
                            ctrlDown = false,
                            ctrlKey = [17, 91],
                            vKey = 86;

                        $(document).keydown(function (e) {
                            if ($.inArray(e.keyCode, ctrlKey) > 0) ctrlDown = true;
                        }).keyup(function (e) {
                            if ($.inArray(e.keyCode, ctrlKey) > 0) ctrlDown = false;
                        });

                        $(that.elem).bind('keyup', function (e) {
                            var $self = $(this);
                            var trueKey = false;
                            if (e.keyCode === 8 || e.keyCode < 105 && e.keyCode > 96 || e.keyCode < 58 && e.keyCode > 47 || ctrlDown && (e.keyCode == vKey || $.inArray(e.keyCode, ctrlKey) > 0)) {
                                trueKey = true;
                            }
                            if (trueKey) {
                                clearTimeout(typingTimer);
                                typingTimer = setTimeout(function () {
                                    doneTyping($self);
                                }, doneTypingInterval);
                            }
                        });

                        $(that.elem).on('keydown', function () {
                            clearTimeout(typingTimer);
                        });
                        function doneTyping($self) {
                            that.parseInput($self.val());
                        }

                        /////////////////   Manipulate by alt changes
                        // TODO
                        // self.model.options.altField.bind("change", function () {
                        //     //if (!self._flagSelfManipulate) {
                        //         let newDate = new Date($(this).val());
                        //         if (newDate !== "Invalid Date") {
                        //             let newPersainDate = this.model.PersianDate.date(newDate);
                        //             self.selectDate(newPersainDate.valueOf());
                        //         }
                        //   //  }
                        // });
                    }

                    /**
                     * @private
                     * @desc attach events to input field
                     */

                }, {
                    key: '_attachInputElementEvents',
                    value: function _attachInputElementEvents() {
                        var that = this;
                        var closePickerHandler = function closePickerHandler(e) {
                            if (!$(e.target).is(that.elem) && !$(e.target).is(that.model.view.$container) && $(e.target).closest('#' + that.model.view.$container.attr('id')).length == 0 && !$(e.target).is($(that.elem).children())) {
                                that.model.api.hide();
                                $('body').unbind('click', closePickerHandler);
                            }
                        };

                        $(this.elem).on('focus click', Helper.debounce(function (evt) {
                            that.model.api.show();
                            if (that.model.state.ui.isInline === false) {
                                $('body').unbind('click', closePickerHandler).bind('click', closePickerHandler);
                            }
                            if (Helper.isMobile) {
                                $(this).blur();
                            }
                            evt.stopPropagation();
                            return false;
                        }, 200));

                        $(this.elem).on('keydown', Helper.debounce(function (evt) {
                            if (evt.which === 9) {
                                that.model.api.hide();
                                return false;
                            }
                        }, 200));
                    }

                    /**
                     * @desc get <input/> element position
                     * @return {{top: Number, left: Number}}
                     * @todo remove jquery
                     */

                }, {
                    key: 'getInputPosition',
                    value: function getInputPosition() {
                        return $(this.elem).offset();
                    }

                    /**
                     * @desc get <input/> element size
                     * @return {{width: Number, height: Number}}
                     * @todo remove jquery
                     */

                }, {
                    key: 'getInputSize',
                    value: function getInputSize() {
                        return {
                            width: $(this.elem).outerWidth(),
                            height: $(this.elem).outerHeight()
                        };
                    }

                    /**
                     * @desc update <input/> element value
                     * @param {Number} unix
                     * @todo remove jquery
                     * @private
                     */

                }, {
                    key: '_updateAltField',
                    value: function _updateAltField(unix) {
                        var value = this.model.options.altFieldFormatter(unix);
                        $(this.model.options.altField).val(value);
                    }

                    /**
                     * @desc update <input/> element value
                     * @param {Number} unix
                     * @todo remove jquery
                     * @private
                     */

                }, {
                    key: '_updateInputField',
                    value: function _updateInputField(unix) {
                        var value = this.model.options.formatter(unix);
                        if ($(this.elem).val() != value) {
                            $(this.elem).val(value);
                        }
                    }

                    /**
                     * @param unix
                     */

                }, {
                    key: 'update',
                    value: function update(unix) {
                        if (this.model.options.initialValue == false && this._firstUpdate) {
                            this._firstUpdate = false;
                        } else {
                            this._updateInputField(unix);
                            this._updateAltField(unix);
                        }
                    }

                    /**
                     * @desc return initial value
                     * @return {Number} - unix
                     */

                }, {
                    key: 'getOnInitState',
                    value: function getOnInitState() {
                        var persianDatePickerTimeRegex = '^([0-1][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$';
                        var garegurianDate = null,
                            $inputElem = $(this.elem),
                            inputValue = void 0;

                        // Define input value by check inline mode and input mode

                        if ($inputElem[0].nodeName === 'INPUT') {
                            inputValue = $inputElem[0].getAttribute('value');
                        } else {
                            inputValue = $inputElem.data('date');
                        }

                        // Check time string by regex
                        if (inputValue && inputValue.match(persianDatePickerTimeRegex)) {
                            var timeArray = inputValue.split(':'),
                                tempDate = new Date();
                            tempDate.setHours(timeArray[0]);
                            tempDate.setMinutes(timeArray[1]);
                            if (timeArray[2]) {
                                tempDate.setSeconds(timeArray[2]);
                            } else {
                                tempDate.setSeconds(0);
                            }
                            this.initialUnix = tempDate.valueOf();
                        } else {
                            if (this.model.options.initialValueType === 'persian' && inputValue) {
                                var parse = new PersianDateParser();
                                var pd = new persianDate(parse.parse(inputValue)).valueOf();
                                garegurianDate = new Date(pd).valueOf();
                            } else if (this.model.options.initialValueType === 'unix' && inputValue) {
                                garegurianDate = parseInt(inputValue);
                            } else if (inputValue) {
                                garegurianDate = new Date(inputValue).valueOf();
                            }
                            if (garegurianDate && garegurianDate != 'undefined') {
                                this.initialUnix = garegurianDate;
                            } else {
                                this.initialUnix = new Date().valueOf();
                            }
                        }
                        return this.initialUnix;
                    }
                }]);

                return Input;
            }();

            module.exports = Input;

            /***/
        }),
/* 7 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Hamster = __webpack_require__(14);

            /**
             * This navigator class do every thing about navigate and select date
             * @public
             */

            var Navigator = function () {

                /**
                 * @param {object} datepicker
                 * @return {Navigator}
                 */
                function Navigator(model) {
                    _classCallCheck(this, Navigator);

                    /**
                     * @type {Datepicker}
                     */
                    this.model = model;
                    this.liveAttach();
                    this._attachEvents();
                    return this;
                }

                /**
                 * @desc attach events that needed attach after every render
                 * @public
                 * @todo attach as a live way
                 */


                _createClass(Navigator, [{
                    key: 'liveAttach',
                    value: function liveAttach() {
                        // Check options
                        if (this.model.options.navigator.scroll.enabled) {
                            var that = this;
                            var gridPlot = $('#' + that.model.view.id + ' .datepicker-grid-view')[0];
                            Hamster(gridPlot).wheel(function (event, delta) {
                                if (delta > 0) {
                                    that.model.state.navigate('next');
                                } else {
                                    that.model.state.navigate('prev');
                                }
                                that.model.view.render();
                                event.preventDefault();
                            });

                            if (this.model.options.timePicker.enabled) {
                                $('#' + that.model.view.id + ' .time-segment').each(function () {
                                    Hamster(this).wheel(function (event, delta) {
                                        var $target = $(event.target);
                                        var key = $target.data('time-key') ? $target.data('time-key') : $target.parents('[data-time-key]').data('time-key');
                                        if (key) {
                                            if (delta > 0) {
                                                that.timeUp(key);
                                            } else {
                                                that.timeDown(key);
                                            }
                                        }
                                        that.model.view.render();
                                        event.preventDefault();
                                    });
                                });
                            }
                        }
                    }

                    /**
                     * @desc set time up depend to timekey
                     * @param {String} timekey - accept hour, minute,second
                     * @public
                     */

                }, {
                    key: 'timeUp',
                    value: function timeUp(timekey) {
                        if (this.model.options.timePicker[timekey] == undefined) {
                            return;
                        }
                        var step = void 0,
                            t = void 0,
                            that = this;
                        if (timekey == 'meridian') {
                            step = 12;
                            if (this.model.state.view.meridian == 'PM') {
                                t = this.model.PersianDate.date(this.model.state.selected.unixDate).add('hour', step).valueOf();
                            } else {
                                t = this.model.PersianDate.date(this.model.state.selected.unixDate).subtract('hour', step).valueOf();
                            }
                            this.model.state.meridianToggle();
                        } else {
                            step = this.model.options.timePicker[timekey].step;
                            t = this.model.PersianDate.date(this.model.state.selected.unixDate).add(timekey, step).valueOf();
                        }
                        this.model.state.setViewDateTime('unix', t);
                        this.model.state.setSelectedDateTime('unix', t);
                        this.model.view.renderTimePartial();
                        clearTimeout(this.scrollDelayTimeDown);
                        this.scrollDelayTimeUp = setTimeout(function () {
                            that.model.view.markSelectedDay();
                        }, 300);
                    }

                    /**
                     * @desc set time down depend to timekey
                     * @param {String} timekey - accept hour, minute,second
                     * @public
                     */

                }, {
                    key: 'timeDown',
                    value: function timeDown(timekey) {
                        if (this.model.options.timePicker[timekey] == undefined) {
                            return;
                        }
                        var step = void 0,
                            t = void 0,
                            that = this;
                        if (timekey == 'meridian') {
                            step = 12;
                            if (this.model.state.view.meridian == 'AM') {
                                t = this.model.PersianDate.date(this.model.state.selected.unixDate).add('hour', step).valueOf();
                            } else {
                                t = this.model.PersianDate.date(this.model.state.selected.unixDate).subtract('hour', step).valueOf();
                            }
                            this.model.state.meridianToggle();
                        } else {
                            step = this.model.options.timePicker[timekey].step;
                            t = this.model.PersianDate.date(this.model.state.selected.unixDate).subtract(timekey, step).valueOf();
                        }
                        this.model.state.setViewDateTime('unix', t);
                        this.model.state.setSelectedDateTime('unix', t);
                        this.model.view.renderTimePartial();
                        clearTimeout(this.scrollDelayTimeDown);
                        this.scrollDelayTimeDown = setTimeout(function () {
                            that.model.view.markSelectedDay();
                        }, 300);
                    }

                    /**
                     * @desc attach dom events
                     * @todo remove jquery
                     * @private
                     */

                }, {
                    key: '_attachEvents',
                    value: function _attachEvents() {
                        var that = this;

                        if (this.model.options.navigator.enabled) {
                            /**
                             * @description navigator click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .pwt-btn', function () {
                                if ($(this).is('.pwt-btn-next')) {
                                    that.model.state.navigate('next');
                                    that.model.view.render();
                                    that.model.options.navigator.onNext(that.model);
                                } else if ($(this).is('.pwt-btn-switch')) {
                                    that.model.state.switchViewMode();
                                    that.model.view.render();
                                    that.model.options.navigator.onSwitch(that.model);
                                } else if ($(this).is('.pwt-btn-prev')) {
                                    that.model.state.navigate('prev');
                                    that.model.view.render();
                                    that.model.options.navigator.onPrev(that.model);
                                }
                            });
                        }

                        /**
                         * @description check if timePicker enabled attach Events
                         */
                        if (this.model.options.timePicker.enabled) {

                            /**
                             * @description time up btn click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .up-btn', function () {
                                var timekey = $(this).data('time-key');
                                that.timeUp(timekey);
                                that.model.options.onSelect(that.model.state.selected.unixDate);
                            });

                            /**
                             * @description time down btn click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .down-btn', function () {
                                var timekey = $(this).data('time-key');
                                that.timeDown(timekey);
                                that.model.options.onSelect(that.model.state.selected.unixDate);
                            });
                        }

                        /**
                         * @description check if dayPicker enabled attach Events
                         */
                        if (this.model.options.dayPicker.enabled) {

                            /**
                             * @description days click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .datepicker-day-view td:not(.disabled)', function () {
                                var thisUnix = $(this).data('unix'),
                                    mustRender = void 0;
                                that.model.state.setSelectedDateTime('unix', thisUnix);
                                if (that.model.state.selected.month !== that.model.state.view.month) {
                                    mustRender = true;
                                } else {
                                    mustRender = false;
                                }
                                that.model.state.setViewDateTime('unix', that.model.state.selected.unixDate);
                                if (that.model.options.autoClose) {
                                    that.model.view.hide();
                                    that.model.options.onHide(that);
                                }
                                if (mustRender) {
                                    that.model.view.render();
                                } else {
                                    that.model.view.markSelectedDay();
                                }
                                that.model.options.dayPicker.onSelect(thisUnix);
                                that.model.options.onSelect(thisUnix);
                            });
                        }

                        /**
                         * @description check if monthPicker enabled attach Events
                         */
                        if (this.model.options.monthPicker.enabled) {

                            /**
                             * @description month click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .datepicker-month-view .month-item:not(.month-item-disable)', function () {
                                var month = $(this).data('month');
                                var year = $(this).data('year');
                                that.model.state.switchViewModeTo('day');
                                if (!that.model.options.onlySelectOnDate) {
                                    that.model.state.setSelectedDateTime('year', year);
                                    that.model.state.setSelectedDateTime('month', month);
                                    if (that.model.options.autoClose) {
                                        that.model.view.hide();
                                        that.model.options.onHide(that);
                                    }
                                }
                                that.model.state.setViewDateTime('month', month);
                                that.model.view.render();
                                that.model.options.monthPicker.onSelect(month);
                                that.model.options.onSelect(that.model.state.selected.unixDate);
                            });
                        }

                        /**
                         * @description check if yearPicker enabled attach Events
                         */
                        if (this.model.options.yearPicker.enabled) {

                            /**
                             * @description year click event
                             */
                            $(document).on('click', '#' + that.model.view.id + ' .datepicker-year-view .year-item:not(.year-item-disable)', function () {
                                var year = $(this).data('year');
                                that.model.state.switchViewModeTo('month');
                                if (!that.model.options.onlySelectOnDate) {
                                    that.model.state.setSelectedDateTime('year', year);
                                    if (that.model.options.autoClose) {
                                        that.model.view.hide();
                                        that.model.options.onHide(that);
                                    }
                                }
                                that.model.state.setViewDateTime('year', year);
                                that.model.view.render();
                                that.model.options.yearPicker.onSelect(year);
                                that.model.options.onSelect(that.model.state.selected.unixDate);
                            });
                        }
                    }
                }]);

                return Navigator;
            }();

            module.exports = Navigator;

            /***/
        }),
/* 8 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Config = __webpack_require__(4);
            var Template = __webpack_require__(1);
            /**
             * Extend default config from user interred and do compatibility works
             * @public
             */

            var Options = function () {

                /**
                 * @param {object} options config passed when initialize
                 * @return {object}
                 * @todo remove jquery
                 */
                function Options(options, model) {
                    _classCallCheck(this, Options);

                    this.model = model;
                    return this._compatibility($.extend(true, this, Config, options));
                }

                /**
                 * @private
                 * @param options
                 */


                _createClass(Options, [{
                    key: '_compatibility',
                    value: function _compatibility(options) {

                        if (options.inline) {
                            options.toolbox.submitButton.enabled = false;
                        }

                        if (!options.template) {
                            options.template = Template;
                        }
                        persianDate.toCalendar(options.calendarType);
                        persianDate.toLocale(options.calendar[options.calendarType].locale);
                        if (options.onlyTimePicker) {
                            options.dayPicker.enabled = false;
                            options.monthPicker.enabled = false;
                            options.yearPicker.enabled = false;
                            options.navigator.enabled = false;
                            options.toolbox.enabled = false;
                            options.timePicker.enabled = true;
                        }

                        if (options.timePicker.hour.step === null) {
                            options.timePicker.hour.step = options.timePicker.step;
                        }
                        if (options.timePicker.minute.step === null) {
                            options.timePicker.minute.step = options.timePicker.step;
                        }
                        if (options.timePicker.second.step === null) {
                            options.timePicker.second.step = options.timePicker.step;
                        }

                        if (options.dayPicker.enabled === false) {
                            options.onlySelectOnDate = false;
                        }

                        options._viewModeList = [];
                        if (options.dayPicker.enabled) {
                            options._viewModeList.push('day');
                        }
                        if (options.monthPicker.enabled) {
                            options._viewModeList.push('month');
                        }
                        if (options.yearPicker.enabled) {
                            options._viewModeList.push('year');
                        }
                    }
                }]);

                return Options;
            }();

            module.exports = Options;

            /***/
        }),
/* 9 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var PersianDateParser = function () {
                function PersianDateParser() {
                    _classCallCheck(this, PersianDateParser);

                    this.pattern = {
                        iso: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$/g,
                        jalali: /^[1-4]\d{3}(\/|-|\.)((0?[1-6](\/|-|\.)((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))(\/|-|\.)(30|([1-2][0-9])|(0?[1-9]))))$/g
                    };
                }

                _createClass(PersianDateParser, [{
                    key: 'parse',
                    value: function parse(inputString) {
                        var that = this,
                            persianDateArray = void 0,
                            isoPat = new RegExp(that.pattern.iso),
                            jalaliPat = new RegExp(that.pattern.jalali);

                        String.prototype.toEnglishDigits = function () {
                            var charCodeZero = '۰'.charCodeAt(0);
                            return this.replace(/[۰-۹]/g, function (w) {
                                return w.charCodeAt(0) - charCodeZero;
                            });
                        };

                        inputString = inputString.toEnglishDigits();
                        if (jalaliPat.test(inputString)) {
                            /* eslint-disable no-useless-escape */
                            persianDateArray = inputString.split(/\/|-|\,|\./).map(Number);
                            /* eslint-enable no-useless-escape */
                            return persianDateArray;
                        } else if (isoPat.test(inputString)) {
                            /* eslint-disable no-useless-escape */
                            persianDateArray = inputString.split(/\/|-|\,|\:|\T|\Z/g).map(Number);
                            return persianDateArray;
                            /* eslint-enable no-useless-escape */
                        } else {
                            return undefined;
                        }
                    }
                }]);

                return PersianDateParser;
            }();

            module.exports = PersianDateParser;

            /***/
        }),
/* 10 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var PersianDateWrapper = function () {
                function PersianDateWrapper(model) {
                    _classCallCheck(this, PersianDateWrapper);

                    this.model = model;
                    this.model.options.calendar_ = this.model.options.calendarType;
                    this.model.options.locale_ = this.model.options.calendar[this.model.options.calendarType].locale;
                    return this;
                }

                _createClass(PersianDateWrapper, [{
                    key: "date",
                    value: function date(input) {
                        if (window.inspdCount || window.inspdCount === 0) {
                            window.inspdCount++;
                        } else {
                            window.inspdCount = 0;
                        }
                        var that = this;
                        var output = void 0,
                            cp = void 0;
                        cp = persianDate.toCalendar(that.model.options.calendar_);
                        if (this.model.options.calendar[this.model.options.calendarType].leapYearMode) {
                            cp.toLeapYearMode(this.model.options.calendar[this.model.options.calendarType].leapYearMode);
                        }
                        output = new cp(input);
                        return output.toLocale(that.model.options.locale_);
                    }
                }]);

                return PersianDateWrapper;
            }();

            module.exports = PersianDateWrapper;

            /***/
        }),
/* 11 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            /**
             * All state set in his object and get from this
             * also this object notify other object to update self or update view or etc.
             */
            var State = function () {

                /**
                 * @param {model} model
                 * @return {State}
                 */
                function State(model) {
                    _classCallCheck(this, State);

                    /**
                     * @type {object}
                     */
                    this.model = model;

                    /**
                     * @type {Boolean}
                     */
                    this.filetredDate = this.model.options.minDate || this.model.options.maxDate;

                    /**
                     * @desc get generated view mode list from options object
                     * @type {Array}
                     */
                    this.viewModeList = this.model.options._viewModeList;

                    /**
                     * @desc view mode string day, month, year
                     * @type {String}
                     * @default day
                     * @todo add time to view modes
                     */
                    this.viewMode = this.viewModeList.indexOf(model.options.viewMode) > 0 ? model.options.viewMode : this.viewModeList[0];

                    /**
                     * @desc view mode string index in view mode list
                     * @type {number}
                     */
                    this.viewModeIndex = this.viewModeList.indexOf(model.options.viewMode) > 0 ? this.viewModeList.indexOf(model.options.viewMode) : 0; // defaul 'day'


                    /**
                     * @desc contain filtered date objects
                     * @type {{start: {year: number, month: number, date: number, hour: number, minute: number, second: number, unixDate: number}, end: {year: number, month: number, date: number, hour: number, minute: number, second: number, unixDate: number}}}
                     */
                    this.filterDate = {
                        start: {
                            year: 0,
                            month: 0,
                            date: 0,
                            hour: 0,
                            minute: 0,
                            second: 0,
                            unixDate: 0
                        },
                        end: {
                            year: 0,
                            month: 0,
                            date: 0,
                            hour: 0,
                            minute: 0,
                            second: 0,
                            unixDate: 0
                        }
                    };

                    /**
                     * @desc contain view date object
                     * @type {{year: number, month: number, date: number, hour: number, minute: number, second: number, unixDate: number, dateObject: null, meridian: string}}
                     */
                    this.view = {
                        year: 0,
                        month: 0,
                        date: 0,
                        hour: 0,
                        minute: 0,
                        second: 0,
                        unixDate: 0,
                        dateObject: null,
                        meridian: 'AM'
                    };

                    /**
                     * @desc contain selected date object
                     * @type {{year: number, month: number, date: number, hour: number, minute: number, second: number, unixDate: number, dateObject: null}}
                     */
                    this.selected = {
                        year: 0,
                        month: 0,
                        date: 0,
                        hour: 0,
                        hour12: 0,
                        minute: 0,
                        second: 0,
                        unixDate: 0,
                        dateObject: null
                    };

                    this.ui = {
                        isOpen: false,
                        isInline: this.model.options.inline
                    };

                    this._setFilterDate(this.model.options.minDate, this.model.options.maxDate);
                    return this;
                }

                /**
                 * @private
                 * @param minDate
                 * @param maxDate
                 */


                _createClass(State, [{
                    key: '_setFilterDate',
                    value: function _setFilterDate(minDate, maxDate) {
                        var self = this;
                        if (!minDate) {
                            minDate = -2000000000000000;
                        }
                        if (!maxDate) {
                            maxDate = 2000000000000000;
                        }
                        var pd = self.model.PersianDate.date(minDate);
                        self.filterDate.start.unixDate = minDate;
                        self.filterDate.start.hour = pd.hour();
                        self.filterDate.start.minute = pd.minute();
                        self.filterDate.start.second = pd.second();
                        self.filterDate.start.month = pd.month();
                        self.filterDate.start.date = pd.date();
                        self.filterDate.start.year = pd.year();

                        var pdEnd = self.model.PersianDate.date(maxDate);
                        self.filterDate.end.unixDate = maxDate;
                        self.filterDate.end.hour = pdEnd.hour();
                        self.filterDate.end.minute = pdEnd.minute();
                        self.filterDate.end.second = pdEnd.second();
                        self.filterDate.end.month = pdEnd.month();
                        self.filterDate.end.date = pdEnd.date();
                        self.filterDate.end.year = pdEnd.year();
                    }

                    /**
                     * @desc change view state
                     * @param {String} nav - accept next, prev
                     */

                }, {
                    key: 'navigate',
                    value: function navigate(nav) {
                        if (nav == 'next') {
                            if (this.viewMode == 'year') {
                                this.setViewDateTime('year', this.view.year + 12);
                            }
                            if (this.viewMode == 'month') {
                                var newYear = this.view.year + 1;
                                if (newYear === 0) {
                                    newYear = 1;
                                }
                                this.setViewDateTime('year', newYear);
                            }
                            if (this.viewMode == 'day') {
                                var _newYear = this.view.year + 1;
                                if (_newYear === 0) {
                                    _newYear = 1;
                                }
                                if (this.view.month + 1 == 13) {
                                    this.setViewDateTime('year', _newYear);
                                    this.setViewDateTime('month', 1);
                                } else {
                                    this.setViewDateTime('month', this.view.month + 1);
                                }
                            }
                        } else {
                            if (this.viewMode == 'year') {
                                this.setViewDateTime('year', this.view.year - 12);
                            }
                            if (this.viewMode == 'month') {
                                var _newYear2 = this.view.year - 1;
                                if (_newYear2 === 0) {
                                    _newYear2 = -1;
                                }
                                this.setViewDateTime('year', _newYear2);
                            }
                            if (this.viewMode == 'day') {
                                if (this.view.month - 1 <= 0) {
                                    var _newYear3 = this.view.year - 1;
                                    if (_newYear3 === 0) {
                                        _newYear3 = -1;
                                    }
                                    this.setViewDateTime('year', _newYear3);
                                    this.setViewDateTime('month', 12);
                                } else {
                                    this.setViewDateTime('month', this.view.month - 1);
                                }
                            }
                        }
                    }

                    /**
                     * @public
                     * @desc every time called view state changed to next in queue
                     * @return {State}
                     */

                }, {
                    key: 'switchViewMode',
                    value: function switchViewMode() {
                        this.viewModeIndex = this.viewModeIndex + 1 >= this.viewModeList.length ? 0 : this.viewModeIndex + 1;
                        this.viewMode = this.viewModeList[this.viewModeIndex] ? this.viewModeList[this.viewModeIndex] : this.viewModeList[0];
                        this._setViewDateTimeUnix();
                        return this;
                    }

                    /**
                     * @desc switch to specified view mode
                     * @param {String} viewMode - accept date, month, year
                     */

                }, {
                    key: 'switchViewModeTo',
                    value: function switchViewModeTo(viewMode) {
                        if (this.viewModeList.indexOf(viewMode) >= 0) {
                            this.viewMode = viewMode;
                            this.viewModeIndex = this.viewModeList.indexOf(viewMode);
                        }
                    }

                    /**
                     * @desc called on date select
                     * @param {String} key - accept date, month, year, hour, minute, second
                     * @param {Number} value
                     * @public
                     * @return {State}
                     */

                }, {
                    key: 'setSelectedDateTime',
                    value: function setSelectedDateTime(key, value) {
                        var that = this;
                        switch (key) {
                            case 'unix':
                                that.selected.unixDate = value;
                                var pd = this.model.PersianDate.date(value);
                                that.selected.year = pd.year();
                                that.selected.month = pd.month();
                                that.selected.date = pd.date();
                                that.selected.hour = pd.hour();
                                that.selected.hour12 = pd.format('hh');
                                that.selected.minute = pd.minute();
                                that.selected.second = pd.second();
                                break;
                            case 'year':
                                this.selected.year = value;
                                break;
                            case 'month':
                                this.selected.month = value;
                                break;
                            case 'date':
                                this.selected.date = value;
                                break;
                            case 'hour':
                                this.selected.hour = value;
                                break;
                            case 'minute':
                                this.selected.minute = value;
                                break;
                            case 'second':
                                this.selected.second = value;
                                break;
                        }
                        that._updateSelectedUnix();
                        return this;
                    }

                    /**
                     * @return {State}
                     * @private
                     */

                }, {
                    key: '_updateSelectedUnix',
                    value: function _updateSelectedUnix() {
                        this.selected.dateObject = this.model.PersianDate.date([this.selected.year, this.selected.month, this.selected.date, this.view.hour, this.view.minute, this.view.second]);
                        this.selected.unixDate = this.selected.dateObject.valueOf();
                        this.model.updateInput(this.selected.unixDate);
                        return this;
                    }

                    /**
                     *
                     * @return {State}
                     * @private
                     */

                }, {
                    key: '_setViewDateTimeUnix',
                    value: function _setViewDateTimeUnix() {
                        var daysInMonth = new persianDate().daysInMonth(this.view.year, this.view.month);
                        if (this.view.date > daysInMonth) {
                            this.view.date = daysInMonth;
                        }
                        this.view.dateObject = this.model.PersianDate.date([this.view.year, this.view.month, this.view.date, this.view.hour, this.view.minute, this.view.second]);
                        this.view.year = this.view.dateObject.year();
                        this.view.month = this.view.dateObject.month();
                        this.view.date = this.view.dateObject.date();
                        this.view.hour = this.view.dateObject.hour();
                        this.view.hour12 = this.view.dateObject.format('hh');
                        this.view.minute = this.view.dateObject.minute();
                        this.view.second = this.view.dateObject.second();
                        this.view.unixDate = this.view.dateObject.valueOf();
                        return this;
                    }

                    /**
                     *
                     * @param {String} key -  accept date, month, year, hour, minute, second
                     * @param {Number} value
                     * @return {State}
                     */

                }, {
                    key: 'setViewDateTime',
                    value: function setViewDateTime(key, value) {
                        var self = this;
                        switch (key) {
                            case 'unix':
                                var pd = this.model.PersianDate.date(value);
                                self.view.year = pd.year();
                                self.view.month = pd.month();
                                self.view.date = pd.date();
                                self.view.hour = pd.hour();
                                self.view.minute = pd.minute();
                                self.view.second = pd.second();
                                break;
                            case 'year':
                                this.view.year = value;
                                break;
                            case 'month':
                                this.view.month = value;
                                break;
                            case 'date':
                                this.view.date = value;
                                break;
                            case 'hour':
                                this.view.hour = value;
                                break;
                            case 'minute':
                                this.view.minute = value;
                                break;
                            case 'second':
                                this.view.second = value;
                                break;
                        }
                        this._setViewDateTimeUnix();
                        return this;
                    }

                    /**
                     * desc change meridian state
                     */

                }, {
                    key: 'meridianToggle',
                    value: function meridianToggle() {
                        var self = this;
                        if (self.view.meridian === 'AM') {
                            self.view.meridian = 'PM';
                        } else if (self.view.meridian === 'PM') {
                            self.view.meridian = 'AM';
                        }
                    }
                }]);

                return State;
            }();

            module.exports = State;

            /***/
        }),
/* 12 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            /**
             * Do every things about toolbox, like attach events to toolbox elements
             */
            var Toolbox = function () {

                /**
                 * @param {Datepicker} datepicker
                 * @return {Toolbox}
                 */
                function Toolbox(model) {
                    _classCallCheck(this, Toolbox);

                    /**
                     * @type {Datepicker}
                     */
                    this.model = model;
                    this._attachEvents();
                    return this;
                }

                _createClass(Toolbox, [{
                    key: '_toggleCalendartype',
                    value: function _toggleCalendartype() {
                        var that = this;
                        if (that.model.options.calendar_ == 'persian') {
                            that.model.options.calendar_ = 'gregorian';
                            that.model.options.locale_ = this.model.options.calendar.gregorian.locale;
                        } else {
                            that.model.options.calendar_ = 'persian';
                            that.model.options.locale_ = this.model.options.calendar.persian.locale;
                        }
                    }

                    /**
                     * attach all events about toolbox
                     */

                }, {
                    key: '_attachEvents',
                    value: function _attachEvents() {
                        var that = this;
                        $(document).on('click', '#' + that.model.view.id + ' .pwt-btn-today', function () {
                            that.model.state.setSelectedDateTime('unix', new Date().valueOf());
                            that.model.state.setViewDateTime('unix', new Date().valueOf());
                            that.model.view.reRender();
                            /**
                             * @deprecated
                             * @todo remove this
                             */
                            that.model.options.toolbox.onToday(that.model);
                            that.model.options.toolbox.todayButton.onToday(that.model);
                        });

                        $(document).on('click', '#' + that.model.view.id + ' .pwt-btn-calendar', function () {
                            that._toggleCalendartype();
                            that.model.state.setSelectedDateTime('unix', that.model.state.selected.unixDate);
                            that.model.state.setViewDateTime('unix', that.model.state.view.unixDate);
                            that.model.view.render();
                            that.model.options.toolbox.calendarSwitch.onSwitch(that.model);
                        });

                        $(document).on('click', '#' + that.model.view.id + ' .pwt-btn-submit', function () {
                            that.model.view.hide();
                            that.model.options.toolbox.submitButton.onSubmit(that.model);
                            that.model.options.onHide(this);
                        });
                    }
                }]);

                return Toolbox;
            }();

            module.exports = Toolbox;

            /***/
        }),
/* 13 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

            function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var Template = __webpack_require__(1);
            var Helper = __webpack_require__(0);
            var Mustache = __webpack_require__(15);

            /**
             * As its name suggests, all rendering works do in this object
             */

            var View = function () {

                /**
                 *
                 * @param {Datepicker} model
                 * @return {View}
                 */
                function View(model) {
                    _classCallCheck(this, View);

                    /**
                     * @type {number}
                     */
                    this.yearsViewCount = 12;

                    /**
                     *
                     * @type {Datepicker}
                     */
                    this.model = model;

                    /**
                     *
                     * @type {null}
                     */
                    this.rendered = null;

                    /**
                     *
                     * @type {null}
                     */
                    this.$container = null;

                    /**
                     *
                     * @type {string}
                     */
                    this.id = 'persianDateInstance-' + parseInt(Math.random(100) * 1000);
                    var that = this;

                    if (this.model.state.ui.isInline) {
                        this.$container = $('<div  id="' + this.id + '" class="datepicker-container-inline"></div>').appendTo(that.model.inputElement);
                    } else {
                        this.$container = $('<div  id="' + this.id + '" class="datepicker-container"></div>').appendTo('body');
                        this.hide();
                        this.setPickerBoxPosition();
                        this.addCompatibilityClass();
                    }
                    return this;
                }

                /**
                 * @desc add css class to handle compatibility ui things
                 */


                _createClass(View, [{
                    key: 'addCompatibilityClass',
                    value: function addCompatibilityClass() {
                        if (Helper.isMobile && this.model.options.responsive) {
                            this.$container.addClass('pwt-mobile-view');
                        }
                    }

                    /**
                     * @desc remove datepicker container element from dom
                     */

                }, {
                    key: 'destroy',
                    value: function destroy() {
                        this.$container.remove();
                    }

                    /**
                     * @desc set datepicker container element based on <input/> element position
                     */

                }, {
                    key: 'setPickerBoxPosition',
                    value: function setPickerBoxPosition() {
                        var inputPosition = this.model.input.getInputPosition(),
                            inputSize = this.model.input.getInputSize();

                        if (Helper.isMobile && this.model.options.responsive) {
                            return false;
                        }

                        if (this.model.options.position === 'auto') {
                            this.$container.css({
                                left: inputPosition.left + 'px',
                                top: inputSize.height + inputPosition.top + 'px'
                            });
                        } else {
                            this.$container.css({
                                left: this.model.options.position[1] + inputPosition.left + 'px',
                                top: this.model.options.position[0] + inputPosition.top + 'px'
                            });
                        }
                    }

                    /**
                     * @desc show datepicker container element
                     */

                }, {
                    key: 'show',
                    value: function show() {
                        this.$container.removeClass('pwt-hide');
                        this.setPickerBoxPosition();
                    }

                    /**
                     * @desc hide datepicker container element
                     */

                }, {
                    key: 'hide',
                    value: function hide() {
                        this.$container.addClass('pwt-hide');
                    }

                    /**
                     * @desc toggle datepicker container element
                     */

                }, {
                    key: 'toggle',
                    value: function toggle() {
                        this.$container.toggleClass('pwt-hide');
                    }

                    /**
                     * @desc return navigator switch text
                     * @param {String} data -  accept day, month, year
                     * @private
                     * @return {String}
                     */

                }, {
                    key: '_getNavSwitchText',
                    value: function _getNavSwitchText(data) {
                        var output = void 0;
                        if (this.model.state.viewMode == 'day') {
                            output = this.model.options.dayPicker.titleFormatter.call(this, data.year, data.month);
                        } else if (this.model.state.viewMode == 'month') {
                            output = this.model.options.monthPicker.titleFormatter.call(this, data.dateObject.valueOf());
                        } else if (this.model.state.viewMode == 'year') {
                            output = this.model.options.yearPicker.titleFormatter.call(this, data.year);
                        }
                        return output;
                    }

                    /**
                     * @desc check year is accessible
                     * @param {Number} year - year number
                     * @return {Boolean}
                     */

                }, {
                    key: 'checkYearAccess',
                    value: function checkYearAccess(year) {
                        var output = true;
                        if (this.model.state.filetredDate) {
                            var startYear = this.model.state.filterDate.start.year,
                                endYear = this.model.state.filterDate.end.year;
                            if (startYear && year < startYear) {
                                return false;
                            } else if (endYear && year > endYear) {
                                return false;
                            }
                        }
                        if (output) {
                            return this.model.options.checkYear(year);
                        }
                    }

                    /**
                     * @private
                     * @param viewState
                     * @return {{enabled: boolean, viewMode: boolean, list: Array}}
                     */

                }, {
                    key: '_getYearViewModel',
                    value: function _getYearViewModel(viewState) {
                        var _this = this;

                        var isEnabled = this.model.options.yearPicker.enabled;
                        // Make performance better
                        if (!isEnabled) {
                            return {
                                enabled: false
                            };
                        }
                        /**
                         * @description Generate years list based on viewState year
                         * @return ['1380',n+12,'1392']
                         */
                        var list = [].concat(_toConsumableArray(Array(this.yearsViewCount).keys())).map(function (value) {
                            return value + parseInt(viewState.year / _this.yearsViewCount) * _this.yearsViewCount;
                        });
                        /*
                         * @description Generate years object based on list
                         */
                        var yearsModel = [],
                            yearStr = this.model.PersianDate.date();
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var i = _step.value;

                                yearStr.year([i]);
                                yearsModel.push({
                                    title: yearStr.format('YYYY'),
                                    enabled: this.checkYearAccess(i),
                                    dataYear: i,
                                    selected: this.model.state.selected.year == i
                                });
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        return {
                            enabled: isEnabled,
                            viewMode: this.model.state.viewMode == 'year',
                            list: yearsModel
                        };
                    }

                    /**
                     * @desc check month is accessible
                     * @param {Number} month - month number
                     * @return {Boolean}
                     */

                }, {
                    key: 'checkMonthAccess',
                    value: function checkMonthAccess(month) {
                        month = month + 1;
                        var output = true,
                            y = this.model.state.view.year;
                        if (this.model.state.filetredDate) {
                            var startMonth = this.model.state.filterDate.start.month,
                                endMonth = this.model.state.filterDate.end.month,
                                startYear = this.model.state.filterDate.start.year,
                                endYear = this.model.state.filterDate.end.year;
                            if (startMonth && endMonth && (y == endYear && month > endMonth || y > endYear) || y == startYear && month < startMonth || y < startYear) {
                                return false;
                            } else if (endMonth && (y == endYear && month > endMonth || y > endYear)) {
                                return false;
                            } else if (startMonth && (y == startYear && month < startMonth || y < startYear)) {
                                return false;
                            }
                        }
                        if (output) {
                            return this.model.options.checkMonth(month, y);
                        }
                    }

                    /**
                     * @private
                     * @return {{enabled: boolean, viewMode: boolean, list: Array}}
                     */

                }, {
                    key: '_getMonthViewModel',
                    value: function _getMonthViewModel() {
                        var isEnaled = this.model.options.monthPicker.enabled;
                        // Make performance better
                        if (!isEnaled) {
                            return {
                                enabled: false
                            };
                        }

                        var monthModel = [],
                            that = this;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = that.model.PersianDate.date().rangeName().months.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _step2$value = _slicedToArray(_step2.value, 2),
                                    index = _step2$value[0],
                                    month = _step2$value[1];

                                monthModel.push({
                                    title: month,
                                    enabled: this.checkMonthAccess(index),
                                    year: this.model.state.view.year,
                                    dataMonth: index + 1,
                                    selected: this.model.state.selected.year == this.model.state.view.year && this.model.state.selected.month == index + 1
                                });
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        return {
                            enabled: isEnaled,
                            viewMode: this.model.state.viewMode == 'month',
                            list: monthModel
                        };
                    }

                    /**
                     * @desc check day is accessible
                     * @param {Number} thisUnix - month number
                     * @return {Boolean}
                     */

                }, {
                    key: 'checkDayAccess',
                    value: function checkDayAccess(unixtimespan) {
                        var self = this,
                            output = true;
                        self.minDate = this.model.options.minDate;
                        self.maxDate = this.model.options.maxDate;

                        if (self.model.state.filetredDate) {
                            if (self.minDate && self.maxDate) {
                                self.minDate = self.model.PersianDate.date(self.minDate).startOf('day').valueOf();
                                self.maxDate = self.model.PersianDate.date(self.maxDate).endOf('day').valueOf();
                                if (!(unixtimespan >= self.minDate && unixtimespan <= self.maxDate)) {
                                    return false;
                                }
                            } else if (self.minDate) {
                                self.minDate = self.model.PersianDate.date(self.minDate).startOf('day').valueOf();
                                if (unixtimespan <= self.minDate) {
                                    return false;
                                }
                            } else if (self.maxDate) {
                                self.maxDate = self.model.PersianDate.date(self.maxDate).endOf('day').valueOf();
                                if (unixtimespan >= self.maxDate) {
                                    return false;
                                }
                            }
                        }
                        if (output) {
                            return self.model.options.checkDate(unixtimespan);
                        }
                    }

                    /**
                     * @private
                     * @return {object}
                     */

                }, {
                    key: '_getDayViewModel',
                    value: function _getDayViewModel() {
                        if (this.model.state.viewMode != 'day') {
                            return [];
                        }

                        var isEnabled = this.model.options.dayPicker.enabled;
                        // Make performance better
                        if (!isEnabled) {
                            return {
                                enabled: false
                            };
                        }

                        //log('if you see this many time your code has performance issue');
                        var viewMonth = this.model.state.view.month,
                            viewYear = this.model.state.view.year;
                        var pdateInstance = this.model.PersianDate.date(),
                            daysCount = pdateInstance.daysInMonth(viewYear, viewMonth),
                            firstWeekDayOfMonth = pdateInstance.getFirstWeekDayOfMonth(viewYear, viewMonth) - 1,
                            outputList = [],
                            daysListindex = 0,
                            nextMonthListIndex = 0,
                            daysMatrix = [['null', 'null', 'null', 'null', 'null', 'null', 'null'], ['null', 'null', 'null', 'null', 'null', 'null', 'null'], ['null', 'null', 'null', 'null', 'null', 'null', 'null'], ['null', 'null', 'null', 'null', 'null', 'null', 'null'], ['null', 'null', 'null', 'null', 'null', 'null', 'null'], ['null', 'null', 'null', 'null', 'null', 'null', 'null']];

                        var anotherCalendar = this._getAnotherCalendar();
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = daysMatrix.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _step3$value = _slicedToArray(_step3.value, 2),
                                    rowIndex = _step3$value[0],
                                    daysRow = _step3$value[1];

                                outputList[rowIndex] = [];
                                var _iteratorNormalCompletion4 = true;
                                var _didIteratorError4 = false;
                                var _iteratorError4 = undefined;

                                try {
                                    for (var _iterator4 = daysRow.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                        var _step4$value = _slicedToArray(_step4.value, 1),
                                            dayIndex = _step4$value[0];

                                        var calcedDate = void 0,
                                            otherMonth = void 0;
                                        // Set hour 12 prevent issues with DST times
                                        if (rowIndex === 0 && dayIndex < firstWeekDayOfMonth) {
                                            calcedDate = this.model.state.view.dateObject.startOf('month').hour(12).subtract('days', firstWeekDayOfMonth - dayIndex);
                                            otherMonth = true;
                                        } else if (rowIndex === 0 && dayIndex >= firstWeekDayOfMonth || rowIndex <= 5 && daysListindex < daysCount) {
                                            daysListindex += 1;
                                            calcedDate = new persianDate([this.model.state.view.year, this.model.state.view.month, daysListindex]);
                                            otherMonth = false;
                                        } else {
                                            nextMonthListIndex += 1;
                                            calcedDate = this.model.state.view.dateObject.endOf('month').hour(12).add('days', nextMonthListIndex);
                                            otherMonth = true;
                                        }
                                        outputList[rowIndex].push({
                                            title: calcedDate.format('D'),
                                            alterCalTitle: new persianDate(calcedDate.valueOf()).toCalendar(anotherCalendar[0]).toLocale(anotherCalendar[1]).format('D'),
                                            dataDate: [calcedDate.year(), calcedDate.month(), calcedDate.date()].join(','),
                                            dataUnix: calcedDate.hour(12).valueOf(),
                                            otherMonth: otherMonth,
                                            // TODO: make configurable
                                            enabled: this.checkDayAccess(calcedDate.valueOf())
                                        });
                                    }
                                } catch (err) {
                                    _didIteratorError4 = true;
                                    _iteratorError4 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                            _iterator4.return();
                                        }
                                    } finally {
                                        if (_didIteratorError4) {
                                            throw _iteratorError4;
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        return {
                            enabled: isEnabled,
                            viewMode: this.model.state.viewMode == 'day',
                            list: outputList
                        };
                    }
                }, {
                    key: 'markSelectedDay',
                    value: function markSelectedDay() {
                        var selected = this.model.state.selected;
                        this.$container.find('.table-days td').each(function () {
                            if ($(this).data('date') == [selected.year, selected.month, selected.date].join(',')) {
                                $(this).addClass('selected');
                            } else {
                                $(this).removeClass('selected');
                            }
                        });
                    }
                }, {
                    key: 'markToday',
                    value: function markToday() {
                        var today = new persianDate();
                        this.$container.find('.table-days td').each(function () {
                            if ($(this).data('date') == [today.year(), today.month(), today.date()].join(',')) {
                                $(this).addClass('today');
                            } else {
                                $(this).removeClass('today');
                            }
                        });
                    }

                    /**
                     * @private
                     * @return {{enabled: boolean, hour: {title, enabled: boolean}, minute: {title, enabled: boolean}, second: {title, enabled: boolean}, meridian: {title: (meridian|{title, enabled}|ClassDatepicker.ClassConfig.timePicker.meridian|{enabled}|string|string), enabled: boolean}}}
                     */

                }, {
                    key: '_getTimeViewModel',
                    value: function _getTimeViewModel() {

                        var isEnabled = this.model.options.timePicker.enabled;
                        // Make performance better
                        if (!isEnabled) {
                            return {
                                enabled: false
                            };
                        }

                        var hourTitle = void 0;
                        if (this.model.options.timePicker.meridian.enabled) {
                            hourTitle = this.model.state.view.dateObject.format('hh');
                        } else {
                            hourTitle = this.model.state.view.dateObject.format('HH');
                        }

                        return {
                            enabled: isEnabled,
                            hour: {
                                title: hourTitle,
                                enabled: this.model.options.timePicker.hour.enabled
                            },
                            minute: {
                                title: this.model.state.view.dateObject.format('mm'),
                                enabled: this.model.options.timePicker.minute.enabled
                            },
                            second: {
                                title: this.model.state.view.dateObject.format('ss'),
                                enabled: this.model.options.timePicker.second.enabled
                            },
                            meridian: {
                                title: this.model.state.view.dateObject.format('a'),
                                enabled: this.model.options.timePicker.meridian.enabled
                            }
                        };
                    }

                    /**
                     *
                     * @return {{enabled: boolean, list: (*|Array)}}
                     * @private
                     */

                }, {
                    key: '_getWeekViewModel',
                    value: function _getWeekViewModel() {
                        return {
                            enabled: true,
                            list: this.model.PersianDate.date().rangeName().weekdaysMin
                        };
                    }

                    /**
                     *
                     * @return {string}
                     */

                }, {
                    key: 'getCssClass',
                    value: function getCssClass() {
                        return [this.model.state.ui.isInline ? 'datepicker-plot-area-inline-view' : '', !this.model.options.timePicker.meridian.enabled ? 'datepicker-state-no-meridian' : '', this.model.options.onlyTimePicker ? 'datepicker-state-only-time' : '', !this.model.options.timePicker.second.enabled ? 'datepicker-state-no-second' : '', this.model.options.calendar_ == 'gregorian' ? 'datepicker-gregorian' : 'datepicker-persian'].join(' ');
                    }

                    /**
                     * @param data
                     * @return {*}
                     */

                }, {
                    key: 'getViewModel',
                    value: function getViewModel(data) {
                        var anotherCalendar = this._getAnotherCalendar();
                        return {
                            plotId: '',
                            navigator: {
                                enabled: this.model.options.navigator.enabled,
                                switch: {
                                    enabled: true,
                                    text: this._getNavSwitchText(data)
                                },
                                text: this.model.options.navigator.text
                            },
                            selected: this.model.state.selected,
                            time: this._getTimeViewModel(data),
                            days: this._getDayViewModel(data),
                            weekdays: this._getWeekViewModel(data),
                            month: this._getMonthViewModel(data),
                            year: this._getYearViewModel(data),
                            toolbox: this.model.options.toolbox,
                            cssClass: this.getCssClass(),
                            onlyTimePicker: this.model.options.onlyTimePicker,
                            altCalendarShowHint: this.model.options.calendar[anotherCalendar[0]].showHint,
                            calendarSwitchText: this.model.state.view.dateObject.toCalendar(anotherCalendar[0]).toLocale(anotherCalendar[1]).format(this.model.options.toolbox.calendarSwitch.format),
                            todayButtonText: this._getButtonText().todayButtontext,
                            submitButtonText: this._getButtonText().submitButtonText
                        };
                    }
                }, {
                    key: '_getButtonText',
                    value: function _getButtonText() {
                        var output = {};
                        if (this.model.options.locale_ == 'fa') {
                            output.todayButtontext = this.model.options.toolbox.todayButton.text.fa;
                            output.submitButtonText = this.model.options.toolbox.submitButton.text.fa;
                        } else if (this.model.options.locale_ == 'en') {
                            output.todayButtontext = this.model.options.toolbox.todayButton.text.en;
                            output.submitButtonText = this.model.options.toolbox.submitButton.text.en;
                        }
                        return output;
                    }
                }, {
                    key: '_getAnotherCalendar',
                    value: function _getAnotherCalendar() {
                        var that = this,
                            cal = void 0,
                            loc = void 0;
                        if (that.model.options.calendar_ == 'persian') {
                            cal = 'gregorian';
                            loc = that.model.options.calendar.gregorian.locale;
                        } else {
                            cal = 'persian';
                            loc = that.model.options.calendar.persian.locale;
                        }
                        return [cal, loc];
                    }

                    /**
                     * @desc render times area, prevent performance issue with scroll and time section
                     */

                }, {
                    key: 'renderTimePartial',
                    value: function renderTimePartial() {
                        var timeViewModel = this._getTimeViewModel(this.model.state.view);
                        this.$container.find('[data-time-key="hour"] input').val(timeViewModel.hour.title);
                        this.$container.find('[data-time-key="minute"] input').val(timeViewModel.minute.title);
                        this.$container.find('[data-time-key="second"] input').val(timeViewModel.second.title);
                        this.$container.find('[data-time-key="meridian"] input').val(timeViewModel.meridian.title);
                    }

                    /**
                     * @render datepicker view element
                     * @param data
                     */

                }, {
                    key: 'render',
                    value: function render(data) {
                        if (!data) {
                            data = this.model.state.view;
                        }
                        Helper.debug(this, 'render');
                        Mustache.parse(Template);
                        this.rendered = $(Mustache.render(this.model.options.template, this.getViewModel(data)));
                        this.$container.empty().append(this.rendered);
                        this.markSelectedDay();
                        this.markToday();
                        this.afterRender();
                    }
                }, {
                    key: 'reRender',
                    value: function reRender() {
                        var data = this.model.state.view;
                        this.render(data);
                    }

                    /**
                     * @desc do after render work like attache events
                     */

                }, {
                    key: 'afterRender',
                    value: function afterRender() {
                        if (this.model.navigator) {
                            this.model.navigator.liveAttach();
                        }
                    }
                }]);

                return View;
            }();

            module.exports = View;

            /***/
        }),
/* 14 */
/***/ (function (module, exports, __webpack_require__) {

            /*
             * Hamster.js v1.1.2
             * (c) 2013 Monospaced http://monospaced.com
             * License: MIT
             */

            (function (window, document) {
                'use strict';

                /**
                 * Hamster
                 * use this to create instances
                 * @returns {Hamster.Instance}
                 * @constructor
                 */
                var Hamster = function (element) {
                    return new Hamster.Instance(element);
                };

                // default event name
                Hamster.SUPPORT = 'wheel';

                // default DOM methods
                Hamster.ADD_EVENT = 'addEventListener';
                Hamster.REMOVE_EVENT = 'removeEventListener';
                Hamster.PREFIX = '';

                // until browser inconsistencies have been fixed...
                Hamster.READY = false;

                Hamster.Instance = function (element) {
                    if (!Hamster.READY) {
                        // fix browser inconsistencies
                        Hamster.normalise.browser();

                        // Hamster is ready...!
                        Hamster.READY = true;
                    }

                    this.element = element;

                    // store attached event handlers
                    this.handlers = [];

                    // return instance
                    return this;
                };

                /**
                 * create new hamster instance
                 * all methods should return the instance itself, so it is chainable.
                 * @param   {HTMLElement}       element
                 * @returns {Hamster.Instance}
                 * @constructor
                 */
                Hamster.Instance.prototype = {
                    /**
                     * bind events to the instance
                     * @param   {Function}    handler
                     * @param   {Boolean}     useCapture
                     * @returns {Hamster.Instance}
                     */
                    wheel: function onEvent(handler, useCapture) {
                        Hamster.event.add(this, Hamster.SUPPORT, handler, useCapture);

                        // handle MozMousePixelScroll in older Firefox
                        if (Hamster.SUPPORT === 'DOMMouseScroll') {
                            Hamster.event.add(this, 'MozMousePixelScroll', handler, useCapture);
                        }

                        return this;
                    },

                    /**
                     * unbind events to the instance
                     * @param   {Function}    handler
                     * @param   {Boolean}     useCapture
                     * @returns {Hamster.Instance}
                     */
                    unwheel: function offEvent(handler, useCapture) {
                        // if no handler argument,
                        // unbind the last bound handler (if exists)
                        if (handler === undefined && (handler = this.handlers.slice(-1)[0])) {
                            handler = handler.original;
                        }

                        Hamster.event.remove(this, Hamster.SUPPORT, handler, useCapture);

                        // handle MozMousePixelScroll in older Firefox
                        if (Hamster.SUPPORT === 'DOMMouseScroll') {
                            Hamster.event.remove(this, 'MozMousePixelScroll', handler, useCapture);
                        }

                        return this;
                    }
                };

                Hamster.event = {
                    /**
                     * cross-browser 'addWheelListener'
                     * @param   {Instance}    hamster
                     * @param   {String}      eventName
                     * @param   {Function}    handler
                     * @param   {Boolean}     useCapture
                     */
                    add: function add(hamster, eventName, handler, useCapture) {
                        // store the original handler
                        var originalHandler = handler;

                        // redefine the handler
                        handler = function (originalEvent) {

                            if (!originalEvent) {
                                originalEvent = window.event;
                            }

                            // create a normalised event object,
                            // and normalise "deltas" of the mouse wheel
                            var event = Hamster.normalise.event(originalEvent),
                                delta = Hamster.normalise.delta(originalEvent);

                            // fire the original handler with normalised arguments
                            return originalHandler(event, delta[0], delta[1], delta[2]);

                        };

                        // cross-browser addEventListener
                        hamster.element[Hamster.ADD_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

                        // store original and normalised handlers on the instance
                        hamster.handlers.push({
                            original: originalHandler,
                            normalised: handler
                        });
                    },

                    /**
                     * removeWheelListener
                     * @param   {Instance}    hamster
                     * @param   {String}      eventName
                     * @param   {Function}    handler
                     * @param   {Boolean}     useCapture
                     */
                    remove: function remove(hamster, eventName, handler, useCapture) {
                        // find the normalised handler on the instance
                        var originalHandler = handler,
                            lookup = {},
                            handlers;
                        for (var i = 0, len = hamster.handlers.length; i < len; ++i) {
                            lookup[hamster.handlers[i].original] = hamster.handlers[i];
                        }
                        handlers = lookup[originalHandler];
                        handler = handlers.normalised;

                        // cross-browser removeEventListener
                        hamster.element[Hamster.REMOVE_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

                        // remove original and normalised handlers from the instance
                        for (var h in hamster.handlers) {
                            if (hamster.handlers[h] == handlers) {
                                hamster.handlers.splice(h, 1);
                                break;
                            }
                        }
                    }
                };

                /**
                 * these hold the lowest deltas,
                 * used to normalise the delta values
                 * @type {Number}
                 */
                var lowestDelta,
                    lowestDeltaXY;

                Hamster.normalise = {
                    /**
                     * fix browser inconsistencies
                     */
                    browser: function normaliseBrowser() {
                        // detect deprecated wheel events
                        if (!('onwheel' in document || document.documentMode >= 9)) {
                            Hamster.SUPPORT = document.onmousewheel !== undefined ?
                                'mousewheel' : // webkit and IE < 9 support at least "mousewheel"
                                'DOMMouseScroll'; // assume remaining browsers are older Firefox
                        }

                        // detect deprecated event model
                        if (!window.addEventListener) {
                            // assume IE < 9
                            Hamster.ADD_EVENT = 'attachEvent';
                            Hamster.REMOVE_EVENT = 'detachEvent';
                            Hamster.PREFIX = 'on';
                        }

                    },

                    /**
                     * create a normalised event object
                     * @param   {Function}    originalEvent
                     * @returns {Object}      event
                     */
                    event: function normaliseEvent(originalEvent) {
                        var event = {
                            // keep a reference to the original event object
                            originalEvent: originalEvent,
                            target: originalEvent.target || originalEvent.srcElement,
                            type: 'wheel',
                            deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
                            deltaX: 0,
                            deltaZ: 0,
                            preventDefault: function () {
                                if (originalEvent.preventDefault) {
                                    originalEvent.preventDefault();
                                } else {
                                    originalEvent.returnValue = false;
                                }
                            },
                            stopPropagation: function () {
                                if (originalEvent.stopPropagation) {
                                    originalEvent.stopPropagation();
                                } else {
                                    originalEvent.cancelBubble = false;
                                }
                            }
                        };

                        // calculate deltaY (and deltaX) according to the event

                        // 'mousewheel'
                        if (originalEvent.wheelDelta) {
                            event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
                        }
                        // webkit
                        if (originalEvent.wheelDeltaX) {
                            event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX;
                        }

                        // 'DomMouseScroll'
                        if (originalEvent.detail) {
                            event.deltaY = originalEvent.detail;
                        }

                        return event;
                    },

                    /**
                     * normalise 'deltas' of the mouse wheel
                     * @param   {Function}    originalEvent
                     * @returns {Array}       deltas
                     */
                    delta: function normaliseDelta(originalEvent) {
                        var delta = 0,
                            deltaX = 0,
                            deltaY = 0,
                            absDelta = 0,
                            absDeltaXY = 0,
                            fn;

                        // normalise deltas according to the event

                        // 'wheel' event
                        if (originalEvent.deltaY) {
                            deltaY = originalEvent.deltaY * -1;
                            delta = deltaY;
                        }
                        if (originalEvent.deltaX) {
                            deltaX = originalEvent.deltaX;
                            delta = deltaX * -1;
                        }

                        // 'mousewheel' event
                        if (originalEvent.wheelDelta) {
                            delta = originalEvent.wheelDelta;
                        }
                        // webkit
                        if (originalEvent.wheelDeltaY) {
                            deltaY = originalEvent.wheelDeltaY;
                        }
                        if (originalEvent.wheelDeltaX) {
                            deltaX = originalEvent.wheelDeltaX * -1;
                        }

                        // 'DomMouseScroll' event
                        if (originalEvent.detail) {
                            delta = originalEvent.detail * -1;
                        }

                        // Don't return NaN
                        if (delta === 0) {
                            return [0, 0, 0];
                        }

                        // look for lowest delta to normalize the delta values
                        absDelta = Math.abs(delta);
                        if (!lowestDelta || absDelta < lowestDelta) {
                            lowestDelta = absDelta;
                        }
                        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
                        if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
                            lowestDeltaXY = absDeltaXY;
                        }

                        // convert deltas to whole numbers
                        fn = delta > 0 ? 'floor' : 'ceil';
                        delta = Math[fn](delta / lowestDelta);
                        deltaX = Math[fn](deltaX / lowestDeltaXY);
                        deltaY = Math[fn](deltaY / lowestDeltaXY);

                        return [delta, deltaX, deltaY];
                    }
                };

                if (typeof window.define === 'function' && window.define.amd) {
                    // AMD
                    window.define('hamster', [], function () {
                        return Hamster;
                    });
                } else if (true) {
                    // CommonJS
                    module.exports = Hamster;
                } else {
                    // Browser global
                    window.Hamster = Hamster;
                }

            })(window, window.document);


            /***/
        }),
/* 15 */
/***/ (function (module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

            /*global define: false Mustache: true*/

            (function defineMustache(global, factory) {
                if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
                    factory(exports); // CommonJS
                } else if (true) {
                    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
                        __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                            (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
                } else {
                    global.Mustache = {};
                    factory(global.Mustache); // script, wsh, asp
                }
            }(this, function mustacheFactory(mustache) {

                var objectToString = Object.prototype.toString;
                var isArray = Array.isArray || function isArrayPolyfill(object) {
                    return objectToString.call(object) === '[object Array]';
                };

                function isFunction(object) {
                    return typeof object === 'function';
                }

                /**
                 * More correct typeof string handling array
                 * which normally returns typeof 'object'
                 */
                function typeStr(obj) {
                    return isArray(obj) ? 'array' : typeof obj;
                }

                function escapeRegExp(string) {
                    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                }

                /**
                 * Null safe way of checking whether or not an object,
                 * including its prototype, has a given property
                 */
                function hasProperty(obj, propName) {
                    return obj != null && typeof obj === 'object' && (propName in obj);
                }

                /**
                 * Safe way of detecting whether or not the given thing is a primitive and
                 * whether it has the given property
                 */
                function primitiveHasOwnProperty(primitive, propName) {
                    return (
                        primitive != null
                        && typeof primitive !== 'object'
                        && primitive.hasOwnProperty
                        && primitive.hasOwnProperty(propName)
                    );
                }

                // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
                // See https://github.com/janl/mustache.js/issues/189
                var regExpTest = RegExp.prototype.test;
                function testRegExp(re, string) {
                    return regExpTest.call(re, string);
                }

                var nonSpaceRe = /\S/;
                function isWhitespace(string) {
                    return !testRegExp(nonSpaceRe, string);
                }

                var entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '/': '&#x2F;',
                    '`': '&#x60;',
                    '=': '&#x3D;'
                };

                function escapeHtml(string) {
                    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
                        return entityMap[s];
                    });
                }

                var whiteRe = /\s*/;
                var spaceRe = /\s+/;
                var equalsRe = /\s*=/;
                var curlyRe = /\s*\}/;
                var tagRe = /#|\^|\/|>|\{|&|=|!/;

                /**
                 * Breaks up the given `template` string into a tree of tokens. If the `tags`
                 * argument is given here it must be an array with two string values: the
                 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
                 * course, the default is to use mustaches (i.e. mustache.tags).
                 *
                 * A token is an array with at least 4 elements. The first element is the
                 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
                 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
                 * all text that appears outside a symbol this element is "text".
                 *
                 * The second element of a token is its "value". For mustache tags this is
                 * whatever else was inside the tag besides the opening symbol. For text tokens
                 * this is the text itself.
                 *
                 * The third and fourth elements of the token are the start and end indices,
                 * respectively, of the token in the original template.
                 *
                 * Tokens that are the root node of a subtree contain two more elements: 1) an
                 * array of tokens in the subtree and 2) the index in the original template at
                 * which the closing tag for that section begins.
                 */
                function parseTemplate(template, tags) {
                    if (!template)
                        return [];

                    var sections = [];     // Stack to hold section tokens
                    var tokens = [];       // Buffer to hold the tokens
                    var spaces = [];       // Indices of whitespace tokens on the current line
                    var hasTag = false;    // Is there a {{tag}} on the current line?
                    var nonSpace = false;  // Is there a non-space char on the current line?

                    // Strips all whitespace tokens array for the current line
                    // if there was a {{#tag}} on it and otherwise only space.
                    function stripSpace() {
                        if (hasTag && !nonSpace) {
                            while (spaces.length)
                                delete tokens[spaces.pop()];
                        } else {
                            spaces = [];
                        }

                        hasTag = false;
                        nonSpace = false;
                    }

                    var openingTagRe, closingTagRe, closingCurlyRe;
                    function compileTags(tagsToCompile) {
                        if (typeof tagsToCompile === 'string')
                            tagsToCompile = tagsToCompile.split(spaceRe, 2);

                        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
                            throw new Error('Invalid tags: ' + tagsToCompile);

                        openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
                        closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
                        closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
                    }

                    compileTags(tags || mustache.tags);

                    var scanner = new Scanner(template);

                    var start, type, value, chr, token, openSection;
                    while (!scanner.eos()) {
                        start = scanner.pos;

                        // Match any text between tags.
                        value = scanner.scanUntil(openingTagRe);

                        if (value) {
                            for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                                chr = value.charAt(i);

                                if (isWhitespace(chr)) {
                                    spaces.push(tokens.length);
                                } else {
                                    nonSpace = true;
                                }

                                tokens.push(['text', chr, start, start + 1]);
                                start += 1;

                                // Check for whitespace on the current line.
                                if (chr === '\n')
                                    stripSpace();
                            }
                        }

                        // Match the opening tag.
                        if (!scanner.scan(openingTagRe))
                            break;

                        hasTag = true;

                        // Get the tag type.
                        type = scanner.scan(tagRe) || 'name';
                        scanner.scan(whiteRe);

                        // Get the tag value.
                        if (type === '=') {
                            value = scanner.scanUntil(equalsRe);
                            scanner.scan(equalsRe);
                            scanner.scanUntil(closingTagRe);
                        } else if (type === '{') {
                            value = scanner.scanUntil(closingCurlyRe);
                            scanner.scan(curlyRe);
                            scanner.scanUntil(closingTagRe);
                            type = '&';
                        } else {
                            value = scanner.scanUntil(closingTagRe);
                        }

                        // Match the closing tag.
                        if (!scanner.scan(closingTagRe))
                            throw new Error('Unclosed tag at ' + scanner.pos);

                        token = [type, value, start, scanner.pos];
                        tokens.push(token);

                        if (type === '#' || type === '^') {
                            sections.push(token);
                        } else if (type === '/') {
                            // Check section nesting.
                            openSection = sections.pop();

                            if (!openSection)
                                throw new Error('Unopened section "' + value + '" at ' + start);

                            if (openSection[1] !== value)
                                throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
                        } else if (type === 'name' || type === '{' || type === '&') {
                            nonSpace = true;
                        } else if (type === '=') {
                            // Set the tags for the next time around.
                            compileTags(value);
                        }
                    }

                    // Make sure there are no open sections when we're done.
                    openSection = sections.pop();

                    if (openSection)
                        throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

                    return nestTokens(squashTokens(tokens));
                }

                /**
                 * Combines the values of consecutive text tokens in the given `tokens` array
                 * to a single token.
                 */
                function squashTokens(tokens) {
                    var squashedTokens = [];

                    var token, lastToken;
                    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                        token = tokens[i];

                        if (token) {
                            if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                                lastToken[1] += token[1];
                                lastToken[3] = token[3];
                            } else {
                                squashedTokens.push(token);
                                lastToken = token;
                            }
                        }
                    }

                    return squashedTokens;
                }

                /**
                 * Forms the given array of `tokens` into a nested tree structure where
                 * tokens that represent a section have two additional items: 1) an array of
                 * all tokens that appear in that section and 2) the index in the original
                 * template that represents the end of that section.
                 */
                function nestTokens(tokens) {
                    var nestedTokens = [];
                    var collector = nestedTokens;
                    var sections = [];

                    var token, section;
                    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                        token = tokens[i];

                        switch (token[0]) {
                            case '#':
                            case '^':
                                collector.push(token);
                                sections.push(token);
                                collector = token[4] = [];
                                break;
                            case '/':
                                section = sections.pop();
                                section[5] = token[2];
                                collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                                break;
                            default:
                                collector.push(token);
                        }
                    }

                    return nestedTokens;
                }

                /**
                 * A simple string scanner that is used by the template parser to find
                 * tokens in template strings.
                 */
                function Scanner(string) {
                    this.string = string;
                    this.tail = string;
                    this.pos = 0;
                }

                /**
                 * Returns `true` if the tail is empty (end of string).
                 */
                Scanner.prototype.eos = function eos() {
                    return this.tail === '';
                };

                /**
                 * Tries to match the given regular expression at the current position.
                 * Returns the matched text if it can match, the empty string otherwise.
                 */
                Scanner.prototype.scan = function scan(re) {
                    var match = this.tail.match(re);

                    if (!match || match.index !== 0)
                        return '';

                    var string = match[0];

                    this.tail = this.tail.substring(string.length);
                    this.pos += string.length;

                    return string;
                };

                /**
                 * Skips all text until the given regular expression can be matched. Returns
                 * the skipped string, which is the entire tail if no match can be made.
                 */
                Scanner.prototype.scanUntil = function scanUntil(re) {
                    var index = this.tail.search(re), match;

                    switch (index) {
                        case -1:
                            match = this.tail;
                            this.tail = '';
                            break;
                        case 0:
                            match = '';
                            break;
                        default:
                            match = this.tail.substring(0, index);
                            this.tail = this.tail.substring(index);
                    }

                    this.pos += match.length;

                    return match;
                };

                /**
                 * Represents a rendering context by wrapping a view object and
                 * maintaining a reference to the parent context.
                 */
                function Context(view, parentContext) {
                    this.view = view;
                    this.cache = { '.': this.view };
                    this.parent = parentContext;
                }

                /**
                 * Creates a new context using the given view with this context
                 * as the parent.
                 */
                Context.prototype.push = function push(view) {
                    return new Context(view, this);
                };

                /**
                 * Returns the value of the given name in this context, traversing
                 * up the context hierarchy if the value is absent in this context's view.
                 */
                Context.prototype.lookup = function lookup(name) {
                    var cache = this.cache;

                    var value;
                    if (cache.hasOwnProperty(name)) {
                        value = cache[name];
                    } else {
                        var context = this, intermediateValue, names, index, lookupHit = false;

                        while (context) {
                            if (name.indexOf('.') > 0) {
                                intermediateValue = context.view;
                                names = name.split('.');
                                index = 0;

                                /**
                                 * Using the dot notion path in `name`, we descend through the
                                 * nested objects.
                                 *
                                 * To be certain that the lookup has been successful, we have to
                                 * check if the last object in the path actually has the property
                                 * we are looking for. We store the result in `lookupHit`.
                                 *
                                 * This is specially necessary for when the value has been set to
                                 * `undefined` and we want to avoid looking up parent contexts.
                                 *
                                 * In the case where dot notation is used, we consider the lookup
                                 * to be successful even if the last "object" in the path is
                                 * not actually an object but a primitive (e.g., a string, or an
                                 * integer), because it is sometimes useful to access a property
                                 * of an autoboxed primitive, such as the length of a string.
                                 **/
                                while (intermediateValue != null && index < names.length) {
                                    if (index === names.length - 1)
                                        lookupHit = (
                                            hasProperty(intermediateValue, names[index])
                                            || primitiveHasOwnProperty(intermediateValue, names[index])
                                        );

                                    intermediateValue = intermediateValue[names[index++]];
                                }
                            } else {
                                intermediateValue = context.view[name];

                                /**
                                 * Only checking against `hasProperty`, which always returns `false` if
                                 * `context.view` is not an object. Deliberately omitting the check
                                 * against `primitiveHasOwnProperty` if dot notation is not used.
                                 *
                                 * Consider this example:
                                 * ```
                                 * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
                                 * ```
                                 *
                                 * If we were to check also against `primitiveHasOwnProperty`, as we do
                                 * in the dot notation case, then render call would return:
                                 *
                                 * "The length of a football field is 9."
                                 *
                                 * rather than the expected:
                                 *
                                 * "The length of a football field is 100 yards."
                                 **/
                                lookupHit = hasProperty(context.view, name);
                            }

                            if (lookupHit) {
                                value = intermediateValue;
                                break;
                            }

                            context = context.parent;
                        }

                        cache[name] = value;
                    }

                    if (isFunction(value))
                        value = value.call(this.view);

                    return value;
                };

                /**
                 * A Writer knows how to take a stream of tokens and render them to a
                 * string, given a context. It also maintains a cache of templates to
                 * avoid the need to parse the same template twice.
                 */
                function Writer() {
                    this.cache = {};
                }

                /**
                 * Clears all cached templates in this writer.
                 */
                Writer.prototype.clearCache = function clearCache() {
                    this.cache = {};
                };

                /**
                 * Parses and caches the given `template` according to the given `tags` or
                 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
                 * that is generated from the parse.
                 */
                Writer.prototype.parse = function parse(template, tags) {
                    var cache = this.cache;
                    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
                    var tokens = cache[cacheKey];

                    if (tokens == null)
                        tokens = cache[cacheKey] = parseTemplate(template, tags);

                    return tokens;
                };

                /**
                 * High-level method that is used to render the given `template` with
                 * the given `view`.
                 *
                 * The optional `partials` argument may be an object that contains the
                 * names and templates of partials that are used in the template. It may
                 * also be a function that is used to load partial templates on the fly
                 * that takes a single argument: the name of the partial.
                 *
                 * If the optional `tags` argument is given here it must be an array with two
                 * string values: the opening and closing tags used in the template (e.g.
                 * [ "<%", "%>" ]). The default is to mustache.tags.
                 */
                Writer.prototype.render = function render(template, view, partials, tags) {
                    var tokens = this.parse(template, tags);
                    var context = (view instanceof Context) ? view : new Context(view);
                    return this.renderTokens(tokens, context, partials, template, tags);
                };

                /**
                 * Low-level method that renders the given array of `tokens` using
                 * the given `context` and `partials`.
                 *
                 * Note: The `originalTemplate` is only ever used to extract the portion
                 * of the original template that was contained in a higher-order section.
                 * If the template doesn't use higher-order sections, this argument may
                 * be omitted.
                 */
                Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, tags) {
                    var buffer = '';

                    var token, symbol, value;
                    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
                        value = undefined;
                        token = tokens[i];
                        symbol = token[0];

                        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
                        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
                        else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
                        else if (symbol === '&') value = this.unescapedValue(token, context);
                        else if (symbol === 'name') value = this.escapedValue(token, context);
                        else if (symbol === 'text') value = this.rawValue(token);

                        if (value !== undefined)
                            buffer += value;
                    }

                    return buffer;
                };

                Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
                    var self = this;
                    var buffer = '';
                    var value = context.lookup(token[1]);

                    // This function is used to render an arbitrary template
                    // in the current context by higher-order sections.
                    function subRender(template) {
                        return self.render(template, context, partials);
                    }

                    if (!value) return;

                    if (isArray(value)) {
                        for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
                        }
                    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
                        buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
                    } else if (isFunction(value)) {
                        if (typeof originalTemplate !== 'string')
                            throw new Error('Cannot use higher-order sections without the original template');

                        // Extract the portion of the original template that the section contains.
                        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

                        if (value != null)
                            buffer += value;
                    } else {
                        buffer += this.renderTokens(token[4], context, partials, originalTemplate);
                    }
                    return buffer;
                };

                Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
                    var value = context.lookup(token[1]);

                    // Use JavaScript's definition of falsy. Include empty arrays.
                    // See https://github.com/janl/mustache.js/issues/186
                    if (!value || (isArray(value) && value.length === 0))
                        return this.renderTokens(token[4], context, partials, originalTemplate);
                };

                Writer.prototype.renderPartial = function renderPartial(token, context, partials, tags) {
                    if (!partials) return;

                    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
                    if (value != null)
                        return this.renderTokens(this.parse(value, tags), context, partials, value);
                };

                Writer.prototype.unescapedValue = function unescapedValue(token, context) {
                    var value = context.lookup(token[1]);
                    if (value != null)
                        return value;
                };

                Writer.prototype.escapedValue = function escapedValue(token, context) {
                    var value = context.lookup(token[1]);
                    if (value != null)
                        return mustache.escape(value);
                };

                Writer.prototype.rawValue = function rawValue(token) {
                    return token[1];
                };

                mustache.name = 'mustache.js';
                mustache.version = '3.0.1';
                mustache.tags = ['{{', '}}'];

                // All high-level mustache.* functions use this writer.
                var defaultWriter = new Writer();

                /**
                 * Clears all cached templates in the default writer.
                 */
                mustache.clearCache = function clearCache() {
                    return defaultWriter.clearCache();
                };

                /**
                 * Parses and caches the given template in the default writer and returns the
                 * array of tokens it contains. Doing this ahead of time avoids the need to
                 * parse templates on the fly as they are rendered.
                 */
                mustache.parse = function parse(template, tags) {
                    return defaultWriter.parse(template, tags);
                };

                /**
                 * Renders the `template` with the given `view` and `partials` using the
                 * default writer. If the optional `tags` argument is given here it must be an
                 * array with two string values: the opening and closing tags used in the
                 * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
                 */
                mustache.render = function render(template, view, partials, tags) {
                    if (typeof template !== 'string') {
                        throw new TypeError('Invalid template! Template should be a "string" ' +
                            'but "' + typeStr(template) + '" was given as the first ' +
                            'argument for mustache#render(template, view, partials)');
                    }

                    return defaultWriter.render(template, view, partials, tags);
                };

                // This is here for backwards compatibility with 0.4.x.,
                /*eslint-disable */ // eslint wants camel cased function name
                mustache.to_html = function to_html(template, view, partials, send) {
                    /*eslint-enable*/

                    var result = mustache.render(template, view, partials);

                    if (isFunction(send)) {
                        send(result);
                    } else {
                        return result;
                    }
                };

                // Export the escaping function so that the user may override it.
                // See https://github.com/janl/mustache.js/issues/244
                mustache.escape = escapeHtml;

                // Export these mainly for testing, but also for advanced usage.
                mustache.Scanner = Scanner;
                mustache.Context = Context;
                mustache.Writer = Writer;

                return mustache;
            }));


            /***/
        })
/******/]);
});

/**
 * jquery.mask.js
 * @version: v1.14.9
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

'use strict';

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function (factory, jQuery, Zepto) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {

    var Mask = function (el, mask, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) { }
            },
            setCaret: function (pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) { }
            },
            events: function () {
                el
                    .on('keydown.mask', function (e) {
                        el.data('mask-keycode', e.keyCode || e.which);
                        el.data('mask-previus-value', el.val());
                    })
                    .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
                    .on('paste.mask drop.mask', function () {
                        setTimeout(function () {
                            el.keydown().keyup();
                        }, 100);
                    })
                    .on('change.mask', function () {
                        el.data('changed', true);
                    })
                    .on('blur.mask', function () {
                        if (oldValue !== p.val() && !el.data('changed')) {
                            el.trigger('change');
                        }
                        el.data('changed', false);
                    })
                    // it's very important that this callback remains in this position
                    // otherwhise oldValue it's going to work buggy
                    .on('blur.mask', function () {
                        oldValue = p.val();
                    })
                    // select all text on focus
                    .on('focus.mask', function (e) {
                        if (options.selectOnFocus === true) {
                            $(e.target).select();
                        }
                    })
                    // clear the value if it not complete the mask
                    .on('focusout.mask', function () {
                        if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                            p.val('');
                        }
                    });
            },
            getRegexMask: function () {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = { digit: mask.charAt(i), pattern: pattern };
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                        .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function () {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function (v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            calculateCaretPosition: function (caretPos, newVal) {
                var newValL = newVal.length,
                    oValue = el.data('mask-previus-value'),
                    oValueL = oValue.length;

                // edge cases when erasing digits
                if (el.data('mask-keycode') === 8 && oValue !== newVal) {
                    caretPos = caretPos - (newVal.slice(0, caretPos).length - oValue.slice(0, caretPos).length);

                    // edge cases when typing new digits
                } else if (oValue !== newVal) {
                    // if the cursor is at the end keep it there
                    if (caretPos >= oValueL) {
                        caretPos = newValL;
                    } else {
                        caretPos = caretPos + (newVal.slice(0, caretPos).length - oValue.slice(0, caretPos).length);
                    }
                }

                return caretPos;
            },
            behaviour: function (e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('mask-keycode');

                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                    var newVal = p.getMasked(),
                        caretPos = p.getCaret();

                    setTimeout(function (caretPos, newVal) {
                        p.setCaret(p.calculateCaretPosition(caretPos, newVal));
                    }, 10, caretPos, newVal);

                    p.val(newVal);
                    p.setCaret(caretPos);
                    return p.callbacks(e);
                }
            },
            getMasked: function (skipMaskChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                var lastUntranslatedMaskChar;
                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                            if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (valDigit === lastUntranslatedMaskChar) {
                            // matched the last untranslated (raw) mask character that we encountered
                            // likely an insert offset the mask character from the last entry; fall
                            // through and only increment v
                            lastUntranslatedMaskChar = undefined;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                            p.invalid.push({ p: v, v: valDigit, e: translation.pattern });
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            v += offset;
                        } else {
                            lastUntranslatedMaskChar = maskDigit;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                return buf.join('');
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function (name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMask = this, oldValue = p.val(), regexMask;

        mask = typeof mask === 'function' ? mask(p.val(), undefined, el, options) : mask;

        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function () {
            var caret = p.getCaret();
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret);
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function () {
            return p.getMasked(true);
        };

        // get masked value without the value being in the input or element
        jMask.getMaskedVal = function (val) {
            return p.getMasked(false, val);
        };

        jMask.init = function (onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
            jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
            jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);

            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask) {
                p.events();
                p.val(p.getMasked());
            } else {
                if (options.placeholder) {
                    el.attr('placeholder', options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('mask')) {
                    el.attr('autocomplete', 'off');
                }

                // detect if is necessary let the user type freely.
                // for is a lot faster than forEach.
                for (var i = 0, maxlength = true; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = false;
                        break;
                    }
                }

                if (maxlength) {
                    el.attr('maxlength', mask.length);
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret);
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-mask-',
            mask = input.attr('data-mask');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
            options.selectOnFocus = true;
        }

        if (notSameMaskObject(input, mask, options)) {
            return input.data('mask', new Mask(this, mask, options));
        }
    },
        notSameMaskObject = function (field, mask, options) {
            options = options || {};
            var maskObject = $(field).data('mask'),
                stringify = JSON.stringify,
                value = $(field).val() || $(field).text();
            try {
                if (typeof mask === 'function') {
                    mask = mask(value);
                }
                return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
            } catch (e) { }
        },
        eventSupported = function (eventName) {
            var el = document.createElement('div'), isSupported;

            eventName = 'on' + eventName;
            isSupported = (eventName in el);

            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] === 'function';
            }
            el = null;

            return isSupported;
        };

    $.fn.mask = function (mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskFunction = function () {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function () {
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.masked = function (val) {
        return this.data('mask').getMaskedVal(val);
    };

    $.fn.unmask = function () {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function () {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function () {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function (selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        // old versions of chrome dont work great with input event
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': { pattern: /\d/ },
            '9': { pattern: /\d/, optional: true },
            '#': { pattern: /\d/, recursive: true },
            'A': { pattern: /[a-zA-Z0-9]/ },
            'S': { pattern: /[a-zA-Z]/ }
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) {
        $.applyDataMask();
    }

    setInterval(function () {
        if ($.jMaskGlobals.watchDataMask) {
            $.applyDataMask();
        }
    }, globals.watchInterval);
}, window.jQuery, window.Zepto));

