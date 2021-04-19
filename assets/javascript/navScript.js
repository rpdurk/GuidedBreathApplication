function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

    const container = document.getElementsByClassName('container')[0];
    container.style.filter = 'brightness(85%)';
    // const mainContainer = document.getElementById('main');
    // mainContainer.style.filter = 'brightness(85%)';
    document.body.style.filter = 'brightness(85%)';
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    // document.body.style.backgroundColor = "white";
    const container = document.getElementsByClassName('container')[0];
    container.style.filter = '';
    // const mainContainer = document.getElementById('main')[0];
    // mainContainer.style.filter = '';
    document.body.style.backgroundColor = "white";
  }