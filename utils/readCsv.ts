import request from 'request';
import {StringStream} from 'scramjet';
import {TableProps} from "../types/types";



export default async function readCsv(csvUrl: string): Promise<TableProps>{

    const dataStream = request.get(csvUrl)
        .pipe(new StringStream())
        .CSVParse();

    const dataArr: Array<Array<string>> = await dataStream.toArray();
    const header = dataArr[0];
    dataArr.splice(0,1)
    const rows = dataArr;

    return {
        header,
        rows

    };


}