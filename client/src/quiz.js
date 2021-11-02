import $ from "jquery";

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
});