import { useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Coin';
import { useQuery } from 'react-query';
import { history, info } from '../api';

const Container = styled.ScrollView``;

const Detail = ({
    navigation,
    route: {
        params: { symbol, id },
    },
}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Icon
                    source={{
                        uri: `https://coinicons-api.vercel.app/api/icon//${symbol.toLowerCase()}`,
                    }}
                />
            ),
        });
    }, []);

    const { isLoading: infoLoading, data: infoData } = useQuery(['coinInfo', id], info);
    const { isLoading: historyLoading, data: historyData } = useQuery(['coinHistory', id], history);

    return <Container></Container>;
};

export default Detail;
