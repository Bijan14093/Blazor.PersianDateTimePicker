using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blazor.PersianDateTimePicker
{
    public static class Extenstions
    {
        /// <summary>
        /// مثال تعيين فرمت به شكل 
        /// {0}/{1}/{2} {3}:{4}:{5}
        ///  است
        /// </summary>
        public static string ToPersianDate(this string dateTime, bool WithTime = false, string Format = "")
        {
            string newDateTime = "";
            try
            {
                if (string.IsNullOrEmpty(dateTime))
                {
                    return "";
                }
                if (dateTime is object)
                {
                    var pc = new PersianCalendar();
                    DateTime myDate = DateTime.Parse(dateTime);
                    string year = pc.GetYear(myDate).ToString();
                    string month = pc.GetMonth(myDate).ToString().PadLeft(2, '0');
                    string day = pc.GetDayOfMonth(myDate).ToString().PadLeft(2, '0');
                    string Hour = pc.GetHour(myDate).ToString().PadLeft(2, '0');
                    string Minute = pc.GetMinute(myDate).ToString().PadLeft(2, '0');
                    string Second = pc.GetSecond(myDate).ToString().PadLeft(2, '0');
                    newDateTime = string.Format("{0}/{1}/{2}", year, month, day, Hour, Minute, Second);
                    if (WithTime)
                    {
                        //char.Parse("\u200E") LTR Control Character در نمايش گريدها تاريخ هاي فارسي درست نمايش داده نميشد.
                        newDateTime = string.Format(char.Parse("\u200E") + "{0}/{1}/{2} {3}:{4}:{5}", year, month, day, Hour, Minute, Second);
                    }
                    if (Format != "")
                    {
                        newDateTime = string.Format(Format, year, month, day, Hour, Minute, Second);
                    }
                }
            }
#pragma warning disable CS0168 // Variable is declared but never used
            catch (Exception Ex)
#pragma warning restore CS0168 // Variable is declared but never used
            {
                newDateTime = "";
            }
            return newDateTime;
        }

        public static DateTime? ToDateTime(this string PersianDate)
        {
            if (string.IsNullOrEmpty(PersianDate))
            {
                return null;
            }
            if (PersianDate.Length == 8 && PersianDate.Contains("/") == false && PersianDate.Contains("-") == false)
            {
                PersianDate = PersianDate.Substring(0, 4) + "-" + PersianDate.Substring(4, 2) + "-" + PersianDate.Substring(6, 2);
            }
            char spliton = '-';
            if (PersianDate.Contains("/"))
            {
                spliton = '/';
            }
            PersianCalendar persianCalendar = new PersianCalendar();
            var FirstIndex = PersianDate.IndexOf(spliton);
            var LastIndex = PersianDate.LastIndexOf(spliton);
            if (FirstIndex < 0)
            {
                return null;
            }
            string year = PersianDate.Substring(0, FirstIndex);
            string month = PersianDate.Substring(FirstIndex + 1, (LastIndex - FirstIndex - 1));
            string day;
            string hour;
            string minute;
            string second;

            if (PersianDate.IndexOf(' ') <= 0)
            {
                day = PersianDate.Substring(LastIndex + 1, PersianDate.Length - (LastIndex + 1));
                hour = "00";
                minute = "00";
                second = "00";
            }
            else
            {
                day = PersianDate.Substring(LastIndex + 1, PersianDate.IndexOf(' ') - (LastIndex + 1));
                var tmp = PersianDate;
                tmp = tmp.Replace(' ', '#');
                FirstIndex = tmp.IndexOf(':');
                LastIndex = tmp.LastIndexOf(':');
                hour = PersianDate.Substring(tmp.LastIndexOf('#') + 1, FirstIndex - tmp.LastIndexOf('#') - 1);
                minute = PersianDate.Substring(FirstIndex + 1, (LastIndex - FirstIndex - 1));
                second = PersianDate.Substring(LastIndex + 1, PersianDate.Length - (LastIndex + 1));

            }
            DateTime dateTime = persianCalendar.ToDateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day), Convert.ToInt32(hour), Convert.ToInt32(minute), Convert.ToInt32(second), 0);
            return dateTime;
        }
    }
}
