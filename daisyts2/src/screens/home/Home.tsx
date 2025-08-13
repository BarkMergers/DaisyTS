import AgentTable from '../../elements/agentTable/AgentTable';
import CustomerTable from '../../elements/customerTable/CustomerTable';
import TitleBar from '../../elements/titleBar/TitleBar';
import StatsBar from '../../elements/statsBar/StatsBar';

export default function Dashboard() {
    return (
        <>
            <TitleBar title="Home" />
            <StatsBar />
            <AgentTable></AgentTable>
            <CustomerTable></CustomerTable>
        </>
    )
}