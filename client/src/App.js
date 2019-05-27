import React, { Component } from 'react';
import './App.css';

import Content from './components/content/content';

class App extends Component {

	constructor(){
		super();
		this.state = {
            list: [],
            deletedList: [],
            inputText: "",
            story: [],
	   };
        this.submitHandler = this.submitHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
	}

    componentDidMount() {

        Promise.all([fetch('/todos'), fetch('/story')])

        .then(([res1, res2]) => {
            return Promise.all([res1.json(), res2.json()])
        })
        .then(([res1, res2]) => {
            this.setState({list: res1})
            this.setState({story: res2})
        });
    }

    changeHandler(event) {
        this.setState({inputText: event.target.value});
        console.log(event.target.value)
    }

    submitHandler(event) {
        let newList = this.state.list;
        let inputTask = event.target.task.value;
        event.preventDefault();

        if (inputTask.length > 1) {
            newList.push({
                task: inputTask,
            });

            this.setState({
                list: newList,
                inputText: ""
            })

        } else {
            alert("Error: 'Task' must be more than 1 character!");
            this.setState({ inputText: "" })
        }
    }

    removeHandler(event) {
        // console.log(event.target.value)
        let index = event.target.value
        let newList = this.state.list
        let newDeletedList = this.state.deletedList
        // console.log('deleted item',newList[index])
        //add deleted item to delete list
        newDeletedList.push(newList[index])
        // console.log('deleted stuff:', newDeletedList)

        //remove item from to-do list
        newList.splice(index, 1)
        this.setState({
            list: newList,
            deletedList: newDeletedList
        });
    }

	render() {
		return (
            <React.Fragment>

                <div className="heading text-center">speech.to.text</div>

                <div className="container">

                    <div className="row">
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4 flex-container">

                                <div className="togcapsule1 btn-group btn-group-toggle" data-toggle="buttons">
                                  <label className="btn btn-outline-secondary active btn-sm">
                                    <input type="radio" name="options" id="optionSpeak" autoComplete="off" checked/> Speak
                                  </label>
                                  <label className="btn btn-outline-secondary btn-sm">
                                    <input type="radio" name="options" id="optionType" autoComplete="off"/> Type
                                  </label>
                                </div>

                                <div className="togcapsule2 btn-group btn-group-toggle" data-toggle="buttons">
                                  <label className="btn btn-outline-secondary active btn-sm">
                                    <input type="radio" name="options" id="optionList" autoComplete="off" checked/> List
                                  </label>
                                  <label className="btn btn-outline-secondary btn-sm">
                                    <input type="radio" name="options" id="optionStory" autoComplete="off"/> Story
                                  </label>
                                </div>

                        </div>
                    </div>

                    <Content
                        list={this.state.list}
                        removeHandler={(e) => {this.removeHandler(e)}}
                        submitHandler={(e) => {this.submitHandler(e)}}
                        changeHandler={(e) => {this.changeHandler(e)}}
                        inputText={this.state.inputText}
                        story={this.state.story}
                    />

                </div>
            </React.Fragment>
		);
	}
}

export default App;