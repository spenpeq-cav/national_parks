import React from 'react'

function TailWindTest() {
    return (
        <div>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <p>Image Here</p>
                </div>
                <div>
                    <div className="text-2xl font-medium text-blue-500">ChitChat</div>
                    <p className="text-gray-500">You have a new message!</p>
                </div>
            </div>
        </div>
    )
}

export default TailWindTest
