import Avatar from '../../components/avatar/Avatar';
import { FaHeart } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa';
import StatsItem from '../../components/statsItem/StatsItem';

export default function StatsBar() {

    return (
        <div className="my-1 flex flex-row gap-2 rounded-lg bg-white px-4 py-1 align-middle text-black">

            <div className="flex-grow">
                <StatsItem title="Total Likes" footer="21% more than last month" bodyClass="text-blue-900" icon={<FaHeart className="inline" />}>
                    <span>25.6K</span>
                </StatsItem>
            </div>

            <div className="flex-grow">
                <StatsItem title="Page Views" footer="12% less than last month" bodyClass="text-pink-500" icon={<FaBolt className="inline" />}>
                    <span>2.6M</span>
                </StatsItem>
            </div>

            <div className="flex-grow">
                <StatsItem title="Task done" footer="31 tasks remaining" bodyClass="text-green-800" icon={<Avatar size={16} />}>
                    <span className="pe-10">86%</span>
                </StatsItem>
            </div>

        </div>
    )
}