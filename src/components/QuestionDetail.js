import React from 'react'

function QuestionDetail(props) {
    console.log(props)
    return (
        <div>
            question detail {props.match.params.id}
        </div>
    )
}

export default QuestionDetail
