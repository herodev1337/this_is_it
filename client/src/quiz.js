import $ from "jquery";

function validateAnswer(quizId, questionId, answerId, selector) {
    $.ajax({
        url: "/api/quiz/verify?quizId=" + quizId + "&questionId=" + questionId + "&answerId=" + answerId, 
        success: (result) => {
        if(!result.error){
            if (result.data){
                selector.removeClass('btn-light')
                selector.addClass('btn-success')
                setTimeout(()=>{
                    $('.carousel').carousel('next');
                }, 500)
            } else {
                selector.removeClass('btn-light')
                selector.addClass('btn-danger')
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