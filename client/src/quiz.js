import $ from "jquery";
window.$ = window.jQuery = $;

function validateAnswer(quizId, questionId, answerId, selector) {
    $.ajax({
        url: "/api/quiz/verify?quizId=" + quizId + "&questionId=" + questionId + "&answerId=" + answerId, 
        success: (result) => {
        if(!result.error){
            if (result.data){
                selector.removeClass('btn-light')
                selector.addClass('btn-success')
                selector.parent().parent().find('button').prop('disabled', true)
                let current = $('#answer-counter').children('span').text()
                current++;
                $('#answer-counter').children('span').text(current)
                setTimeout(()=>{
                    $('.carousel').carousel('next');
                }, 1000)
            } else {
                selector.removeClass('btn-light')
                selector.addClass('btn-danger')
                selector.parent().parent().find('button').prop('disabled', true)
                setTimeout(()=>{
                    $('.carousel').carousel('next');
                }, 1000)
            }
        }
    }});
}

$(function () {
    $('.answer-button').on('click', async function (e) {
        const quizId = $(location).attr('pathname').split('/').slice(-1)[0]
        const questionId = $(this).closest('.carousel-item').attr('id')
        const answerId = $(this).attr('id')
        validateAnswer(quizId, questionId, answerId, $(this))
    })

    $('#start-quiz').on('click', function (e) {
        setTimeout(()=>{
            $('.carousel').carousel('next');
        }, 300)
    })

    $('.answer-collapse').on('click', function(e) {
        $(this).siblings('.collapse').collapse('toggle')
        // var rot = $(this).data('rotate');
        // $(this).data('rotate', ! rot ? 0 : 90);
        // $(this).children('span').rotate({animateTo: rot});
    })

    $('#add-answer').on('click', function(e){
        const table = $('#added-answers').find('tbody')
        const nr = table.children().length
        const answer = $('#new-answer-content')
        const newAnswerHTML = `
            <tr class="align-middle">
                <th scope="row">${nr}</th>
                <td class="answer-name">
                    <input name="answer" type="text" class="form-control" disabled value="${answer.val()}">
                </td>
                <td class="answer-true">
                    <input name="check-correct" type="checkbox" disabled ${$("#new-check-correct").is(":checked") && "checked='checked'"} class="form-check-input" value="isEnabled">
                </td>
                <td><a href="#" class="edit-answer"><i class="bi bi-pencil-square"></i></a></td>
            </tr>`
       table.append(newAnswerHTML)
       answer.val('')
    })

    $(document).on('click', '.edit-answer', function(e){
        const icon = $(this).children('.bi');
        const check = $(this).parent('td').siblings('.answer-true').children('input');
        const answer = $(this).parent('td').siblings('.answer-name').children('input');

        if (icon.attr('class').includes("bi-pencil-square")){
            icon.removeClass("bi-pencil-square")
            icon.addClass("bi-check2-square")
            check.removeAttr('disabled')
            answer.removeAttr('disabled')
        } else {
            icon.addClass("bi-pencil-square")
            icon.removeClass("bi-check2-square")
            check.attr('disabled', true)
            answer.attr('disabled', true)
        }
    })

    $('#add-question').on('click', function(e){
        const questionView = $('#added-questions').children('.card')
        const question = $('#new-question-content')
        const explanation = $('#new-question-explanation')
        const table = $('#added-answers').find('tbody').children('tr')
        const answers = []
        table.each((i, answer) => {
            const name = $(answer).find('.answer-name').children('input').val()
            const correct = $(answer).find('.answer-true').children('input').is(':checked')
            answers.push({name: name, correct: correct})
        })
        const newQuestionHTML = `
            <div class="added-question-list-item">
                <div class="list-group-item list-group-item-action d-flex justify-content-between">
                    <div>
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${question.val()}</h5>
                        </div>
                        <p class="mb-1"><i>${explanation.val()}</i></p>
                    </div>
                    <div>
                        <div class="w-100">
                            <a href="#"><i class="bi bi-pencil-square"></i></a>
                            <a href="#"><i class="bi bi-trash-fill"></i></a>
                        </div>
                        <a href='#' class="w-100">
                            <span class="badge bg-primary rounded-pill">${table.length}</span>
                        </a>
                    </div>
                </div>
                <div class="collapse added-answers-coll"></div>
            </div>`
        questionView.append(newQuestionHTML)

        $('.added-question-list-item').on('click', function(e){
            $(this).children('.collapse').collapse('toggle')
        })

        answers.forEach((answer, i) => {
            const newAnswersHTML = `
                <div class="list-group-item list-group-item-action d-flex justify-content-between">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${answer.name}</h5>
                    </div>
                    ${(answer.correct ? '<i class="bi bi-check-square-fill"></i>' : '<i class="bi bi-x-square-fill"></i>')}
                </div>`
            questionView.last('.added-question-list-item').children('.added-answers-coll').append(newAnswersHTML)
        })

        question.val('')
        explanation.val('')
        $('#added-answers').find('tbody').empty()
        questionView.children().length == 0 ? questionView.parent().hide() : questionView.parent().show()
    })

    $('#quiz-form').on('submit', function(e) {
        alert("test")
    })
});