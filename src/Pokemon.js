import React,{useState, useEffect} from 'react';
import axios from "axios";
import {Card,Typography, Grid, CardContent,Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {toFirstCharUppercase} from './userfunction';


const Pokemon = (props) =>{
    const classes = useStyle();
    const {match,history} = props;
    const {params} = match;
    const {pokemonId} = params;
    const [pokemon,setPokemon] = useState(undefined);

    useEffect(() =>{
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response){
                const {data} = response;
                setPokemon(data);
            })
            .catch(function (error){
                setPokemon(false);
            })
    },[pokemonId]);

    const generatePokeminJSX = () => {
        
        const {name,id,species,height,weight,types,sprites} = pokemon;
        const fullImagesUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const {front_default} = sprites;
        return(
            <>
            <div className={classes.BodyContent}>
                <Grid container  direction="row" alignContent="center" className={classes.mainGrid} >

                    <Grid container spaceing={24} sm={6} xs={12} justify="center">
                        <img className={classes.mainImage} src={fullImagesUrl} />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} className={classes.infoSection}>
                        <Card style={{textAlign:"center",marginBottom:"10px",backgroundColor:"#60797f"}}><Typography className={classes.headerName}>{`${id}.`} {toFirstCharUppercase(name)} <img src={front_default} /></Typography></Card>
                        <CardContent>
                            <Typography style={{padding:"10px",backgroundColor:"#002b36"}}>{`Species: ${species.name}`} </Typography>
                            <Typography style={{padding:"10px",backgroundColor:"#0d647ba1"}}>Height : {height}</Typography>
                            <Typography style={{padding:"10px",backgroundColor:"#002b36"}}>weight: {weight}</Typography>
                            <Typography style={{padding:"10px",backgroundColor:"#0d647ba1",color:"#f11660"}} variant="h6">Types:</Typography>
                            {types.map((typeInfo) =>{
                                const {type} = typeInfo;
                                const {name} = type;
                            return <Typography style={{padding:"10px 0px 10px 40px",backgroundColor:"#002b36"}} key={name}> {`${name}`}</Typography>;
                            })}
                        </CardContent>
                    </Grid>
                    
                </Grid>
            </div>
            </>
        )
    }
    return(
        <>
            {pokemon === undefined && (
            <Grid xs={12} sm={12} container spaceing={24} justify="center" >
                <CircularProgress />
            </Grid> )}
            {pokemon !== undefined && pokemon && generatePokeminJSX()}
            {pokemon === false && <Typography>Pokemon Not Found</Typography>}
            {pokemon !== undefined && (
               <Grid xs={12} sm={12} container spaceing={24} justify="center" ><Button className={classes.backBotten} container spaceing={24}   justify="center" variant="contained" color="primary"  onClick={() => history.push("/")}>Back</Button></Grid> 
            )}
        </>
        
    );
}


const useStyle = makeStyles({
    infoSection:{
        backgroundColor:"#01161b",
        color:"#fff",   
    },
    mainImage:{
        width:"250px",
        height:"250px",
        marginBottom:"30px",
        ['@media(min-width:600px)']:{
            width:"400px",
            height:"400px",

        }
    },
    headerName:{
        fontSize:"30px",
        ['@media(min-width:600px)']:{
            fontSize:"40px"
        }
    },
    mainGrid:{
        marginTop:"10px",
        marginBottom:"10px",
        ['@media(min-width:600px)']:{
            marginTop:"6rem"
        }
    },
    backBotten:{
        fontSize:"20px",
        marginTop:"10px",
        marginBottom:"10px",
        ['@media(min-width:600px)']:{
            fontSize:"30px",
            marginTop:"50px",
            marginBottom:"30px"
        }
    }

})


export default Pokemon;

