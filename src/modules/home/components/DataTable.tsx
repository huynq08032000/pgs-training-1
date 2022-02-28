import React, { useState } from "react";
import { IFilter, IPayroll, IPayrollDetail, ISortIcon, IStatus } from "../../../models/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faAngleLeft, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import moment from "moment";
import { getColor, getStatus, getTotal, getTotalPage } from "../../auth/utils";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
}
const DataTable = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { payroll } = useSelector((state: AppState) => ({
        payroll: state.data.payroll,
    }));
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(5)
    const [totalPage, setTotalPage] = useState(1);
    const [arrPayrollClone, setArrPayrollClone] = useState<IPayrollDetail[] | undefined>([])
    const [arrPayroll, setArrPayroll] = useState<IPayrollDetail[] | undefined>([])
    const [filterForm, setFilterForm] = useState<IFilter>({ status: '', dateStart: new Date, dateEnd: new Date, payrollID: '' })
    const [sortIcon, setSortIcon] = useState<ISortIcon>({ name: '', icon: faAngleDown, reverse: 0 })
    const STATUS: IStatus[] = [{ label: 'Pending', value: 'Pending' }, { label: 'Received', value: 'Received' },
    { label: 'Matched', value: 'Matched' }, { label: 'Processing', value: 'Processing' }
        , { label: 'Fulfilled', value: 'Fulfilled' }, { label: 'Canceled', value: 'Canceled' }
    ];
    const getArrPayrollClone = (pageCurr: number, itemPerPage: number) => {
        setArrPayrollClone(arrPayroll?.slice(itemPerPage * (pageCurr - 1), itemPerPage * pageCurr))
    }
    const getArrPayroll = () => {
        if (!sortIcon.name) setArrPayroll(payroll?.payrolls)
        else {
            switch (sortIcon.name) {
                case 'status':
                    setArrPayroll(arrPayroll?.sort((a, b) => {
                        if (sortIcon.reverse == 1) return getStatus(b).localeCompare(getStatus(a));
                        else return getStatus(a).localeCompare(getStatus(b));
                    }))
                    break
                case 'date':
                    setArrPayroll(arrPayroll?.sort((a, b) => {
                        if (sortIcon.reverse == 1) return b.time_created > a.time_created ? 1 : -1;
                        else return a.time_created > b.time_created ? 1 : -1;
                    }))
                    break
                case 'currency':
                    setArrPayroll(arrPayroll?.sort((a, b) => {
                        if (sortIcon.reverse == 1) return b.currency.localeCompare(a.currency);
                        else return a.currency.localeCompare(b.currency);
                    }))
                    break
                case 'total':
                    setArrPayroll(arrPayroll?.sort((a, b) => {
                        if (sortIcon.reverse == 1) return getTotal(b) - getTotal(a);
                        else return getTotal(a) - getTotal(b);
                    }))
                    break;
                case 'payrollID':
                    setArrPayroll(arrPayroll?.sort((a, b) => {
                        if (sortIcon.reverse == 1) return b.payroll_id.localeCompare(a.payroll_id);
                        else return a.payroll_id.localeCompare(b.payroll_id);
                    }))
                    break
                default:
                    return
            }
        }
    }
    React.useEffect(() => {
        getArrPayroll()
        setPage(1)
    }, [sortIcon])
    React.useEffect(() => {
        getArrPayrollClone(page, item)
        let a: any = payroll?.payrolls.length
        if (typeof (a) == "number") {
            setTotalPage(getTotalPage(a, item))
        }
    }, [page, sortIcon, arrPayroll])
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
                    <div style={{ lineHeight: '50px' }}>{getTotal(d)}</div>
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
    const handleChangeSort = (fill: string) => {
        if (sortIcon.name !== fill) setSortIcon({ name: fill, icon: faAngleDown, reverse: 1 })
        else {
            if (sortIcon.reverse == 1) setSortIcon({ ...sortIcon, icon: faAngleUp, reverse: -1 })
            else setSortIcon({ ...sortIcon, icon: faAngleDown, reverse: 1 })
        }
    }
    const onFilter = () => {
        console.log('callhere : Filter');

    }
    const onClear = () => {
        console.log('callhere : Clear');
        setSortIcon({ name: '', icon: faAngleDown, reverse: 0 })
        setFilterForm({ status: '', dateStart: new Date(), dateEnd: new Date, payrollID: '' })
        setArrPayroll(payroll?.payrolls)
    }
    const handlePageBack = () => {
        if (page == 1) {
            setPage(totalPage);
            return;
        }

        setPage(page - 1)
    }
    const handlePageNext = () => {
        if (page == totalPage) {
            setPage(1)
            return;
        };
        setPage(page + 1)
    }
    const handleChangeDateStart = (date: Date) => {
        setFilterForm({ ...filterForm, dateStart: date })
        console.log(filterForm);

    }
    const handleChangeDateEnd = (date: Date) => {
        setFilterForm({ ...filterForm, dateEnd: date })
        console.log(filterForm);
    }
    return (
        <div style={{ marginTop: '20px' }}>
            <div className="payroll-form">
                <form className="filter-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <div className="input-wrapper">
                            <select name="form-filter" id="statusCbx"
                                onChange={(e) => {
                                    setFilterForm({ ...filterForm, status: e.target.value })
                                }}
                            >
                                {renderStatus()}
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <DatePicker
                                selected={filterForm.dateStart}
                                onChange={handleChangeDateStart}
                                name="startDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className="input-wrapper">
                            <DatePicker
                                selected={filterForm.dateEnd}
                                onChange={handleChangeDateEnd}
                                name="endDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" id='code' placeholder="Mã yêu cầu"
                                value={filterForm.payrollID}
                                onChange={(e) => {
                                    setFilterForm({ ...filterForm, payrollID: e.target.value })
                                }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <button
                            className="btn-apply"
                            onClick={onFilter}
                            type='submit' style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'blue', border: '1px solid blue' }}
                        >
                            APPLY
                        </button>
                        <button
                            className="btn-clear"
                            onClick={onClear}
                            style={{ minWidth: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', backgroundColor: '#fff', color: 'red', border: '1px solid red' }}
                        >
                            CLEAR
                        </button>
                    </div>
                </form>
            </div>
            <div className="payroll-content" style={{ paddingTop: '10px' }}>
                <div className="payroll-content-header" style={{ display: 'flex' }}>
                    <div onClick={() => {
                        handleChangeSort('status')
                    }}>
                        Trạng thái {sortIcon.name == 'status' && <FontAwesomeIcon icon={sortIcon.icon} />}
                    </div>
                    <div style={{ width: '200px' }}
                        onClick={() => {
                            handleChangeSort('date')
                        }}>Ngày tạo {sortIcon.name == 'date' && <FontAwesomeIcon icon={sortIcon.icon} />}</div>
                    <div
                        onClick={() => {
                            handleChangeSort('currency')
                        }}>Loại tiền {sortIcon.name == 'currency' && <FontAwesomeIcon icon={sortIcon.icon} />}</div>
                    <div
                        onClick={() => {
                            handleChangeSort('total')
                        }}>Tổng cộng {sortIcon.name == 'total' && <FontAwesomeIcon icon={sortIcon.icon} />}</div>
                    <div
                        onClick={() => {
                            handleChangeSort('payrollID')
                        }}>Mã yêu cầu {sortIcon.name == 'payrollID' && <FontAwesomeIcon icon={sortIcon.icon} />}</div>
                    <div></div>
                    <div></div>
                </div>
                <div className="payroll-content-body">
                    {renderPayrollList()}
                </div>
            </div>
            <div className="payroll-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="" style={{ fontWeight: '500' }}>
                    Show {item * (page - 1) + 1} to {item * page} in {arrPayroll?.length} records
                </div>
                <div className="pagging" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ margin: '0 10px' }}><button onClick={handlePageBack}><FontAwesomeIcon icon={faAngleLeft} /></button></div>
                    <div style={{ padding: '10px 10px', margin: '0 10px', fontWeight: '500' }}>{page}</div>
                    <div style={{ margin: '0 10px' }}><button onClick={handlePageNext}><FontAwesomeIcon icon={faAngleRight} /></button></div>
                </div>
            </div>
        </div>
    )
}

export default DataTable
