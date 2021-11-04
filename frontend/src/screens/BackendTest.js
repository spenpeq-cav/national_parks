import React from 'react'
import axios from 'axios';

function BackendTest() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        axios.get("/api")
          .then((res) => setData(res.data.message))
      }, []);

    return (
        <div>
            <h1>National Park Site</h1>
            <p>Data Message Here:</p>
            <p>{!data ? "Loading..." : data}</p>
        </div>
    )
}

export default BackendTest