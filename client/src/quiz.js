import $ from "jquery";
import "./scss/app.scss";

$(function () {
    $('#quizList').empty();
    $.ajax({url: "/api/quiz", success: function(result){
        console.log(result)
    }});
    // lobbies.forEach((lobby) => {
    //     var list = `
    //     <a href="#" onClick="socket.emit('LOBBY_CONNECT', '${lobby.id}');" class="list-group-item list-group-item-action">
    //         <div class="d-flex w-100 justify-content-between">
    //             <h5 class="mb-1">${lobby.name}</h5>
    //         </div>
    //         <p class="mb-1">Hoster: <i>${lobby.host}</i></p>
    //         <span class="badge bg-primary rounded-pill">${lobby.size}</span>
    //     </a>`;
    //     $("#lobbyList").append(list);
    // })    
});