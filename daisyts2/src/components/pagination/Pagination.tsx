import './Pagination.css';
import type { pagination } from '../../models/Pagination';

export default function Pagination({ data, updatePage }: { data: pagination, updatePage: (value1: number) => void }) {

    const buttons = data == null ? [] : Array(data.totalPages).fill(null).map((_, i) => i);

    return (
        <>
            {data != null && buttons.map((buttonId, i) => {
                const active = i == data.pageId ? { backgroundColor: "#ade8f3" } : {};
                return (<span key={ i } style={active} className="paginationButton px-5 py-1.5 text-black" onClick={() => updatePage(i)} >
                        {buttonId + 1}
                    </span>);
                })
            }
        </>
    );
}