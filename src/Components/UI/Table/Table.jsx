import React, { Fragment, useState } from 'react';
import classes from './Table.module.css';
import SweetPagination from 'sweetpagination';
import DataPerPage from '../DataPerPage/DataPerPage';

const Table = ({data, onClick, columns, rows, noDataMessage}) => {
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [numberOfPages, setNumberOfPages] = useState(10);

    return (
        <Fragment>
            <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
            {
                data.length > 0 ?
                    <Fragment>
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    {
                                        columns.map((column, key) => (
                                            <th className={`${classes.tableHead}`} scope="col" key={key}>{column.title}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((item) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={item.id}>
                                            {columns.map((column) => (
                                                    <td key={column.field} className={`${classes.tableData}`} onClick={() => onClick(true, item.id)}>{item[column.field]}</td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <SweetPagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={data}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>{noDataMessage}</div>
            }
        </Fragment>
    );
};

export default Table;