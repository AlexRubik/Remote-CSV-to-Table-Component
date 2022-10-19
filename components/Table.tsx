import {FunctionComponent, useEffect, useMemo, useState} from "react";
import classNames from "classnames/bind";
import styles from './table.module.scss';
export type TableProps = {
    header: Array<string>,
    rows: Array<Array<string>>

}
const Table: FunctionComponent<TableProps> = ({header,rows}) => {


    const cx = classNames.bind(styles);

    const [headerx, setHeaderx] = useState(header);
    const [rowsx, setRowsx] = useState(rows);
    const [order, setOrder] = useState('ASC');
    const [activeSortCol, setActiveSortCol] = useState<string | null>(null);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [maxRowsPerPage, setmaxRowsPerPage] = useState(5);


    const [currentRows, setCurrentRows] = useState<string[][]>();
    



    const getColIndex = (colName: string): number => {

        for (let i = 0; i < header.length; i++) {

            if (colName === header[i]) return i;
        }
        return 0;
    }

    const updateSortHeader = (col:string) => {

        const newHeaderArr = header;
        let arrow;

        if (order === 'DSC') arrow = '↓'; else arrow = '↑';

        for (let i = 0; i < header.length; i++) {

            if (headerx[i].split('↑')[0] === col || headerx[i].split('↓')[0] === col) {

                col = col.replace('↓','').replace('↑', '')

                newHeaderArr[i] = col + arrow;

            }else {
                newHeaderArr[i] = header[i].replace('↓','').replace('↑', '');
            }
        }

        setHeaderx(newHeaderArr);
    }

    const sorting = (col: string) => {

        const colIndex = getColIndex(col);
        setActiveSortCol(col);
        updateSortHeader(col);

        if (order === 'ASC') {
            const sorted = [...rowsx].sort((a, b) => {


                    return a[colIndex].toLowerCase() > b[colIndex].toLowerCase() ? 1 : -1;

                }
            );
            setRowsx(sorted);
            setOrder('DSC');

        } else if (order === 'DSC') {
            const sorted = [...rowsx].sort((a, b) => {


                    return a[colIndex].toLowerCase() < b[colIndex].toLowerCase() ? 1 : -1;

                }
            );
            setRowsx(sorted);
            setOrder('ASC');


        }
    }

    const updateCurrentRows = (pageNumber: number, maxRowsPerPage: number) => {

        let start = (pageNumber*maxRowsPerPage) - maxRowsPerPage;

        if (pageNumber === 1) {
            start = 0;

        }



        let end = pageNumber*maxRowsPerPage;



        const newRows = rowsx.slice(start, end);



        setCurrentRows(newRows);
    }

    type page = 'prev' | 'next';

    const pageChange = (page:page) => {

        const pageCount = Math.ceil(rowsx.length / maxRowsPerPage);

        if(page === 'prev' && pageNumber > 1) {

            setPageNumber(pageNumber - 1)

        }else if(page === 'next' && pageNumber < pageCount) {

            setPageNumber(pageNumber + 1)


        }

    };

    useEffect(() => {

        setPageCount(Math.ceil(rowsx.length / maxRowsPerPage))
        updateCurrentRows(pageNumber, maxRowsPerPage);


    }, [pageNumber, maxRowsPerPage, rowsx]);




    return (
        <>


            <table className={cx('table')}>
                <thead>


                <tr>
                    {headerx &&
                        headerx.map(headerName => (


                            <th className={cx('th')} onClick={()=> sorting(headerName)} key={headerName}>{headerName}</th>
                        ))

                    }
                </tr>
                </thead>
                <tbody>


                {currentRows &&

                    currentRows.map(row => (


                        <tr key={Math.random()}>


                            {row.map(cell => (
                            <td className={cx('td')} key={Math.random()}>{cell}</td>

                        ))}
                        </tr>


                    ))


                }
                </tbody>
            </table>
            <button className={cx('prev-page-button')} onClick={() => pageChange('prev')}>
                Prev Page
            </button>
        <button className={cx('next-page-button')} onClick={() => pageChange('next')}>
            Next Page
        </button>

            {`${' '}${pageNumber} / ${pageCount}`}

            <p className={cx('rows-per-page')}>Rows per page:{' '}
                { <select className={cx('rows-per-page')} defaultValue={5} onChange={e => {

                    // @ts-ignore
                    setmaxRowsPerPage(e.target.value)

                }}>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>

                </select>}

            </p>




    </>



    )


}

export default Table;