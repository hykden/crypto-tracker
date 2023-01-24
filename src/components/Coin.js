import { useEffect, useState } from 'react';
import { Box, Stack, TableContainer, Table, Heading } from '@chakra-ui/react';
import Head from './Head';
import Content from './Content';

const Coin = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
		).then((response) =>
			response
				.json()
				.then((data) => {
					console.log(data);
					setData(data);
				})
				.catch((err) => {
					console.log(err.message);
				})
		);
	}, []);

	const handleSort = (field, order) => {
		if (field) {
			const sortData = [...data].sort((a, b) => {
				return typeof a[field] == 'number'
					? (a[field] - b[field]) * (order == 'ASC' ? 1 : -1)
					: a[field].localeCompare(b[field], 'en', {
							sensitivity: 'base',
					  }) * (order == 'ASC' ? 1 : -1);
			});
			setData(sortData);
		}
	};

	const columns = [
		{
			label: 'Coin',
			key: 'name',
		},
		{
			label: 'Price',
			key: 'current_price',
		},
		{
			label: '24h price change',
			key: 'price_change_percentage_24h',
		},
		{
			label: 'Market Cap',
			key: 'market_cap',
		},
	];

	return (
		<Stack>
			<Box width='100%' align='center' mt={4}>
				<Heading>Cryptocurrency Prices</Heading>
			</Box>
			<TableContainer>
				<Table variant='simple'>
					<Head columns={columns} handleSort={handleSort} />
					<Content data={data} />
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default Coin;
