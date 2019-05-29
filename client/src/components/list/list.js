import React from 'react';
import './list.css';

class List extends React.Component {

    render() {
        // console.log("list propssss:",this.props.list);
        let tasks = this.props.list.map((todo, index) => {

            return  <div key={index}>
                        <div className="d-flex justify-content-between list">
                            {todo.task}
                            <button value={index}
                                className="btn btn-outline-danger btn"
                                onClick={(e) => {this.props.removeHandlerList(e, todo.id)
                            }}>Remove</button>
                        </div>
                    </div>
        }).reverse();

        return (
            <React.Fragment>
                {tasks}
            </React.Fragment>
        );
    }
}

export default List;