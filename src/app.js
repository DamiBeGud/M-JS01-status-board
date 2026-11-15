import express from 'express';
import { Board } from './domain.js';
import { authorized,wrap,errors } from './common.js';

export function createApp(options={}) {
 const app=express();app.use(express.json({limit:'16kb'}));
 const repository=undefined;const service=new Board();
 app.get('/health/live',(_req,res)=>res.json({status:'ok'}));
 app.get('/live',wrap(async(_req,res)=>{res.json({status:'ready'});}));
 app.post('/reports',wrap((req,res)=>res.status(201).json(service.add(req.body))));
app.get('/reports',wrap((req,res)=>res.json(service.list(req.query.status))));
app.get('/reports/:id',wrap((req,res)=>res.json(service.get(req.params.id))));
 app.use(errors);return {app,close:()=>repository?.close()??Promise.resolve()};
}
