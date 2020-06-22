import React,{useState, useEffect} from 'react';
import {AppBar,Toolbar,Grid,Card, CardContent, CircularProgress, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {toFirstCharUppercase} from './userfunction';
import axios from "axios";




const Pokedex = props =>{
    const {history} = props;
    const classes = useStyle();
    const [pokemonData, setPokemonData] = useState({}); 
    
    useEffect(()=>{
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(function (response){
                const {data} = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon,index) =>{
                    newPokemonData[index + 1] = {
                        id:index + 1,
                        name:pokemon.name,
                        sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            index + 1
                        }.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    },[]);
    const getPokemonCard = (pokemonId) =>{
        const {id,name,sprite} = pokemonData[pokemonId];
        return(
            <Grid item xs={12} md={2} lg={2} sm={2} style={{width:"100%"}} key={pokemonId}>
                <Card style={{backgroundColor:"#004253"}} onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia className={classes.CardMedia} image={sprite} />
                    <CardContent className={classes.CardContent}>
                        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
    
    return(
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ?(
                <Grid container spacing={3} style={{width:"100%"}} className={classes.PokedexContainer}>
                {Object.keys(pokemonData).map((pokemonId) =>
                    getPokemonCard(pokemonId)
                )}
                
            </Grid>
            ) : (
                <CircularProgress />
            )}
        </>
    );
}

const useStyle = makeStyles({
    PokedexContainer:{
        paddingTop:"20px",
        paddingLeft:"50px",
        paddingRight:"50px"
    },
    CardMedia:{
        margin:"auto",
        width:"150px",
        height:"150px",
        ['@media(min-width:600px)']:{
            width:"200px",
            height:"200px"
        }
    },
    CardContent:{
        textAlign:"center",
        color:"#fff"
    }
})



export default Pokedex;
