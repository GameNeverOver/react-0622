import React, { useState } from 'react';
import { Button, Input, Pagination } from 'antd';
let arr = [1,2,3,4,]   ;
let obj = {a : 12}  
export default function App() {
    const [val, setVal] = useState('1')
    return <div>  
        <Button>sss</Button>
        <Input 
            defaultValue={val}
            onInput={eve => {
                console.log(9)
                setVal(eve.target.value)
            }}
        />
        <div style={{width:'400px'}}>
            <Pagination
                current={10}
                pageSize={1}
                total={100}
                size='small'
                showTotal={(total, range) => `共${100}条数据`}
                responsive={true}
            />
        </div>
        {/* 哈哈 */}
    </div>
}