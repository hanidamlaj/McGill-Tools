import React from "react";

import Button from "@material-ui/core/Button"

import CourseQuery from "../../actions/types"

function ScheduleBuilder({ requestCourse, user }) {

    const searchClass = () => {
        const request: CourseQuery = {
            faculty: 'math',
            course: '240',
            year: '2021',
            semester: 'winter'
        }
        requestCourse(request).then(res => {
            console.log(res)
        });
    }

    return (
        <React.Fragment>
            <div>
                Hello world!
                <Button color="primary" onClick={searchClass}>Click me!</Button>
            </div>
        </React.Fragment>
    );
}

export default ScheduleBuilder;