import React from 'react';
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSingleStudent } from "../redux/store";

const avgGrade = (tests) => {
  return Math.round(
    tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
  }

// this is getting info into the singleStudent object.
  componentDidMount () {
    try {
      this.props.loadOneStudent(this.props.match.params.id)
    }
    catch (error) {
      console.error(error)
    }
  }
// match is given from react router gives us ^
// in our route path it has the :id this is the params above

  render() {
    const { student } = this.props;
    const hasTests = student.tests.length;

    return (
      <div>
        
        <h3>Detail: {student.fullName}</h3>
        {hasTests ? (
          <React.Fragment>
            <h3>Average grade: {avgGrade(student.tests)}%</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.tests.map((test) => {
                    return (
                      <tr key={test.id}>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <h4>No tests on record.</h4>
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log('MAP STATE SINGLE STUDENT')
  return {
    student: state.student
  }
}
// singleStudent  is in the store in the initialState


const mapDispatchToProps = (dispatch) => {
  console.log('MAP DISPATCH SINGLE STUDENT')
  return {
    loadOneStudent: (id) => dispatch(fetchOneStudent(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
