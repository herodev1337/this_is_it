import React from 'react'

const card = [{
    name: "Fiat Multipla",
    description: "beste auto, yeah"
},
{
    name: "Fiat 500",
    description: "auch ok"
}] 

const Career = () => {
    return (
        <>
          {card.map((cards) => (
              <div className="card" key={cards.name}>
                <h2>{cards.name}</h2>
                <p>{cards.description}</p> 
              </div>
          ))}     
        </>
    )
}

export default Career
