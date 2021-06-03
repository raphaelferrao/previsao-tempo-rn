import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import Conditions from '../../components/Conditions';

import api, {key} from '../../services/api';

export default function Search () {
    const [input, setInput] = useState('');
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    async function handleSearch() {
        const response = await api.get(`/weather?key=${key}&city_name=${input}`);

        if (response.data.by === 'default') {
            setError(`Cidade não encontrada`);
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }

        setCity(response.data);
        setInput('');
        Keyboard.dismiss();
    }

    if (city) {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={ () => navigation.navigate('Home')} >
                    <Feather 
                        name="chevron-left" 
                        size={32}
                        color='#000'
                    />
                    <Text style={{fontSize: 22}}>Voltar</Text>
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <TextInput 
                        value={input} 
                        onChangeText={ (valor) => setInput(valor) }
                        placeholder='Ex: Campinas, SP'
                        style={styles.searchInput}
                    />

                    <TouchableOpacity 
                        style={styles.searchButton} 
                        onPress={handleSearch}
                    >
                        <Feather
                            name="search"
                            size={22}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>

                <LinearGradient
                    style={styles.header}
                    colors={['#1ed6ff', '#97c1ff']}
                >
                    <Text style={styles.date}>{city.results.date}</Text>
                    <Text style={styles.city}>{city.results.city}</Text>

                    <View>
                        <Text style={styles.weather}>{city.results.temp}°</Text>
                    </View>

                    <Conditions weather={city} />
                </LinearGradient>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={ () => navigation.navigate('Home')} >
                <Feather 
                    name="chevron-left" 
                    size={32}
                    color='#000'
                />
                <Text style={{fontSize: 22}}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <TextInput 
                    value={input} 
                    onChangeText={ (valor) => setInput(valor) }
                    placeholder='Ex: Campinas, SP'
                    style={styles.searchInput}
                />

                <TouchableOpacity 
                    style={styles.searchButton} 
                    onPress={handleSearch}
                >
                    <Feather
                        name="search"
                        size={22}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>

            {error && <Text style={styles.msgError} >{error}</Text> }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        paddingTop: '10%'
    },

    backButton: {
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },

    searchBox: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDD',
        width: '90%',
        height: 50,
        borderRadius: 8
    },

    searchInput: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },

    searchButton: {
        width: '15%',
        backgroundColor: '#1ed6ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    msgError: {
        marginTop: 25,
        fontSize: 18
    },

    header: {
        marginTop: '5%',
        paddingTop: '5%',
        paddingBottom: '5%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8
    },

    date: {
        color: '#FFF',
        fontSize: 16
    },

    city: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },

    weather: {
        color: '#FFF',
        fontSize: 90,
        fontWeight: 'bold'
    }
});