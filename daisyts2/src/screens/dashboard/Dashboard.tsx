import TitleBar from '../../elements/titleBar/TitleBar';
import StatsBar from '../../elements/statsBar/StatsBar';
import NewProduct from '../../elements/newProduct/NewProduct';

export default function Dashboard() {
    return (
        <>
            <TitleBar title="Dashboard" />
            <StatsBar />
            <NewProduct></NewProduct>

        </>
    )
}