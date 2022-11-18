const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h4>Total of {sum} exercises</h4>

const Content = ({ parts }) => parts.map(
  (part) => <Part key={part.id} part={part}/>
)

const Part = ({ part }) => 
  <p>{part.name} {part.exercises}</p>

const Course = ({course}) => {
    const total =
      course.parts.reduce ((s, p) => s + p.exercises, 0)
    
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total sum={total} />
      </div>
    )
}

export default Course
