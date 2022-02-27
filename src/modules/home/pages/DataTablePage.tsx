import React from "react";
import Header from "../../auth/components/Header";
import DataTable from "../components/DataTable";

const DataTablePage = () => {
    return (
        <div style={{
            backgroundColor: '#bbdefb',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Header />
            <div className="container" style={{ paddingTop: '48px' }}>
                <div style={{ border: '2px black solid', borderRadius: '10px', height: '80vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
                    <div className="payroll-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div><h2 style={{ color: '#1976d2' , textTransform : 'uppercase'}}>Payroll Transactions List</h2></div>
                        <div><button style={{ backgroundColor: '#1976d2', color: '#fff', padding: '5px', width: '100px', border: 'none', borderRadius: '5px' }}>Export CSV</button></div>
                    </div>
                    <DataTable />
                </div>

            </div>

        </div>
    )
}

export default DataTablePage