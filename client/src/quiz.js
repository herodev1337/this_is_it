import $ from "jquery";

$(function () {
    
    $.ajax({url: "/api/quiz", success: function(result){
        if(!result.error){
            //result.data[0].name
            $('#quizList').empty();
            result.data.forEach(quiz => {
                var quizHTML = `
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${quiz.name}</h5>
                    </div>
                    <p class="mb-1">Anleitung: <i>${quiz.instructions}</i></p>
                    <span class="badge bg-primary rounded-pill">${quiz.questions.length}</span>
                </a>`;
                $("#quizList").append(quizHTML);
            })
        }
    }});
    // lobbies.forEach((lobby) => {
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