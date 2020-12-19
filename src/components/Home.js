import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import * as moment from 'moment'

import { Form } from 'react-bootstrap';

import ApiService from "../services/ApiService";

import { CheckUser } from "../helpers/CheckUser";
export const Home = () => {

    //const test =  CheckUser()

    const [loading, setLoading] = useState(false);

    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'OrderDate',
                field: 'OrderDate',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'OrderNumber',
                field: 'OrderNumber',
                width: 150,
            },
            {
                label: 'Customer',
                field: 'Customer',
                width: 150,
            },
            {
                label: 'Salesperson',
                field: 'Salesperson',
                width: 150,
            },
            {
                label: 'Platform',
                field: 'Platform',
                width: 150,
            },
            {
                label: 'Qty',
                field: 'Qty',
                width: 150,
            },
            {
                label: 'Amount',
                field: 'Amount',
                width: 150,
            },
            {
                label: 'NetAmount',
                field: 'NetAmount',
                width: 150,
            },
            {
                label: 'Currency',
                field: 'Currency',
                width: 150,
            },
            {
                label: 'Reserv',
                field: 'Reserv',
                width: 150,
            },
            {
                label: 'Remain',
                field: 'Remain',
                width: 150,
            },
            {
                label: 'Description',
                field: 'Description',
                width: 500,
            },
            {
                label: 'Country',
                field: 'Country',
                width: 150,
            },
            {
                label: 'Cargo',
                field: 'Cargo',
                width: 150,
            },

        ],
        rows: [
        ],
    });
    
    const now= moment(new Date(), 'DD-MM-YYYY').format("YYYY-MM-DD")
    const initialTutorialState = {
        firstDate: now,
        endDate: now,
    };
    const [date, setDate] = useState(initialTutorialState);
    useEffect(() => {
        var data = {
            firstDate:date.firstDate,
            endDate: date.endDate,
        }
        ApiService.getSalesReportList(data)
            .then(response => {
                setLoading(true);
                setDatatable({ ...datatable, rows: response.data })
            })
        setLoading(false);
    }, [setDatatable]
    );
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDate({ ...date, [name]: value });
    };

    const ara = () => {
        var data = {
            firstDate: date.firstDate,
            endDate: date.endDate,
        }
        ApiService.getSalesReportList(data)
            .then(response => {
                setLoading(true);
                setDatatable({ ...datatable, rows: response.data })
            })
        setLoading(false);
    }

    return (
        <div>
            Home
            <div className="row">

                <div className="col-md-4">
                    <Form.Control type="date"  value={date.firstDate} max={date.endDate} 
                        onChange={handleInputChange} name="firstDate" placeholder="First Date" />
                </div>
                <div className="col-md-4">
                    <Form.Control type="date" value={date.endDate}  max={now} min={date.firstDate}
                        onChange={handleInputChange} name="endDate" placeholder="End Date" />
                </div>
                <div className="col-md-4" style={{textAlignLast:"center"}}>
                    <button onClick={ara}  className="btn btn-success">
                        Giriş
                    </button>
                </div>



            </div>
            {loading === true ?
                <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} /> : <h1>Yükleniyor</h1>
            }
        </div>
    )
}
