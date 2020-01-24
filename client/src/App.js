import React from 'react';
import Content from './components/Content';
import { Jumbotron } from 'reactstrap';

function App() {
    return (
        <div className="App">
            <Jumbotron>
                <div className="row row-header">
                    <h1>Bank Info or Cat</h1>
                </div>
            </Jumbotron>
        <Content port={8888}/>
    </div>
  );
}

export default App;
