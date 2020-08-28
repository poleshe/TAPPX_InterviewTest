import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Table() {
    // Declare the petition for data from the server using the "axios" package for easier promises.
    const [bundles, setBundle] = useState([])
    // Declaring the const for getting data to the getBundles API function. This is found @ BundleController on Backend.
    const getData = async () => {
        let url = 'http://localhost:8000/api/bundle/getBundles';
        const response = await axios.get(url);
        console.log('Backend Response: ', response); // For debugging purposes, easier reading.
        setBundle(response.data);
    }
    // Execute get the data.
    useEffect(() => {
        getData()
    }, [])

    // Function to build the header of the table. To add more rows, simply add them on headerElements. 
    // Rows are transformed to Upper Case for stlying.
    // Paramteres: None.
    //
    // Returns: HTML table header.
    const renderHeader = () => {
        let headerElement = ['name', 'bundle']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    // Function to build the table. Uses the bundles variable that contains the bundle data from DB. Add valid rows to .map() for more table cells. 
    // Paramteres: None, but uses bundles variable.
    //
    // Returns: HTML table.
    const renderBody = () => {
        return bundles && bundles.map(({ id, name, bundle }) => {
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{bundle}</td> 
                </tr>
            )
        })
    }

    // Return the built table to the page. Table building.
    return (
        <div className="bundlesdiv">
            <h1 id='title'>Bundles Table</h1>
            <div className="tablecontainer">
                <table id='bundles' className='striped centered'>
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }

  