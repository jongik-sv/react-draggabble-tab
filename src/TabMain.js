import React, {Component} from 'react';
import update from 'react-addons-update';
import Tabs from "./components/Tabs"
// import Tabs from "react-draggable-tabs"

class TabMain extends Component {
    constructor(props) {
        super(props)
        this.moveTab = this.moveTab.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.closedTab = this.closedTab.bind(this);
        this.addTab = this.addTab.bind(this);

        this.state = {
            tabs: [
                {
                    id: 'Tab1',
                    content: "React Drag n' Drop with material-ui tablDrop with material-ui tablDrop with material-ui table",
                    display: <img src="http://memecrunch.com/meme/RFHY/cute-cat/image.png" alt="cute cat" width="500px"/>
                },
                {
                    id: 'Tab2',
                    content: <span><i className="fa fa-paw" aria-hidden="true"></i> Cute Dog</span>,
                    display: <img src="http://slappedham.com/wp-content/uploads/2014/06/Cute-White-Dog.jpg" alt="cute dog" width="500px"/>
                },
                {
                    id: 'Tab3',
                    content: 'Cute Duck',
                    display: <iframe title="DuckDuckGo" src="https://duckduckgo.com/"  style={{border:"0",margin:"50px", width:"500px", height:"800px"}}/>
                },
            ],
            idNumber: 0,
            activeTabId: 'Tab1'
        };
        this.setState({activeTabId: this.state.tabs[0].id || 'Tab1'});
    }

    moveTab(dragIndex, hoverIndex) {
        const {tabs} = this.state;
        const dragTab = tabs[dragIndex];

        this.setState(update(this.state, {
            tabs: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragTab]
                ]
            }
        }));
    }

    selectTab(selectedId) {
        console.log('selectedID', selectedId)
        // this.setState((state, props) => {
        //     const newTabs = state.tabs.map(tab => ({
        //         ...tab,
        //         active: tab.id === selectedID
        //     }))
        //     return {tabs: newTabs}
        // })
        this.setState({activeTabId: selectedId});
    }

    closedTab(removedIndex, removedID) {
        this.setState((state, props) => {
            let newTabs = [...state.tabs]
            newTabs.splice(removedIndex, 1)

            if (state.tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
                const newActive = removedIndex === 0
                    ? 0
                    : removedIndex - 1
                newTabs[newActive].active = true;
            }

            return {tabs: newTabs}
        })
    }

    addTab(){
        this.setState((state,props)=>{
            let newTabs = [...state.tabs];
            let newIdNumber = state.idNumber + 1;
            let newId = `diagram ${newIdNumber}`;


            let content = newId;
            newTabs.push({
                id: newId,
                content: content, // 'Cute *',
                display: <div key={newTabs.length+1}>{content}</div>
            });
            console.log(newTabs);
            // this.selectTab(newId);

            return {tabs: newTabs, idNumber: newIdNumber, activeTabId: newId }
        })
    }
    render() {
        const activeTab = this.state.tabs.filter(tab => tab.id === this.state.activeTabId);
        console.log('activeTab', this.state.activeTabId,  activeTab);
        return (
            <div className="">
              <div className="tab-main">
                <Tabs moveTab={this.moveTab} selectTab={this.selectTab} closeTab={this.closedTab} tabs={this.state.tabs} activeTabId={this.state.activeTabId}>
                </Tabs>
                <button onClick={this.addTab}>+</button>
              </div>
                {activeTab.length !== 0
                    ? activeTab[0].display
                    : ""}
            </div>
        );
    }
}

export default  TabMain