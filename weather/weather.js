/**
 * Created by Administrator on 2017/8/8.
 */
$(function () {
    var city = '';
    var weather_data;
    $.ajax({
        url:'http://jirenguapi.applinzi.com/city.php',
        method:'GET',
        success:function (res) {
            city = res.slice(0,res.length-1);
            $.ajax({
                url:'http://jirenguapi.applinzi.com/weather.php',
                method:'GET',
                data:{city:city},
                success:function (res1) {
                    var obj = JSON.parse(res1).results;
                    weather_data = obj[0].weather_data;
                    render(weather_data);
                }
            })
        },
        error:function () {
            alert('通信失败');
        }
    });
    function render(data) {
        var rain = '雨';
        var nowObj = data[0];
        var weatherState = nowObj.weather;
        var weaNowContent = '<li>'+nowObj.date+'</li>'+
            '<li>'+'<img src="'+nowObj.dayPictureUrl+'">'+'&nbsp;'+'<img src="'+nowObj.nightPictureUrl+'">'+'</li>'+
            '<li>'+nowObj.weather+'</li>'+
            '<li>'+nowObj.temperature+'</li>'+
            '<li>'+nowObj.wind+'</li>'
        $('.weatherNow').html(weaNowContent);
        var weaFurContent = '';
        for(var i=1,len=data.length;i<len;i++){
            var weaFuture = data[i];
            weaFurContent+= '<li>'+
                '<span>'+weaFuture.date+'</span>'+'<p>'+'<img src="'+weaFuture.dayPictureUrl+'">'+
                '&nbsp;'+ '<img src="'+weaFuture.nightPictureUrl+'">'+'</p>'+
                '<p>'+weaFuture.temperature+'</p>'+
                '<p>'+weaFuture.weather+'</p>'+
                '<p>'+weaFuture.wind+'</p>'+
                '</li>'
        }
        $('.futureWeather').html(weaFurContent);
        if(weatherState.indexOf(rain) == -1){
            //没有雨字
            $('.main').css('backgroundImage','-webkit-linear-gradient(top, rgb(13, 104, 188), rgb(114, 173, 224))');
            $('.weather_top').css(
                { background:'url("http://i4.bvimg.com/1949/c443ab74d8c086f3.jpg")',
                    backgroundSize:'cover'}
            )
        }else {
            //有雨字
            $('.main').css('backgroundImage','-webkit-linear-gradient(top,rgb(53, 55, 59), rgb(115, 146, 122))')
            $('.weather_top').css(
                {background:'url("http://i4.bvimg.com/1949/4de8d0ce4cc66e6a.jpg")',
                    backgroundSize:'cover'}
            )
        }
    }
})