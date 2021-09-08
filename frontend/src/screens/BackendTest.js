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
            <p>Data Message Here:</p>
            <p>{!data ? "Loading..." : data}</p>
        </div>
    )
}

export default BackendTest