import React from 'react'

function BackendTest() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
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