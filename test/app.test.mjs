import {test} from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';
import {createApp} from '../src/app.js';
import {Problem} from '../src/common.js';
test('HTTP domain behavior, boundaries and conflicts',async()=>{

const runtime=createApp({token:'synthetic-unit-token',});const server=runtime.app.listen(0,'127.0.0.1');
try{await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
const request=(method,path,body,auth=true)=>fetch(base+path,{method,headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer synthetic-unit-token'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
assert.equal((await request('GET','/health/live')).status,200);
assert.equal((await request('POST','/reports',{id:'a',status:'up'})).status,201);
assert.equal((await request('POST','/reports',{id:'b',status:'down'})).status,201);
assert.equal((await request('POST','/reports',{id:'a',status:'down'})).status,409);
const r=await request('GET','/reports?status=down');const data=await r.json();assert.equal(data.counts.down,1);assert.equal(data.reports[0].id,'b');
assert.equal((await request('GET','/reports/missing')).status,404);
}finally{if(server.listening){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}await runtime.close();}
});
