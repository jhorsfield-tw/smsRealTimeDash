$(document).ready(function(){

  $('#dataTable').DataTable({

   "bDestroy": true,
   "deferRender": true,
   "columnDefs": [
      { 
         targets: 0,
         render : function(data, type, row, meta){
            if(type === 'display'){
              console.log('This is the data bit: '+data);
              let url = 'https://www.twilio.com/console/sms/logs/'+data;
               return $('<a>')
                  .attr('href', url)
                  .attr('target', '_blank')
                  .text(data)
                  .wrap('<div></div>')
                  .parent()
                  .html();

            } else {
               return data;
            }
         }
      } 
   ]
});

    var dataTable = $("#dataTable").DataTable()
    var customerChannel = pusher.subscribe('message');
    customerChannel.bind('add', function(data) {
    var body = data.data;
    //let url = 'https://www.twilio.com/console/sms/logs/'+body.sid;
    //var newLink = $('<a href=#>'+body.sid+'</a>');
    dataTable.row.add([
        body.sid,
        body.direction,
        body.from,
        body.to,
        body.date,
        body.status
      ]).draw( false );
    });
  });

  $(document).bind('DOMSubtreeModified', function (){
    $('#dataTable tr').each(function () {
      var td_value = $('td', this).eq(5).text();
      //var tdData = $('td', this).eq(0).text();
      //let url = 'https://www.twilio.com/console/sms/logs/'+tdData;     
        switch (td_value) {
          case 'undelivered':
            $(this).addClass('undeliver');
          break;
        }
      });
  })