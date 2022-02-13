$(document).ready(onReady);




function onReady() {
    console.log('JQ');

    clickListeners();
    
}// end onReady





function clickListeners() {
    $('#addButton').on('click', postTask);
    $('#viewTasks').on('click', ".btn-delete", deletetask);
    $('#viewTasks').on('click', ".btn-isComplete", isComplete);
    
}// end clickListeners




function postTask() {
    let taskToAdd = {
        task: $("#taskIn").val(),
        dueBy: $("#dueByIn").val(),
        completed: false
      };
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: taskToAdd,
            }).then(function(response) {
              console.log('Response from server.', response);
                
                // append to DOM with a function here
                getTask();  
            
            }).catch(function(error) {
              console.log('Error in POST', error)
              alert('Unable to add task at this time. Please try again later.');
            });    
}// end postTask






function getTask() { //refresh books
    
    // get object back from server
    
    console.log("in getTask");
    $('#viewTasks').empty();
    $.ajax({
      type: "GET",
      url: "/tasks",
    })
      .then(function (response) {
        console.log(response);

        // loop through so you can append each to the DOM

        renderTasks(response);

      })
      .catch(function (error) {
        console.log("error in GET", error);
      });

    
}// end getTask



function renderTasks(tasks) {
    $('#viewTasks').empty();
    for(let i = 0; i < tasks.length; i += 1) {
        let task = tasks[i];
        console.log(task);        
        // For each book, append a new row to our table

        if (task.completed) {
            $('#viewTasks').append(`
          <tr data-id=${task.id} class="green">
            <td>${task.task}</td>
            <td>${task.dueBy}</td>
            <td>${task.completed}</td>
            <td><button class="btn-isComplete" data-id=${tasks[i].id}>Mark as Complete ✅</button>
            <td><button class="btn-delete" data-id=${tasks[i].id}>Delete ❌</button></td>
          </tr>
        `);
        }else  {
            $('#viewTasks').append(`
          <tr data-id=${task.id} class="plain">
            <td>${task.task}</td>
            <td>${task.dueBy}</td>
            <td>${task.completed}</td>
            <td><button class="btn-isComplete" data-id=${tasks[i].id}>Mark as Complete ✅</button>
            <td><button class="btn-delete" data-id=${tasks[i].id}>Delete ❌</button></td>
          </tr>
        `);
        }
      }

    
}// end renderTasks




function deletetask() {
    console.log('delete clicked');
    let taskId = $(this).data().id;
    console.log($(this).data().id);
    
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    })
    .then(function(response){
        console.log('deleted a task client side');
        //refresh table data
        refreshTasks();
    })
    .catch(function(error){
        console.log('error DELETEing task', error );
        
    })
  }// end deletetask



  function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
      }).then(function(response) {
        console.log(response);
        renderTasks(response);
      }).catch(function(error){
        console.log('error in GET', error);
      });
  }// refreshTasks




  function isComplete() {
    console.log('clicked isComplete button');
    let id = $(this).closest('tr').data().id;
    console.log(id);
    // let isReadBoolean = $(this).closest('tr').data().id;
    // console.log('this is', isReadBoolean);
    
    
    //call $.ajax for PUT
    //need id and direction
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            
        }
    }).then(function(response) {
        //after a GET, POST, PUT do a GET
        refreshTasks();
    }).catch(function(err) {
        console.log(err);
        
    })
      
  }// isComplete