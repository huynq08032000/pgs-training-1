import React, { useState } from "react";
import { IPayroll, IPayrollDetail, IStatus } from "../../../models/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import moment from "moment";
import { getColor, getStatus, getTotalPage } from "../../auth/utils";
import { type } from "os";

const DataTable = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { payroll } = useSelector((state: AppState) => ({
        payroll: state.data.payroll,
    }));
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(5)
    const [totalPage, setTotalPage] = useState<any>();
    const [arrPayrollClone, setArrPayroll] = useState<IPayrollDetail[] | undefined>([])

    const STATUS: IStatus[] = [{ label: 'Pending', value: 'Pending' }, { label: 'Received', value: 'Received' },
    { label: 'Matched', value: 'Matched' }, { label: 'Processing', value: 'Processing' }
        , { label: 'Fulfilled', value: 'Fulfilled' }, { label: 'Canceled', value: 'Canceled' }
    ];
    const getArrPayroll = (pageCurr: number, itemPerPage: number) => {
        setArrPayroll(payroll?.payrolls.slice(itemPerPage * (pageCurr - 1), itemPerPage * pageCurr))
    }
    React.useEffect(() => {
        getArrPayroll(page, item)
        setTotalPage(getTotalPage(payroll?.payrolls.length,item));
    }, [page])
    console.log(getTotalPage(payroll?.payrolls.length, item));
    
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
    const renderPayrollList = () => {

        const arrPayroll: JSX.Element[] = [
        ]
        arrPayrollClone?.map((d: any, index: number) => {
            arrPayroll.push(
                <div className="result-payroll" key={index}>
                    <div style={{ lineHeight: '50px', color: getColor(d) }}>
                        {getStatus(d)}
                    </div>
                    <div style={{ width: '200px', lineHeight: '50px' }}>{moment(d.time_created).format('DD/MM/YYYY')}</div>
                    <div style={{ lineHeight: '50px' }}>{d.currency}</div>
                    <div style={{ lineHeight: '50px' }}>{d.volume_input_in_input_currency + d.fees}</div>
                    <div className="payroll-id" style={{ width: '250px', lineHeight: '50px' }}>{d.payroll_id}</div>
                    <div><button className="btn-view-detail" style={{ marginLeft: '10px' }} onClick={handleViewDetail}>Xem chi tiết</button></div>
                    <div><button className="btn-del" style={{ marginLeft: '30px' }} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button></div>
                </div>
            )
        })
        return arrPayroll;
    }
    const handleViewDetail = () => {

    }
    const handleDelete = () => {

    }
    const handlePageBack = () => {
        if (page == 1) {
            setPage(totalPage); 
            return;
        }

        setPage(page - 1)
    }
    const handlePageNext = () => {
        if (page == getTotalPage(arrPayrollClone?.length, item)) return;
        setPage(page + 1)
    }
    const handlePageFirst = () => {
        setPage(1)
    }
    const handlePageLast = () =>{
        setPage(totalPage)
    }
    return (
        <div style={{ marginTop: '20px' }}>
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
                            className='btn btn-primary btn-apply'
                            type='submit' style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'blue', border: '1px solid blue' }}
                        >
                            APPLY
                        </button>
                        <button
                            className='btn btn-primary btn-clear'
                            type='submit' style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'red', border: '1px solid red' }}
                        >
                            CLEAR
                        </button>
                    </div>
                </form>
            </div>
            <div className="payroll-content" style={{ paddingTop: '10px' }}>
                <div className="payroll-content-header" style={{ display: 'flex' }}>
                    <div>
                        Trạng thái
                    </div>
                    <div style={{ width: '200px' }}>Ngày tạo</div>
                    <div>Loại tiền</div>
                    <div>Tổng cộng</div>
                    <div>Mã yêu cầu</div>
                    <div></div>
                    <div></div>
                </div>
                <div className="payroll-content-body">
                    {renderPayrollList()}
                </div>
            </div>
            <div className="payroll-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="" style={{ fontWeight: '500' }}>
                    Show {item * (page - 1) + 1} to {item * page} in {payroll?.payrolls.length} records
                </div>
                <div className="pagging" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div><button onClick={handlePageFirst}><FontAwesomeIcon icon={faAnglesLeft} /></button></div>
                    <div><button onClick={handlePageBack}><FontAwesomeIcon icon={faAngleLeft} /></button></div>
                    <div style={{ padding: '0 10px' }}>{page}</div>
                    <div><button onClick={handlePageNext}><FontAwesomeIcon icon={faAngleRight} /></button></div>
                    <div><button onClick={handlePageLast}><FontAwesomeIcon icon={faAnglesRight} /></button></div>
                </div>
            </div>
        </div>
    )
}

export default DataTable
