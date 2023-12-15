import React, {ReactElement} from 'react';
import './App.css';
import Panel from "./components/Panel/Panel";

export function App(): ReactElement<HTMLFormElement> {
    return (
        <div className="App">
            <Panel/>
        </div>
    );
}

export default App;
