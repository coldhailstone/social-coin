import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { coins } from '../api';
import { BLACK_COLOR } from '../colors';
import Coin from '../components/Coin';

const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
`;
const Loader = styled.View`
    flex: 1;
    background-color: ${BLACK_COLOR};
    justify-content: center;
    align-items: center;
`;
const List = styled.FlatList`
    padding: 20px 10px;
    width: 100%;
`;

const Home = () => {
    const { isLoading, data } = useQuery('coins', coins);
    const [cleanData, setCleanData] = useState([]);
    useEffect(() => {
        if (data) {
            setCleanData(
                data.filter(({ rank, is_active, is_new }) => rank && is_active && !is_new)
            );
        }
    }, [data]);
    if (isLoading) {
        return (
            <Loader>
                <ActivityIndicator color='white' size='large' />
            </Loader>
        );
    }

    return (
        <Container>
            <List
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                data={cleanData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Coin index={index} id={item.id} symbol={item.symbol} />
                )}
            />
        </Container>
    );
};

export default Home;
