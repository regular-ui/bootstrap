
var tpl = require('./template/datepicker.html');
var Regular = require('regularjs');
var dom = Regular.dom;

var DNUMS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getDays( year, month ){
  return ( isLeap(year) && month === 1 )? 29 : DNUMS[month];
}

function isLeap(year){
  return !(year % 4) && ( year % 100 ) || !( year%400 )
}


var Datepicker = Regular.extend({
  name: "datepicker",
  template: tpl, 
  config: function(data){
    // initialize the month grid
    var grid = [], i = 6, j = 7;
    for(;i--;){
      grid[i] = [];
      j = 7;
      for(;j--;) {
        grid[i][j] = {num:"1", state: "1"};
      }

    }
    data.grid = grid;
    data.dateMode = data.dateMode || 1;
    data.nowTime = new Date();
    data.linkage= data.linkage || false;
    data.linkageban= data.linkageban? true:false;
    data.selected = data.selected || +new Date();
      data.noprevallow=data.noprevallow? true:false;
      if(data.noprevallow){
          this.checkPrev(data.nowTime.getFullYear(),data.nowTime.getMonth());
      }
    this.$watch("show", function(show){
      if(show) this.afterSelectChange();
    })
    this.$watch("selected", function(selected){
      if(this.data.show) this.afterSelectChange();
    })
  },
  init: function(){

    var self = this;
    // 每当show
    var destroy = function(ev){
      var current = ev.target;
      while(current && current.tagName && current.tagName.toLowerCase()!=='body'){
        if(current === self.$refs.view ) return;
        current = current.parentNode;
      }
      self.$update("show", false);
    }
    dom.on(document.body, 'click', destroy);
  },
  afterSelectChange: function(){
    var data = this.data;
    data.selected = +data.selected;
    if(!data.selected) return;
    var odate = new Date(data.selected);
      console.log(data.selected);
    this.resetDay(odate.getFullYear(), odate.getMonth());
    this.resetTime(odate.getHours(), odate.getMinutes());
    this.$update();
  },
  resetDay: function(year, month){
    if(month > 11){
      month = month - 12;
      year +=1;
    }
    if(month < 0){
      year-=1;
      month = month + 12;
    }
    var data = this.data;
    var start = new Date(year, month, 1),
      monthDays = getDays(year, month),
      sday = start.getDay() ,
      grid = this.data.grid ,
      preMonthDays = getDays(year,  (month + 11) % 12 + 1);

    // 初始化
      if(data.noprevallow){
          //限制输入
          if(this.data.nowTime.getMonth()==month && this.data.nowTime.getFullYear() == year){
              var isCurrentMonth=true;
              var currentDay=this.data.nowTime.getDate();
          }
      }
    for(var i = 0; i < grid.length ; i ++){
      for(var j=0; j < 7; j++){
        var num = i * 7 - sday + j + 1 ;
        var disable = false;
        var item = grid[i][j];
        if(num < 1){
          num = num + preMonthDays;
          disable = true;
          item.date = null;
        }else if(num > monthDays) {
          num = num - monthDays;
          disable = true;
          item.date = null;
        }else{
          disable = false;
          item.date = +new Date(year, month, num) ;
        }
          if(isCurrentMonth){
              if(num<currentDay){
                  disable=true;
                  item.date=null;
              }
          }
        item.num =  num;
        item.disable =  disable;
        
      } 
    }
      if(data.noprevallow){ //not permitted prev select
          if(!this.checkPrev(year,month)){
              return false;
          }
      }
      data.month = month;
      data.year = year;

  },
  resetTime: function(hour, minute, slilent){
    var data = this.data;
    hour = parseInt(hour || 0, 10);
    minute = parseInt(minute || 0, 10)
    if(minute > 59){
       minute -= 60
       hour += 1
    }else if(minute < 0){
       minute +=60
       hour -=  1
    }
    if(hour > 23 ){
      hour -= 24; 
    }else if(hour < 0){
      hour += 24; 
    }

    data.hour = hour;
    data.minute = minute;
    this.updateSelected();

  },
  switchMonth: function(flag){
    var data = this.data;
    data.monthMode = flag;
    if(flag) data.myear = data.year;
  },
  updateSelected: function(){
    var data = this.data;
    var minuteStep = 1000 * 60;
    if(!data.selectedDay) data.selectedDay = +this._normalize(data.selected)
    data.selected = data.selectedDay + data.hour * minuteStep * 60 + data.minute * minuteStep;
    this.$update();

    
  },
  pickDay: function(date){
    if(!date) return;
    this.data.selectedDay = date;
    this.updateSelected();
  },
  _normalize: function( date ){
    if(!(date instanceof Date)) date = new Date(date);
    return new Date( date.getFullYear(), date.getMonth(), date.getDate());
  },
  _match: function(date, year, month, day){
    if(!date) return false;
    date = new Date(date);
    if(year !=null && date.getFullYear() !== year) return false; 
    if(month !=null && date.getMonth() !== month) return false; 
    if(day !=null && date.getDate() !== day) return false; 
    return true
  },
  is: function(year, month, day){
    return this._match(this.data.selectedDay, year, month, day);
  },
    checkPrev:function(_year,_month){
        var data=this.data;
        if(_year<data.nowTime.getFullYear()){
            data.prevdisabled=true;
            return false;
        }else if(_year==data.nowTime.getFullYear() && _month<=data.nowTime.getMonth()){
            data.prevdisabled=true;
            return true;
        }else{
            data.prevdisabled=false;
        }
        return true;
    },
    checkMonth:function(_month){
        if(this.data.noprevallow){
            if(this.data.myear==this.data.nowTime.getFullYear() && _month <this.data.nowTime.getMonth()+1){
                return true;
            }
        }
        return false;
    }

}).filter({
  i18n: function( value, type ){
      var lang = Datepicker.langs["zh"];
      var translator = lang[type || 'normal'];
      return translator && (typeof translator === "function"? translator(value) : translator[value]) || value;
  },
  norm: {
    get:function(value){
      var str = "" + value;
      return str.length === 1? "0" + str : str;
    },
    set:function(value){
      return value;
    }
  }

})

  var format = (function(){
    function fix(str){
      str = "" + (str || "0");
      return str.length <= 1? "0" + str : str;
    }
    var maps = {
      'yyyy': function(date){return date.getFullYear()},
      'MM': function(date){return fix(date.getMonth() + 1); },
      'dd': function(date){ return fix(date.getDate()) },
      'HH': function(date){ return fix(date.getHours()) },
      'mm': function(date){ return fix(date.getMinutes())}
    }

    var trunk = new RegExp(Object.keys(maps).join('|'),'g');
    return function(value, format){
      if(!value) return;
      format = format || "yyyy-MM-dd HH:mm";
      value = new Date(parseInt(value));

      return format.replace(trunk, function(capture){
        return maps[capture]? maps[capture](value): "";
      });
    }
  })();

  Regular.filter("format", format);

  Datepicker.langs = {
    normal: {},
    zh: {
      week: function(value){
        return  ["日", "一", "二", "三", "四", "五", "六"][value];
      }

    }
  }

module.exports = Datepicker;



