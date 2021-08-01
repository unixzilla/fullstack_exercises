import React from 'react'

const Header = props => {
    return <h1>{props.course}</h1>
}
const Part = props => {
    return <p>{props.part.name} {props.part.exercises}</p>
}
const Content = props => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}
const Total = props => {
    let total = 0
    props.parts.forEach(part => {total += part.exercises})
    return <p>Number of exercises {total}</p>
}
const Course = props => {
    return (
        <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts}/>
        </>
    )
}
const App = () => {
    const course = {
        name:'Half Stact application development',
        parts:[
            {
                name:'Fundamentals of React',
                exercises:10
            },
            {
                name :'Using props to pass data',
                exercises:7
            },
            {
                name : 'State of a component',
                exercises :14
            }
        ]
    }
    return (
        <div>
            <Course course={course} />
        </div>
    )
}

export default App;
