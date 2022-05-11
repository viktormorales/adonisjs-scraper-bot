import Route from '@ioc:Adonis/Core/Route'
import axios from 'axios';

Route
    .group(() => {
        Route.get('/', async ({response}) => {

            await axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(res => {
                    return response.status(200).send(res.data)
                })
                .catch(errors => {
                    // react on errors.
                    return response.status(500).send({message: errors})
                });
        })
        

    }).prefix('/api/v1/axios').middleware('TokenRequest');