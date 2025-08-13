//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import { useState } from 'react';

export default function AgentTable() {

    type Person = {
        selected: boolean;
        name: string;
        job: string;
        color: string;
    };

    const [data, setData] = useState<Person[]>([{
            selected: true,
            name: "Hart Hagerty",
            job: "Zemlak, Daniel and Leannon",
            color: "Purple"
        }, {
            selected: false,
            name: "Brice Swyre",
            job: "Caroll Group",
            color: "Red"
        }, {
            selected: false,
            name: "Brice Swyre",
            job: "Caroll Group",
            color: "Red"
        }, {
            selected: false,
            name: "Brice Swyre",
            job: "Caroll Group",
            color: "Red"
        }]);

    const showSelector = true;
    const showDetail = true;

    const updater = (value: boolean, index: number) => {
        setData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }

    const detailClick = (index: number) => {
        alert(JSON.stringify(data[index]));
    }

    return (
        <>
            <Table tableData={data} selector={showSelector} updater={updater} detail={showDetail} header={<><td>Name</td><td>Job</td><td>Favorite Color</td></>}>
                {
                    data.map((item, index) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} selected={item.selected} index={index} detailClick={detailClick}>
                            <td>{item.name}</td>
                            <td>{item.job}</td>
                            <td>{item.color}</td>
                        </TableRow>
                    )
                }
            </Table>
        </>
    )
}