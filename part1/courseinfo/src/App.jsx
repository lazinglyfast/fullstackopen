const Header = (props) => <h1>{props.course}</h1> 

// not a fan of too much horizontal span, just testing whether I could do this
const Content = (props) => props.entries.map((e, i) => <p key={i}>{e.name} {e.count}</p>)

const Total = (props) => <p>Number of exercises {props.entries.length}</p>

const App = () => {
    const course = "Half Stack application development"
    const part1 = "Fundamentals of React"
    const exercises1 = 10
    const part2 = "Using props to pass data"
    const exercises2 = 7
    const part3 = "State of a component"
    const exercises3 = 14
   
    var entries = [
        {name: part1, count: exercises1},
        {name: part2, count: exercises2},
        {name: part3, count: exercises3},
    ]

    return (
        <div>
            <Header course={course} />
            <Content entries={entries}/>
            <Total entries={entries}/>
        </div>
    )
}

export default App
