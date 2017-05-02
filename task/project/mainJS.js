  const eventsContainer = document.getElementById('tasksContainer');
  let myObj;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      console.log(myObj);
      document.getElementById("active").addEventListener("click", function(){loadMiss(myObj)});
      document.getElementById("navBorders").addEventListener("click", function(){loadUsers(myObj)});

    }
  };
  xhttp.open("GET", "https://www.oneupsales.io/tech-test/get-missions-data", true);
  // xhttp.open("POST", "https://www.oneupsales.io/tech-test/create-mission", true);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhttp.send();

  function loadMiss(myObj)
  {
    eventsContainer.innerHTML = '';
    let count = 1;
  for (var variable in myObj.missions) {
      console.log(myObj.missions[variable].description);
      eventsContainer.innerHTML += '<div class="item" id="item">' +
      '<span class="itemTitle" id="subItems">ID: ' + myObj.missions[variable].id +'</span>' +
      '<span class="itemName" id="subItems">Name: ' + myObj.missions[variable].name +'</span>' +
      '<span class="itemProgress" id="subItems">Description: ' + myObj.missions[variable].description + '</span>' +
      '<label for="dropdown">&#916;</label>' +
      '<input id="dropdown" type="checkbox"></input>' +
      '<div id="expandable">' +
      '<h3 style="margin-left: 15px;">Members working on this mission:</h3>' +
      '<div style="margin-left:15px;" id="users'+count+'"></div>' +
      '<div style="margin-left:15px;" id="userInfo'+count+'"></div>' +
      '</div>' +
      '</div>';
      count++;
      console.log(count);



  }
  loadMembers(myObj, variable);
  loadUser(myObj);
  drop();
  }

  function loadMembers(myObj, mission)
  {
    for (var variable in myObj.missions[mission].members) {
      //console.log(myObj.missions[mission].members[variable]);
      var users = myObj.missions[mission].members[variable];
      for (let i = 1; i <= 3; i++) {
        document.getElementById('users'+i).innerHTML +=  '<input class="userButton" type="button" value="' + myObj.users[users].surname + '">';
      }
    }
  }

  function loadUser(myObj)
  {
    for (let i = 1; i <= 3; i++) {
      const usersButton = document.getElementById('users'+i).children;
        for (child of usersButton) {
          child.addEventListener('click', function() {
            for (const user in myObj.users) {
              if (myObj.users[user].surname == this.value) {
                console.log(myObj.users[user]);
                document.getElementById('userInfo'+i).innerHTML = '<h3>User Info: </h3>' +
                '<span><b style="color: red;">Forename:</b> ' + myObj.users[user].forename + ' </span>' +
                '<span><b style="color: red;">Surname:</b> ' + myObj.users[user].surname + ' </span>' +
                '<span><b style="color: red;">Email:</b> ' + myObj.users[user].email + ' </span>';
                }
            }
        });
        }
      }
  }

  function loadUsers(myObj)
  {
    eventsContainer.innerHTML = '';
    eventsContainer.innerHTML = '<div id="profiles" class="item" style="width: 30%;margin-bottom: 25px;"></div>';
    console.log(myObj.users);
    for (var variable in myObj.users) {
      document.getElementById('profiles').innerHTML += '<div id="onClick" class="usersContent">' +
      '<h3 style="margin-left: 15px;">' + myObj.users[variable].forename + ' ' + myObj.users[variable].surname + '</h3>' +
      '<div id="user"><p>User ID: ' + myObj.users[variable].id + '</p><p>Email: ' + myObj.users[variable].email + '</p>' +
      // '<img src="' + myObj.users[variable].profile_pic + '">' + broken link*
      '</div>' +
      '</div>';
    }
  }
  // this is dropdown sub items that i didnt get to finish
  function drop()
  {
    document.getElementById('dropdown').addEventListener('click', function()
  {
    let drop = document.getElementById('item').children;

    for (variable in drop) {

      if(drop[variable].id == 'expandable')
      {
        console.log(drop[variable].style);
        if (this.checked) {
          drop[variable].style.display = "block";
        } else {
          drop[variable].style.display = "none";
        }
      }
    }
  });
  }

  var elem = document.getElementById("myBar");
  var width = 0;
  var id = setInterval(frame, 30);
  function frame() {
      width++;
      elem.style.width = width + '%';
      document.getElementById("demo").innerHTML = width * 1  + '%';
      if(width >= 100)
      {
        width = 0;
      }
  }
