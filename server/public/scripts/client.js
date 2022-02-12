$(document).ready(onReady);




function onReady() {
    console.log('JQ');

    clickListeners();
    
}// end onReady





function clickListeners() {
    $('#addButton').on('click', postTask);


    
}// end clickListeners




function postTask() {
    let taskToAdd = {
        task: $("#taskIn").val(),
        dueBy: $("#dueByIn").val(),
      };
      $.ajax({
        method: "POST",
        url: "/tasks",
        data: taskToAdd,
      })
        .then(function (response) {
          console.log("Response from server.", response);
          //empty inputs
          $("#taskIn").val(''),
            $("#dueByIn").val(''),

          // append to DOM with a function here
          getKoalas();
    
    
        }).catch(function(error) {
          console.log('Error in POST postTask()', error)
          alert('Unable to add task at this time. Please try again later.');
        });
}// end postTask






function getTask() {
    
    // get object back from server
    
    // append to DOM


    
}// end getTask