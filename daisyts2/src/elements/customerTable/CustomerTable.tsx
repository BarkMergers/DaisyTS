//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import Pagination from '../../components/pagination/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { POST, SafeFetchJson } from '../../helpers/fetch';
import type { pagination } from '../../models/Pagination';



export default function CustomerTable() {

    const showSelector = false;
    const showDetail = true;
    const pageSize = 3;
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pagination, setPagination] = useState<pagination>({ pageId: 0, totalPages: 0});

    type Customer = {
        id: number;
        vehicle: string;
        power: number;
        increasedate: string;
    };

    type CustomerWrapper = {
        data: Customer[];
        pagination: pagination;
    }


    const { data: CustomerWrapper } = useQuery({
        queryKey: ["todo", pageIndex],
        queryFn: () => loadCustomerData(pageIndex)
    });

    const loadCustomerData = async (newPageIndex: number) => {
        newPageIndex = newPageIndex || 0;
        const newData: CustomerWrapper = await SafeFetchJson(`api/GetCustomer/${newPageIndex}/${pageSize}`, POST({}));

        setCustomerData(newData.data);
        setPagination(newData.pagination);
        setPageIndex(newPageIndex);

        return customerData;
    }


    const updatePage = (pageIndex: number) => {
        setPageIndex(pageIndex * pageSize);
    }












    const updater = (value: boolean, index: number) => {
        setCustomerData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }

    const detailClick = (index: number) => {
        alert(JSON.stringify(customerData[index]));
    }

    return (
        <>
            <Table selector={showSelector} detail={showDetail} header={<><td></td><td>Vehicle</td><td>Power</td><td>Date</td></>}>
                {
                    customerData.map((item, index) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} index={index} detailClick={detailClick} >
                            <td>{item.id}</td>
                            <td>{item.vehicle}</td>
                            <td>{item.power}</td>
                            <td>{item.increasedate}</td>
                        </TableRow>
                    )
                }
            </Table>

            <Pagination data={pagination} updatePage={updatePage}></Pagination>

        </>
    )
}