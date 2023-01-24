import { Box, Tbody, Tr, Td, Image, HStack, Text } from '@chakra-ui/react';

const Content = ({ data }) => {
	return (
		<Tbody>
			{data.map(
				({
					name,
					symbol,
					image,
					current_price,
					price_change_percentage_24h,
					market_cap,
				}) => {
					return (
						<Tr key={name}>
							<Td key={name}>
								<HStack spacing={4}>
									<Box boxSize='45px'>
										<Image src={image} alt='Image of coin' />
									</Box>
									<Text>{name}</Text>
									<Text opacity='80%' textTransform='uppercase'>
										{symbol}
									</Text>
								</HStack>
							</Td>
							<Td>
								{current_price.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
									minimumFractionDigits: 2,
									maximumFractionDigits: 12,
								})}
							</Td>
							<Td color={price_change_percentage_24h > 0 ? 'green' : 'red'}>
								{price_change_percentage_24h.toFixed(2)}%
							</Td>
							<Td>
								{market_cap.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</Td>
						</Tr>
					);
				}
			)}
		</Tbody>
	);
};

export default Content;
