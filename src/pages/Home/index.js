import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';

import {
    Container,
    SearchContainer, 
    Input, 
    SearchButton, 
    Title, 
    BannerButton, 
    Banner,
    SliderMovie
} from './styles';


import {Feather} from '@expo/vector-icons';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import api, {key} from '../../services/api';
import {getListMovies} from '../../utils/movie'

function Home(){

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRates, setTopRates] = useState([]);

    useEffect(()=>{
        let isActive = true;

        async function getMovies(){

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1
                   } 
                }),
                api.get('/movie/popular', {
                    params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1
                   } 
                }),
                api.get('/movie/top_rated', {
                    params:{
                    api_key: key,
                    language: 'pt-BR',
                    page: 1
                   } 
                }),
            ])

            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(5, popularData.data.results);
            const topList = getListMovies(5, topData.data.results);

            setNowMovies(nowList)
            setPopularMovies(popularList)
            setTopRates(topList)
        }

        getMovies();

    }, [])

    return(
        <Container>
            <Header title="Eder Prime"/>

            <SearchContainer>
                <Input
                    placeholder="Search your favorite movie"
                    placeholderTextColor="#ddd"    
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF"/>
                </SearchButton>
            </SearchContainer>

            <ScrollView showsHorizontalScrollIndicator={false}>
                <Title>Showtimes</Title>
                <BannerButton activeOpacity={0.8} onPress={ () => alert('test') }>
                    <Banner
                        resizeMethod="resize"
                        source={{uri: 'https://compote.slate.com/images/4b33ddbe-2097-4f0d-943f-d5ecc966f89c.png?width=840&rect=2415x1610&offset=73x0'}}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({item}) => <SliderItem data={item}/>}
                    keyExtractor={(item) => String(item.id)}
                />

                <Title>Popular</Title>
                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={popularMovies}
                        renderItem={ ({item}) => <SliderItem data={item}/>}
                        keyExtractor={(item) => String(item.id)}
                    />

                <Title>Top Rating</Title>
                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topRates}
                        renderItem={ ({item}) => <SliderItem data={item}/>}
                        keyExtractor={(item) => String(item.id)}
                    />


            </ScrollView>
        </Container>
    )
}

export default Home;