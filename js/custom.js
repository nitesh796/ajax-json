$(document).ready(function(){

  sendRequest();

  function sendRequest(){
    $.ajax({
      url: "data.json",
      dataType: 'json',
      success: function(result){
        var pgNum, pgData, json_data, search, dataArray = [];

        search = $("#search").val();
        if (search != "") {
          $("#demo").children().remove();
        } else {
          jQuery(function(){
            jQuery('a.page-link#1').click();
          });
        }

        // fetch and display data with pagination
        for (var x = 0; x < result.length; x++) {
          var dataItem = {};
          json_data = "<tr><td>" + result[x].id + "</td><td>" + result[x].name + "</td><td>" + result[x].email + "</td><td>" + result[x].message + "</td><td>" + result[x].date + "</td></tr>";
          dataItem = json_data;
          dataArray.push(dataItem);
        }

        if (dataArray.length % 5 == 0) {
          pgNum = dataArray.length / 5;
        } else {
          pgNum = (dataArray.length / 5) + 1;
        }
        for(var j = 1; j <= parseInt(pgNum); j++){
            pgData = "<a href='javascript:void(0);' class='page-link' id='" + j + "'>" + j + "</a>";
            $("#pagination").append(pgData);
        }

        $("a.page-link").click(function(){
          $("#demo").children().remove();
          var id, iter;
          id = $(this).prop('id');
          if (id == 1) {
            iter = 0;
          } else {
            iter = 5 * (id - 1);
          }
          for(var i = iter; i < 5 * id; i++){
            json_data = dataArray[i];
            $("#demo").append(json_data);
          }
        });
        // fetch and display data with pagination

        // search filter
        $("#search").keyup(function(){
          var searchString = $(this).val();
          var filterDataArray = [];

          if (searchString != "") {
            $("#demo").children().remove();
            $("#pagination").hide();
          } else {
            jQuery('a.page-link#1').click();
          }

          for(var k = 0; k < result.length; k++){
            var name, email, message;
            name = result[k].name;
            email = result[k].email;
            message = result[k].message;
            if(searchString != ""){
              if(name.indexOf(searchString) != -1 || email.indexOf(searchString) != -1 || message.indexOf(searchString) != -1){
                var filterDataRow = {};
                json_data = "<tr><td>" + result[k].id + "</td><td>" + name + "</td><td>" + email + "</td><td>" + message + "</td><td>" + result[k].date + "</td></tr>";
                filterDataRow = json_data;
                filterDataArray.push(filterDataRow);
              } else {
                var error = "<tr><td colspan='5'>No Records Found.</td></tr>";
                $("#demo").html(error);
              }
            }
          }

          var filterPgNum, filterPgData;
          if (filterDataArray.length % 5 == 0) {
            filterPgNum = filterDataArray.length / 5;
          } else {
            filterPgNum = (filterDataArray.length / 5) + 1;
          }

          if (searchString != "") {
            $("#pagination").hide();
            $("#pagination-filter").children().remove();
            for(var n = 1; n <= parseInt(filterPgNum); n++){
                filterPgData = "<a href='javascript:void(0);' class='page-link-filter' id='" + n + "'>" + n + "</a>";
                $("#pagination-filter").append(filterPgData);
            }
            jQuery(function(){
              jQuery("a#1.page-link-filter").click();
            });
            $("a.page-link-filter").click(function(){
              $("#demo").children().remove();
              var id, iter;
              id = $(this).prop('id');
              if (id == 1) {
                iter = 0;
              } else {
                iter = 5 * (id - 1);
              }
              for(var p = iter; p < 5 * id; p++){
                json_data = filterDataArray[p];
                $("#demo").append(json_data);
              }
            });

            $("#pagination-filter").show();

          } else {
              $("#pagination").show();
              $("#pagination-filter").hide();
          }
        });
        // search filter
      }
    });
  }

});
