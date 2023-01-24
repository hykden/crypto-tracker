import { useState } from 'react';
import { Icon, Thead, Th, Tr } from '@chakra-ui/react';
import { UpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Head = ({ columns, handleSort }) => {
	const [icon, setIcon] = useState({
		name: UpDownIcon,
		current_price: UpDownIcon,
		price_change_percentage_24h: UpDownIcon,
		market_cap: UpDownIcon,
	});
	const [field, setField] = useState('');
	const [order, setOrder] = useState('ASC');

	const handleSortToggle = (key) => {
		const sortOrder = key === field && order === 'ASC' ? 'DESC' : 'ASC';
		setIcon((icon) => ({
			...icon,
			[key]: sortOrder == 'ASC' ? ChevronUpIcon : ChevronDownIcon,
		}));
		setField(key);
		setOrder(sortOrder);
		handleSort(key, sortOrder);
	};

	return (
		<Thead>
			<Tr>
				{columns.map(({ label, key }) => {
					return (
						<Th key={key}>
							{label}
							<Icon
								as={icon[key]}
								w='8'
								_hover={{ cursor: 'pointer' }}
								onClick={() => handleSortToggle(key)}
							></Icon>
						</Th>
					);
				})}
			</Tr>
		</Thead>
	);
};

export default Head;
