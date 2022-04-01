import React from 'react'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'

const Category = () => {
    const CategoryContainer = styled('div')({
        height: '1350px',
        wordBreak: 'break-all',
        display: 'flex',
        justifyContent: 'center',
      })

    const styles = {
        innerContent: {
            height: '100%',
            textAlign: 'center',
            width: 'min(1280px, 100% - 40px)',
        },

        contentTitle: {
            marginTop: '62px',
            fontWeight: 'bold',
            fontSize: '36px',
        },

        gridStyle: {
            marginTop: '70px',
        },

        gridText: {
            fontSize: '20px',
            fontWeight: 'bold',
        },

        gridBorder: {
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.3'
        }
    }
    return (
        <CategoryContainer>
            <Box style={styles.innerContent}>
                <Typography style={styles.contentTitle}>
                    멜로디 카테고리    
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4} style={styles.gridStyle}>
                        <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/angry.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    화남    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/bright.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    밝음    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/tranquil.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    차분함    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/dark.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    어두움    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/extreme.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    극적    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/funky.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    펑키    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/happy.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    행복    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/romance.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    낭만적    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} style={styles.gridStyle}>
                    <Card sx={{height: '289px'}} style={styles.gridBorder}>
                            <CardMedia 
                                component="img"
                                height="230px"
                                src={require('../../assets/category/sad.png')}
                            />
                            <CardContent>
                                <Typography style={styles.gridText}>
                                    슬픔    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </CategoryContainer>
    )
}

export default Category
