$(document).ready(function(){

  sendRequest();

  function sendRequest(){
    $.ajax({
      url: "data.json",
      dataType: 'json',
      success: function(result){
        var search, showListNum = $("#showList").val();

        search = $("#search").val();
        if (search != "") {
          $("#demo").children().remove();
        } else {
          jQuery(function(){
            jQuery('a.page-link#1').click();
          });
        }

        $("#showList").change(function(){
          showListNum = $(this).val();
          sendRequest();
        });

        $("#pagination").children().remove();

        // fetch data with pagination
        fetchDataWithPagination(result, showListNum);

        // search filter
        // $("#search").keyup(function(){
        //   searchString = $(this).val();
        //   $("#showList").change(function(){
        //     showListNum = $(this).val();
        //     $("#search").keyup();
        //     searchFilter(result, searchString, showListNum);
        //   });
        //   searchFilter(result, searchString, showListNum);
        // });

      }
    });
  }


  // Functions
  function fetchDataWithPagination(result, showListNum){

    var pgNum, pgData, json_data, dataArray = [];

    for (var x = 0; x < result.length; x++) {
      var dataItem = {};
      json_data = "<tr><td>" + result[x].id + "</td><td>" + result[x].name + "</td><td>" + result[x].email + "</td><td>" + result[x].message + "</td><td>" + result[x].date + "</td></tr>";
      dataItem = json_data;
      dataArray.push(dataItem);
    }

    if (dataArray.length % showListNum == 0) {
      pgNum = dataArray.length / showListNum;
    } else {
      pgNum = (dataArray.length / showListNum) + 1;
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
        iter = showListNum * (id - 1);
      }
      for(var i = iter; i < showListNum * id; i++){
        json_data = dataArray[i];
        $("#demo").append(json_data);
      }
    });

  }

  function searchFilter(result, searchString, showListNum){

    var json_data, filterPgNum, filterPgData, filterDataArray = [];

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

    if (filterDataArray.length % showListNum == 0) {
      filterPgNum = filterDataArray.length / showListNum;
    } else {
      filterPgNum = (filterDataArray.length / showListNum) + 1;
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
          iter = showListNum * (id - 1);
        }
        for(var p = iter; p < showListNum * id; p++){
          json_data = filterDataArray[p];
          $("#demo").append(json_data);
        }
      });

      $("#pagination-filter").show();

    } else {
        $("#pagination").show();
        $("#pagination-filter").hide();
    }

  }

});
