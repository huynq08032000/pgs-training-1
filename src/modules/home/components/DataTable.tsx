import React from "react";
import { IStatus } from "../../../models/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DataTable = () => {
    const STATUS: IStatus[] = [{ label: 'Pending', value: 'Pending' }, { label: 'Received', value: 'Received' },
    { label: 'Matched', value: 'Matched' }, { label: 'Processing', value: 'Processing' }
        , { label: 'Fulfilled', value: 'Fulfilled' }, { label: 'Canceled', value: 'Canceled' }
    ];
    const renderStatus = () => {
        const arrGender: JSX.Element[] = [
            <option disabled selected value='' key=''>
                {'Trạng thái'}
            </option>
        ]
        STATUS.map((s: IStatus, index: number) => {
            arrGender.push(
                <option value={s.value} key={index}>
                    {s.label}
                </option>
            )
        })
        return arrGender;
    }
    const handleViewDetail = () =>{

    }
    const handleDelete = () => {

    }
    return (
        <div>
            <div className="payroll-form">
                <form className="filter-form">
                    <div style={{ display: 'flex' }}>
                        <div className="input-wrapper">
                            <select name="form-filter" id="statusCbx">
                                {renderStatus()}
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <input type="date" id='dateForm' />
                        </div>
                        <div className="input-wrapper">
                            <input type="date" id='dateEnd' />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" id='code' placeholder="Mã yêu cầu" />
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <button
                            className='btn btn-primary'
                            type='submit' style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'blue', border: '1px solid blue' }}
                        >
                            APPLY
                        </button>
                        <button
                            className='btn btn-primary'
                            type='submit' style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'red', border: '1px solid red' }}
                        >
                            CLEAR
                        </button>
                    </div>
                </form>
            </div>
            <div className="payroll-content" style={{ paddingTop: '10px' }}>
                <table className="payroll-table">
                    <thead>
                        <tr>
                            <td>Trạng thái</td>
                            <td>Ngày tạo</td>
                            <td>Loại tiền</td>
                            <td>Tổng cộng</td>
                            <td>Mã yêu cầu</td>
                            <td></td>
                            <td></td>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>Trạng thái</td>
                            <td>Ngày tạo</td>
                            <td>Loại tiền</td>
                            <td>Tổng cộng</td>
                            <td>Mã yêu cầu</td>
                            <td>
                                <button className="btn-view-detail" onClick={handleViewDetail}>Xem chi tiết</button>
                            </td>
                            <td>
                                <button className="btn-del" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>Ngày tạo</td>
                            <td>Loại tiền</td>
                            <td>Tổng cộng</td>
                            <td>Mã yêu cầu</td>
                            <td>
                                <button className="btn-view-detail" onClick={handleViewDetail}>Xem chi tiết</button>
                            </td>
                            <td>
                                <button className="btn-del" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable
